import React, { Component } from 'react'

const style = {
  container: {}
}

class QuizResults extends Component {
  render() {
    console.log('option', this.props.option)
    return (
      <div style={style.container}>
        Results...
      </div>
    )
  }
}

export default QuizResults
