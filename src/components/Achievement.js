import React, { Component } from 'react'

import { ListItem, ListItemText } from 'material-ui/List'

import Icon from './Icon'
import Colors from './Colors'

const style = {
  icon: {
    color: Colors.ink.lightest,
    height: 40,
    width: 40
  },
  title: {
    color: Colors.ink.default,
    fontSize: 14,
    fontWeight: 300
  }
}

class Achievement extends Component {
  render() {
    return (
      <ListItem style={{ ...this.props.style }}>
        <Icon type={this.props.icon} style={style.icon} />
        <ListItemText
          primary={this.props.title}
          secondary={this.props.description}
          />
      </ListItem>
    )
  }
}

export default Achievement
