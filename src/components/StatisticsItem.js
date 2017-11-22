import React, { Component } from 'react'

import Colors from './Colors'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    minWidth: 50
  },
  text: {
    color: Colors.ink.default,
    fontSize: 14,
    fontWeight: 300,
    textAlign: 'center',
    padding: 0,
    margin: 0,
    marginBottom: 10
  },
  number: {
    color: Colors.ink.light,
    fontSize: 24,
    textAlign: 'center',
    padding: 0,
    margin: 10
  }
}

class StatisticsItem extends Component {
  render() {
    return (
      <div onClick={this.toggleTooltip} style={{ ...style.container, ...this.props.style }}>
        <p style={style.number}>
          {this.props.number}
        </p>
        <p style={style.text}>
          {this.props.text}
        </p>
      </div>
    )
  }
}

export default StatisticsItem
