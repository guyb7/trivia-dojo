import React, { Component } from 'react'
import { connect } from 'react-redux'
import _times from 'lodash/times'

import Drawer from 'material-ui/Drawer'
import Icon from '../components/Icon'
import IconButton from 'material-ui/IconButton'

import { closeUserDrawer } from '../store/actions'
import Achievement from '../components/Profile/Achievement'
import LevelProgress from '../components/LevelProgress'
import Register from '../components/Profile/Register'
import StatisticsItem from '../components/Profile/StatisticsItem'
import Level from '../shared/Level'
import Colors from '../components/Colors'

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
    alignItems: 'center',
    padding: 10
  },
  xp: {
    color: Colors.ink.light,
  },
  sectionWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: Colors.sky.light,
    margin: 5,
    flexGrow: 1,
    width: '23%'
  },
  emptyItem: {
    margin: 5,
    flexGrow: 1,
    width: '23%'
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

  isGuest() {
    return this.props.user.role === 'guest'
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
              {
                !this.isGuest() &&
                <div style={style.sectionTile}>
                  <div style={style.username}>{this.props.user.name}</div>
                  <p>{this.props.user.email || 'No email'}</p>
                </div>
              }
            </div>
            {
              this.isGuest() &&
              <div style={style.sectionRow}>
                <div style={style.sectionTile}>
                  <Register />
                </div>
              </div>
            }
            <h1 style={style.sectionHeader}>Achievements</h1>
            <div style={style.sectionWrap}>
              {
                this.props.achievements.map(a => {
                  return (
                    <Achievement
                      style={style.item}
                      key={a.key}
                      icon={a.icon}
                      title={a.title}
                      description={a.description} />
                  )
                })
              }
              {
                _times(3 - this.props.achievements.length % 3, n => 
                  <div
                    key={'empty-' + n}
                    style={style.emptyItem}>
                  </div>
                )
              }
            </div>
            <h1 style={style.sectionHeader}>Statistics</h1>
            <div style={style.sectionWrap}>
              {
                this.props.statistics.map(s => {
                  return (
                    <StatisticsItem
                      style={style.item}
                      key={s.key}
                      text={s.text}
                      number={s.number} />
                  )
                })
              }
              {
                _times(3 - this.props.statistics.length % 3, n => 
                  <div
                    key={'empty-' + n}
                    style={style.emptyItem}>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    achievements: state.achievements,
    level: state.level,
    user: state.user,
    statistics: state.statistics
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
