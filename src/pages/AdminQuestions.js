import React, { Component } from 'react'
import axios from 'axios'
import _once from 'lodash/once'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'
import List, {
  ListItem,
  ListItemText
} from 'material-ui/List'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'

import Icon from '../components/Icon'
import Colors from '../components/Colors'

const style = {
  container: {
    padding: 20
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    color: Colors.ink.lighter
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20
  },
  select: {
    width: '100%'
  },
  categoryIcon: {
    color: Colors.ink.default,
    marginRight: 10
  }
}

class AdminQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenCategory: false,
      categories: [],
      questions: [],
      isModalOpen: false,
      modalQuestion: {}
    }
  }

  componentDidMount() {
    this.fetchCategories()
  }

  navigateBack = () => {
    setTimeout(() => {
      this.props.history.push('/admin')
    }, 300)
  }

  fetchCategories() {
    axios.get('/api/admin/categories')
    .then(response => {
      this.setState({
        ...this.state,
        categories: response.data.categories
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  fetchQuestions(category) {
    axios.get('/api/admin/questions/' + category)
    .then(response => {
      this.setState({
        ...this.state,
        questions: response.data.questions
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  chooseCategory = event => {
    const category = event.target.value
    this.setState({
      ...this.state,
      chosenCategory: category
    })
    this.fetchQuestions(category)
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: false
    })
  }

  addQuestion = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        isModalOpen: true,
        isEdit: false,
        modalQuestion: {
          question: '',
          options: [
            '',
            '',
            ''
          ],
          answer: '',
          rank: 1500
        }
      })
    }, 200)
  }

  editQuestion = question => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        isModalOpen: true,
        isEdit: true,
        modalQuestion: { ...question }
      })
    }, 200)
  }

  updateModalField  = (name, n) => event => {
    if (name === 'options') {
      const newOptions = [...this.state.modalQuestion.options]
      newOptions[n] = event.target.value
      return this.setState({
        ...this.setState,
        modalQuestion: {
          ...this.state.modalQuestion,
          options: newOptions
        }
      })
    }
    this.setState({
      ...this.state,
      modalQuestion: {
        ...this.state.modalQuestion,
        [name]: event.target.value
      }
    })
  }

  saveQuestion = () => {
    this.setState({
      ...this.state,
      isDisabled: true
    }, () => {
      const questionId = this.state.modalQuestion.id
      const method = this.state.isEdit ? 'put' : 'post'
      const form = {
        ...this.state.modalQuestion,
        category: this.state.chosenCategory
      }
      axios[method]('/api/admin/questions/' + (questionId || ''), form)
      .then(response => {
        const newQuestions = this.state.isEdit ?
          this.state.questions.map(c => {
            if (c.id === questionId) {
              return { ...this.state.modalQuestion }
            }
            return c
          }) : [
            ...this.state.questions,
            { ...this.state.modalQuestion }
          ]
        this.setState({
          ...this.state,
          isModalOpen: false,
          isDisabled: false,
          questions: newQuestions,
          modalQuestion: {}
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          ...this.state,
          isDisabled: false
        })
      })
    })
  }

  deleteCategory = () => {
    this.setState({
      ...this.state,
      isDisabled: true
    }, () => {
      const questionId = this.state.modalQuestion.id
      axios.delete('/api/admin/questions/' + questionId)
      .then(response => {
        this.setState({
          ...this.state,
          isModalOpen: false,
          isDisabled: false,
          questions: this.state.questions.filter(q => q.id !== questionId),
          modalQuestion: {}
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          ...this.state,
          isDisabled: false
        })
      })
    })
  }

  render() {
    return (
      <div style={style.container}>
        <h2 style={style.header}>
          <IconButton onClick={this.navigateBack}>
            <Icon type='Back'/>
          </IconButton>
          Questions - Admin
        </h2>
        <Select
          value={this.state.chosenCategory}
          onChange={this.chooseCategory}
          style={style.select}
          >
          {
            this.state.categories.map(c =>
              <MenuItem
                key={c.id}
                value={c.id}>
                <Icon type={c.icon} style={style.categoryIcon} />
                {c.title}
              </MenuItem>
            )
          }
        </Select>
        {
          this.state.chosenCategory &&
          <div>
            <List>
              {
                this.state.questions.map(q =>
                  <div>
                    <ListItem
                      button
                      onClick={_once(() => this.editQuestion(q))}
                      key={q.id}>
                      <ListItemText primary={q.question} />
                    </ListItem>
                    <Divider />
                  </div>
                )
              }
            </List>
            <Button
              fab
              color="primary"
              style={style.fab}
              onClick={_once(this.addQuestion)}
              >
              <Icon type='Plus' />
            </Button>
          </div>
        }
        <Dialog open={this.state.isModalOpen} onRequestClose={this.closeModal}>
          <DialogTitle>{this.state.isEdit ? 'Edit Question' : 'New Question'}</DialogTitle>
          <DialogContent>
            {
              this.state.isEdit &&
              <TextField
                margin="dense"
                label="ID"
                value={this.state.modalQuestion.id}
                onChange={this.updateModalField('id')}
                disabled={true}
                fullWidth
              />
            }
            <TextField
              margin="dense"
              label="Question"
              value={this.state.modalQuestion.question}
              onChange={this.updateModalField('question')}
              disabled={this.state.isDisabled}
              fullWidth
              />
            <TextField
              margin="dense"
              label="Rank"
              value={this.state.modalQuestion.rank}
              onChange={this.updateModalField('rank')}
              disabled={this.state.isDisabled}
              fullWidth
            />
            {
              this.state.modalQuestion.options &&
              <div>
                <TextField
                  margin="dense"
                  label="Answer"
                  value={this.state.modalQuestion.answer}
                  onChange={this.updateModalField('answer')}
                  disabled={this.state.isDisabled}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Option 2"
                  value={this.state.modalQuestion.options[0]}
                  onChange={this.updateModalField('options', 0)}
                  disabled={this.state.isDisabled}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Option 3"
                  value={this.state.modalQuestion.options[1]}
                  onChange={this.updateModalField('options', 1)}
                  disabled={this.state.isDisabled}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Option 4"
                  value={this.state.modalQuestion.options[2]}
                  onChange={this.updateModalField('options', 2)}
                  disabled={this.state.isDisabled}
                  fullWidth
                />
              </div>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal}>
              Cancel
            </Button>
            {
              this.state.isEdit &&
              <Button onClick={this.deleteQuestion} color="accent">
                Delete
              </Button>
            }
            <Button onClick={this.saveQuestion} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AdminQuestions
