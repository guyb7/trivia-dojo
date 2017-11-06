import React, { Component } from 'react'

import Button from 'material-ui/Button'

import Colors from '../Colors'

const style = {
  base: {
    width: '100%',
    marginBottom: 10
  },
  default: {
    backgroundColor: Colors.sky.default
  },
  selected: {
    backgroundColor: Colors.blue.light
  },
  correct: {
    backgroundColor: Colors.green.default
  },
  wrong: {
    backgroundColor: Colors.red.default
  }
}

class QuizOption extends Component {
  render() {
    return (
      <Button
        raised
        style={{
          ...style.base,
          ...style[this.props.status],
          ...this.props.style
          }}
          onClick={this.props.onClick}
          disabled={this.props.disabled}
          >
        {this.props.text}
      </Button>
    )
  }
}

export default QuizOption
