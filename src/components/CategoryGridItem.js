import React, { Component } from 'react';

import ButtonBase from 'material-ui/ButtonBase'

import Icon from './Icon'
import Colors from './Colors'

const style = {
  button: {
    backgroundColor: Colors.sky.light,
    color: Colors.ink.lightest,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  icon: {
    height: 40,
    width: 40
  },
  title: {
    color: Colors.ink.default,
    fontSize: 14,
    fontWeight: 300
  },
  badgeNew: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.purple.default,
    color: Colors.white,
    padding: 5,
    fontSize: 11
  }
}

class CategoryGridItem extends Component {
  render() {
    return (
      <div style={{ ...this.props.style }}>
        <ButtonBase
            focusRipple
            style={{
              ...style.button,
              ...this.props.buttonStyle
            }}
            onClick={() => this.props.onClick(this.props)}
          >
          <Icon type={this.props.icon} style={style.icon} />
          <div style={style.title}>
            {this.props.title}
          </div>
          {
            this.props.isNew &&
            <div style={style.badgeNew}>New</div>
          }
        </ButtonBase>
      </div>
    );
  }
}

export default CategoryGridItem;
