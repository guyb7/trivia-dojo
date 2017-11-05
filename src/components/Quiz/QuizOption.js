import React, { Component } from 'react'

import Button from 'material-ui/Button'

const style = {
  base: {
    width: '100%',
    marginBottom: 10
  },
  default: {
    backgroundColor: '#DFE4E8'
  },
  selected: {
    backgroundColor: 'red'
  }
}

class QuizOption extends Component {
  render() {
    console.log('option', this.props.option)
    return (
      <Button
        raised
        style={{
          ...style.base,
          ...style[this.props.status],
          ...this.props.style
          }}>
        {this.props.text}
      </Button>
    )
  }
}

export default QuizOption
