import React, { Component } from 'react'
import axios from 'axios'
import _once from 'lodash/once'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import AddIcon from 'material-ui-icons/Add'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui/List'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'

import Icon from '../components/Icon'

const style = {
  container: {
    padding: 20
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20
  }
}

class AdminCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      isEdit: false,
      originalId: false,
      isDisabled: false,
      modalCategory: {},
      categories: []
    }
  }

  componentDidMount() {
    this.fetchCategories()
  }
  
  fetchCategories() {
    axios.get('/api/admin/categories')
    .then(response => {
      console.log(response)
      this.setState({
        ...this.state,
        categories: response.data.categories
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: false
    })
  }

  addCategory = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        isModalOpen: true,
        isEdit: false,
        originalId: false,
        modalCategory: {
          id: '',
          title: '',
          icon: ''
        }
      })
    }, 200)
  }

  editCategory = category => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        isModalOpen: true,
        isEdit: true,
        originalId: category.id,
        modalCategory: { ...category }
      })
    }, 200)
  }

  updateModalField  = name => event => {
    this.setState({
      ...this.state,
      modalCategory: {
        ...this.state.modalCategory,
        [name]: event.target.value
      }
    })
  }

  saveCategory = () => {
    this.setState({
      ...this.state,
      isDisabled: true
    }, () => {
      const method = this.state.isEdit ? 'put' : 'post'
      axios[method]('/api/admin/categories/' + (this.state.originalId || ''), this.state.modalCategory)
      .then(response => {
        const newCategories = this.state.isEdit ?
          this.state.categories.map(c => {
            if (c.id === this.state.originalId) {
              return { ...this.state.modalCategory }
            }
            return c
          }) : [
            ...this.state.categories,
            { ...this.state.modalCategory }
          ]
        this.setState({
          ...this.state,
          isModalOpen: false,
          isDisabled: false,
          categories: newCategories,
          modalCategory: {}
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
      axios.delete('/api/admin/categories/' + this.state.modalCategory.id)
      .then(response => {
        this.setState({
          ...this.state,
          isModalOpen: false,
          isDisabled: false,
          categories: this.state.categories.filter(c => c.id !== this.state.originalId),
          modalCategory: {}
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
        <h2>Categories - Admin</h2>
        <List>
          {
            this.state.categories.map(c =>
              <ListItem button onClick={_once(() => this.editCategory(c))} key={c.id}>
                <ListItemIcon>
                  <Icon type={c.icon} />
                </ListItemIcon>
                <ListItemText primary={c.title} />
              </ListItem>
            )
          }
        </List>
        <Dialog open={this.state.isModalOpen} onRequestClose={this.closeModal}>
          <DialogTitle>{this.state.isEdit ? 'Edit Category' : 'New Category'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="ID"
              value={this.state.modalCategory.id}
              onChange={this.updateModalField('id')}
              disabled={this.state.isDisabled}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Title"
              value={this.state.modalCategory.title}
              onChange={this.updateModalField('title')}
              disabled={this.state.isDisabled}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Icon"
              value={this.state.modalCategory.icon}
              onChange={this.updateModalField('icon')}
              disabled={this.state.isDisabled}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal}>
              Cancel
            </Button>
            {
              this.state.isEdit &&
              <Button onClick={this.deleteCategory} color="accent">
                Delete
              </Button>
            }
            <Button onClick={this.saveCategory} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button fab color="primary" style={style.fab} onClick={_once(this.addCategory)}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

export default AdminCategories
