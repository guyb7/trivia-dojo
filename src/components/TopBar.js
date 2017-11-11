import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { setLevelXp, setUser } from '../store/actions'
import { CircularProgress } from 'material-ui/Progress'

import Colors from './Colors'

const style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 10,
    boxSizing: 'border-box'
  },
  level: {
    position: 'relative'
  },
  levelText: {
    color: Colors.ink.lightest,
    position: 'absolute',
    width: 20,
    textAlign: 'center',
    marginLeft: -10,
    left: '50%',
    top: 11
  },
  levelProgress: {
    position: 'absolute',
    color: Colors.ink.lightest,
    top: 0,
    right: 0
  },
  levelProgressBg: {
    color: Colors.ink.lightest,
    thickness: 1,
    opacity: 0.5
  }
}

class TopBar extends Component {
  componentDidMount() {
    this.getProfile()
  }

  getProfile() {
    axios.get('/api/profile')
    .then(res => {
      this.showApp()
      this.props.setUser(res.data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  showApp() {
    const spinner = document.getElementById('spinner-container')
    const app = document.getElementById('root')
    spinner.classList.add('hidden')
    app.classList.remove('hidden')
  }

  render() {
    return (
      <div style={style.container}>
        <div style={style.level}>
          <div style={style.levelText}>{this.props.level.level}</div>
          <CircularProgress mode="determinate" value={this.props.level.percentage} style={style.levelProgress} />
          <CircularProgress mode="determinate" value={100} style={style.levelProgressBg} thickness={style.levelProgressBg.thickness} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    level: state.level,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser(profile) {
      dispatch(setUser({
        id: profile.id,
        loggedIn: profile.isLoggedIn,
        name: profile.name
      }))
      dispatch(setLevelXp(profile.xp))
    }
  }
}

const connectedTopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)

export default connectedTopBar
