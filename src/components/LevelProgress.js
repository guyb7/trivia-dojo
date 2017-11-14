import React, { Component } from 'react'

import { CircularProgress } from 'material-ui/Progress'

import Colors from './Colors'

const style = {
  container: {
    position: 'relative',
    width: 40
  },
  text: {
    color: Colors.ink.lightest,
    position: 'absolute',
    width: 20,
    textAlign: 'center',
    marginLeft: -10,
    left: '50%',
    top: 11
  },
  progress: {
    position: 'absolute',
    color: Colors.ink.lightest,
    top: 0,
    right: 0
  },
  progressBg: {
    color: Colors.ink.lightest,
    thickness: 1,
    opacity: 0.5
  }
}

class LevelProgress extends Component {
  render() {
    return (
      <div
        style={{ ...style.container, ...this.props.style }}
        onClick={e => this.props.onClick(e)}
        >
        <div style={style.text}>{this.props.level}</div>
        <CircularProgress mode="determinate" value={this.props.percentage} style={style.progress} />
        <CircularProgress mode="determinate" value={100} style={style.progressBg} thickness={style.progressBg.thickness} />
      </div>
    )
  }
}

export default LevelProgress
