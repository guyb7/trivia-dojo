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
      name: '',
      email: '',
      password: ''
    }
  }

  changeMode = (event, value) => {
    this.setState({
      ...this.state,
      mode: value
    })
  }

  onSubmit = () => {
    this.setState({
      ...this.state
    })
  }

  updateField = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    })
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
          <Tab label='Register' value='register' />
          <Tab label='Login' value='login' />
          <Tab label='Reset' value='reset' />
        </Tabs>
        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          onChange={this.updateField('email')} />
        {
          this.state.mode !== 'reset' &&
            <TextField
              id="password"
              label="Password"
              value={this.state.password}
              type="password"
              onChange={this.updateField('password')} />
        }
        {
          this.state.mode === 'register' &&
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.updateField('name')} />
        }
        <Button onClick={this.onSubmit} style={style.loginButton}>
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
