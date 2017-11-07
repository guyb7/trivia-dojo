import React, { Component } from 'react'

import ease from 'ease-component'

const style = {
  container: {
    fontSize: 18,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class QuizResultsScore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: this.props.start || 0,
      start: this.props.start || 0,
      target: this.props.value || 0,
      duration: this.props.duration || 3000,
      startTime: false,
      stop: false
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      startTime: Date.now()
    }, () => {
      this.animationId = window.requestAnimationFrame(() => { this.animate() })
    })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      target: nextProps.value,
      startTime: Date.now(),
      stop: false
    }, () => {
      this.animationId = window.requestAnimationFrame(() => { this.animate() })
    })
  }

  animate() {
    if (this.state.stop) {
      return
    }

    this.animationId = window.requestAnimationFrame(() => { this.animate() })
    this.draw()
  }

  draw() {
    const now = Date.now()
    const newState = {
      ...this.state,
    }
    if (now - this.state.startTime >= this.state.duration) {
      newState.stop = true
      newState.current = newState.target
    } else {
      const p = (now - this.state.startTime) / this.state.duration
      const val = ease.outQuint(p)
      newState.current = this.state.start + (this.state.target - this.state.start) * val
    }
    this.setState(newState)
  }

  render() {
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        {Math.round(this.state.current)} / {this.props.max}
      </div>
    )
  }
}

export default QuizResultsScore
