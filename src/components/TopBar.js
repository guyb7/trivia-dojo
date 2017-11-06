import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setLevel } from '../store/actions'
import { CircularProgress } from 'material-ui/Progress'

import Colors from './Colors'

const style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
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
    color: Colors.ink.lightest
  }
}

class TopBar extends Component {
  render() {
    return (
      <div style={style.container}>
        <div></div>
        <div style={style.level} onClick={() => this.props.setPercentage()}>
          <div style={style.levelText}>{this.props.level.level}</div>
          <CircularProgress mode="determinate" value={this.props.level.percentage} style={style.levelProgress} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    level: state.level
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPercentage: () => {
      dispatch(setLevel({ percentage: 50 }))
    }
  }
}

const connectedTopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)

export default connectedTopBar
