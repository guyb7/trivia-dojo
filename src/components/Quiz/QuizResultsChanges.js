import React, { Component } from 'react'
import _each from 'lodash/each'

const style = {
  container: {
    listStyle: 'none',
    maxWidth: 300
  },
  item: {
    padding: 10
  }
}

class QuizResultsChanges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      delay: this.props.duration || 0,
      list: []
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        isVisible: true
      }, () => this.animateList())
    }, this.state.delay)
  }

  animateList() {
    const list = []
    _each(this.props.changes.newCategories, c => {
      list.push({
        text: c.title + ' category unlocked'
      })
    })
    _each(this.props.changes.achievements, a => {
      list.push({
        text: 'New achievement: ' + a.name
      })
    })
    _each(list, (i, n) => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          list: [ ...this.state.list, i ]
        })
      }, 400 * n)
    })
  }

  render() {
    return (
      <ul style={{ ...style.container, ...this.props.style, visibility: this.state.isVisible ? 'visible' : 'hidden' }}>
        {
          this.state.list.map((i, n) => {
            return (
              <li key={n} style={style.item}>{i.text}</li>
            )
          })
        }
      </ul>
    )
  }
}

export default QuizResultsChanges
