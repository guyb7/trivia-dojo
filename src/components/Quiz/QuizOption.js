import React, { Component } from 'react'

import ButtonBase from 'material-ui/ButtonBase'

import Colors from '../Colors'

const style = {
  number: {
    marginLeft: 20,
    marginRight: 20,
    opacity: 0.6
  },
  base: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    fontSize: 15,
    justifyContent: 'flex-start',
    padding: 0
  },
  default: {
    color: Colors.ink.default,
    backgroundColor: Colors.sky.default
  },
  selected: {
    color: Colors.blue.text,
    backgroundColor: Colors.blue.light
  },
  correct: {
    color: Colors.green.text,
    backgroundColor: Colors.green.default
  },
  wrong: {
    color: Colors.red.text,
    backgroundColor: Colors.red.default
  }
}

class QuizOption extends Component {
  render() {
    return (
      <ButtonBase
        style={{
          ...style.base,
          ...style[this.props.status],
          ...this.props.style
          }}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
          focusRipple
        >
        <div style={style.number}>
          {this.props.number}
        </div>
        <span>
          {this.props.text}
        </span>
      </ButtonBase>
    )
  }
}

export default QuizOption
