import React, { Component } from 'react'
import axios from 'axios'
import _once from 'lodash/once'

import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import List, {
  ListItem,
  ListItemText
} from 'material-ui/List'

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
      questions: []
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

  addQuestion = () => {
    setTimeout(() => {
      
    }, 200)
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
                  <ListItem button onClick={_once(() => this.editQuestion(q))} key={q.id}>
                    <ListItemText primary={q.question} />
                  </ListItem>
                )
              }
            </List>
            <Button fab color="primary" style={style.fab} onClick={_once(this.addQuestion)}>
              <Icon type='Plus' />
            </Button>
          </div>
        }
      </div>
    )
  }
}

export default AdminQuestions
