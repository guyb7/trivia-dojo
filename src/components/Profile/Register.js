import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import ErrorAPI from '../ErrorAPI'
import { setCategories, setLevelXp, setUser, setAchievements } from '../../store/actions'

import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import Colors from '../Colors'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  submitButton: {
    marginTop: 20,
    color: Colors.blue.darker,
    backgroundColor: Colors.blue.light
  },
  error: {
    color: Colors.red.default,
    marginTop: 20
  }
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'register',
      isSubmitting: false,
      errorMessage: false,
      name: '',
      nameError: false,
      email: '',
      emailError: false,
      password: '',
      passwordError: false
    }
  }

  changeMode = (event, value) => {
    this.setState({
      ...this.state,
      mode: value
    })
  }

  updateField = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
      [name + 'Error']: false
    })
  }

  onSubmit = () => {
    const newState = { ...this.state }
    if (this.state.email.length === 0) {
      newState.emailError = true
    }
    if (this.state.mode !== 'reset' && this.state.password.length === 0) {
      newState.passwordError = true
    }
    if (this.state.mode === 'register' && this.state.name.length === 0) {
      newState.nameError = true
    }
    if (newState.emailError || newState.passwordError || newState.nameError) {
      this.setState(newState)
      return
    }
    newState.isSubmitting = true
    newState.errorMessage = false
    switch (this.state.mode) {
      case 'register':
        this.setState(newState, this.register)
        break
      case 'login':
        this.setState(newState, this.login)
        break
      default:
    }
  }

  register = async () => {
    try {
      const form = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      }
      const { data } = await axios.post('/api/register', form)
      this.setState({
        isSubmitting: false,
        errorMessage: false
      })
      this.props.setUser({
        id: data.id,
        name: data.name
      })
    } catch (error) {
      const errorMessage = ErrorAPI(error)
      this.setState({
        isSubmitting: false,
        errorMessage
      })
    }
  }

  login = async () => {
    try {
      const form = {
        email: this.state.email,
        password: this.state.password
      }
      await axios.post('/api/login', form)
      const { data } = await axios.get('/api/profile')
      this.setState({
        isSubmitting: false,
        errorMessage: false
      })
      this.props.setProfile(data)
    } catch (error) {
      const errorMessage = ErrorAPI(error)
      console.log('errorMessage', errorMessage)
      this.setState({
        isSubmitting: false,
        errorMessage
      })
    }
  }

  render() {
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        <Tabs
          value={this.state.mode}
          onChange={this.changeMode}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab
            label='Register'
            value='register'
            disabled={this.state.isSubmitting}
            />
          <Tab
            label='Login'
            value='login'
            disabled={this.state.isSubmitting}
            />
          <Tab
            label='Reset'
            value='reset'
            disabled={this.state.isSubmitting}
            />
        </Tabs>
        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          error={this.state.emailError}
          disabled={this.state.isSubmitting}
          onChange={this.updateField('email')} />
          {
            this.state.mode !== 'reset' &&
            <TextField
              id="password"
              label="Password"
              value={this.state.password}
              error={this.state.passwordError}
              type="password"
              disabled={this.state.isSubmitting}
              onChange={this.updateField('password')} />
        }
        {
          this.state.mode === 'register' &&
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              error={this.state.nameError}
              disabled={this.state.isSubmitting}
              onChange={this.updateField('name')} />
        }
        {
          this.state.errorMessage &&
          <div style={style.error}>{this.state.errorMessage}</div>
        }
        <Button
          onClick={this.onSubmit}
          disabled={this.state.isSubmitting}
          style={style.submitButton}>
          Go
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser(user) {
      dispatch(setUser({
        id: user.id,
        loggedIn: true,
        name: user.name
      }))
    },
    setProfile(profile) {
      dispatch(setUser({
        id: profile.id,
        loggedIn: profile.user.role !== 'guest',
        name: profile.user.name
      }))
      dispatch(setLevelXp(profile.progress.xp))
      dispatch(setCategories(profile.categories))
      dispatch(setAchievements(profile.achievements))
    }
  }
}

const connectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default connectedRegister
