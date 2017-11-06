import React, { Component } from 'react'

const style = {
  container: {}
}

class QuizResults extends Component {
  render() {
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        Results...
      </div>
    )
  }
}

export default QuizResults
