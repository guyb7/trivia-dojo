import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import {
  openUserDrawer,
  setCategories,
  setLevelXp,
  setUser,
  setAchievements,
  setStatistics
} from '../store/actions'
import LevelProgress from './LevelProgress'

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
  }
}

class TopBar extends Component {
  componentDidMount() {
    if (this.props.user.id !== null) {
      return
    }
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
      <div style={{ ...this.props.style, ...style.container }}>
        <LevelProgress
          onClick={() => this.props.openUserDrawer()}
          level={this.props.level.level}
          percentage={this.props.level.percentage}
          />
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
        role: profile.user.role,
        name: profile.user.name
      }))
      dispatch(setLevelXp(profile.progress.xp))
      dispatch(setCategories(profile.categories))
      dispatch(setAchievements(profile.achievements))
      dispatch(setStatistics(profile.statistics))
    },
    openUserDrawer() {
      dispatch(openUserDrawer())
    }
  }
}

const connectedTopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)

export default connectedTopBar
