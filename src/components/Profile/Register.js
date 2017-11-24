import React, { Component } from 'react'
import { connect } from 'react-redux'

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
  registerButton: {
    marginTop: 20,
    color: Colors.white,
    backgroundColor: Colors.blue.default
  },
  loginButton: {
    marginTop: 20
  }
}

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'register',
      isSubmitting: false,
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
    this.setState(newState, this.register())
  }

  register() {

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
        <Button
          onClick={this.onSubmit}
          disabled={this.state.isSubmitting}
          style={style.loginButton}>
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
    setUser() {
      // dispatch(closeUserDrawer())
    }
  }
}

const connectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default connectedRegister
