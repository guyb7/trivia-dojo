import React, { Component } from 'react'

import Icon from '../Icon'
import Colors from '../Colors'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  },
  icon: {
    color: Colors.ink.lightest,
    height: 40,
    width: 40,
    marginTop: 20
  },
  title: {
    color: Colors.ink.default,
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
    margin: 0
  },
  description: {
    color: Colors.ink.light,
    fontSize: 14,
    fontWeight: 300,
    textAlign: 'center',
    borderTop: `1px solid ${Colors.sky.default}`,
    padding: 10,
    margin: 0
  }
}

class Achievement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleDescription = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }

  render() {
    return (
      <div onClick={this.toggleDescription} style={{ ...style.container, ...this.props.style }}>
        <Icon type={this.props.icon} style={style.icon} />
        <p style={style.title}>
          {this.props.title}
        </p>
        {
          this.state.open &&
          <p style={style.description}>
            {this.props.description}
          </p>
        }
      </div>
    )
  }
}

export default Achievement
