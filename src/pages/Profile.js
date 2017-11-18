import React, { Component } from 'react'
import { connect } from 'react-redux'

import Drawer from 'material-ui/Drawer'
import Icon from '../components/Icon'
import IconButton from 'material-ui/IconButton'

import { closeUserDrawer } from '../store/actions'
import LevelProgress from '../components/LevelProgress'
import Colors from '../components/Colors'
import Level from '../shared/Level'

const style = {
  container: {
    width: '95vw',
    position: 'relative'
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  sectionHeader: {
    color: Colors.ink.light,
    fontSize: 16,
    fontWeight: 300,
    marginTop: 30,
    marginBottom: 5,
    marginLeft: 10
  },
  sectionRow: {
    display: 'flex'
  },
  sectionTile: {
    flexGrow: 1,
    backgroundColor: Colors.sky.light,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  xp: {
    color: Colors.ink.light,
  }
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getXpRangeText() {
    const { level, xp } = this.props.level
    const currentLevelStartXp = Level.getXpStart(level)
    const nextLevelStartXp = Level.getXpStart(level + 1)
    return (xp - currentLevelStartXp) + ' / ' + (nextLevelStartXp - currentLevelStartXp)
  }

  render() {
    return (
      <Drawer open={this.props.user.isDrawerOpen} anchor="right">
        <div style={style.container}>
        <IconButton style={style.close} onClick={() => this.props.closeDrawer()}>
        <Icon type='Close' />
        </IconButton>
        <div style={style.page}>
          <h1 style={style.sectionHeader}>Profile</h1>
          <div style={style.sectionRow}>
              <div style={style.sectionTile}>
                <LevelProgress
                  size='big'
                  level={this.props.level.level}
                  percentage={this.props.level.percentage}
                  />
                <div style={style.xp}>
                  {this.getXpRangeText()}
                </div>
              </div>
              <div style={style.sectionTile}>
                <p>{this.props.user.name}</p>
                <p>{this.props.user.email || 'No email'}</p>
                <p>Logout</p>
              </div>
            </div>
            <h1 style={style.sectionHeader}>Achievements</h1>
            <div style={style.sectionWrap}>
              <div style={style.sectionTile}>
                Aaa
              </div>
            </div>
            <h1 style={style.sectionHeader}>Statistics</h1>
            <div style={style.sectionRow}>
              <div style={style.sectionTile}>
                123
              </div>
              <div style={style.sectionTile}>
                123
              </div>
            </div>
          </div>
        </div>
      </Drawer>
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
    closeDrawer() {
      dispatch(closeUserDrawer())
    }
  }
}

const connectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default connectedProfile
