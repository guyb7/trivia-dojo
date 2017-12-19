import React, { Component } from 'react'

import { CircularProgress } from 'material-ui/Progress'

import Colors from './Colors'

const style = {
  container: {
    position: 'relative',
    width: 40
  },
  containerBig: {
    width: 100
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
  textBig: {
    color: Colors.ink.light,
    fontSize: 28,
    top: 32
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
  isBig() {
    return this.props.size === 'big'
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render() {
    return (
      <div
        style={{
          ...style.container,
          ...(this.isBig() ? style.containerBig : {}),
          ...this.props.style
        }}
        onClick={this.onClick}
        >
        <div
          style={{
            ...style.text,
            ...(this.isBig() ? style.textBig : {})
          }}>
          {this.props.level}
        </div>
        <CircularProgress
          mode="determinate"
          value={this.props.percentage}
          size={this.isBig() ? style.containerBig.width : undefined}
          style={style.progress} />
          <CircularProgress
          mode="determinate"
          value={100}
          size={this.isBig() ? style.containerBig.width : undefined}
          style={style.progressBg}
          thickness={style.progressBg.thickness} />
      </div>
    )
  }
}

export default LevelProgress
