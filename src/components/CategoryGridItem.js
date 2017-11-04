import React, { Component } from 'react';
import ButtonBase from 'material-ui/ButtonBase'
import Icon from './Icon'

const style = {
  button: {
    backgroundColor: '#E8E8E8',
    color: '#9B9B9B',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    height: 40,
    width: 40
  },
  title: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: 300
  }
}

class CategoryGridItem extends Component {
  render() {
    return (
      <ButtonBase
          focusRipple
          style={{
            ...style.button,
            ...this.props.style
          }}
          onClick={() => this.props.onClick(this.props)}
        >
        <Icon type={this.props.icon} style={style.icon} />
        <div style={style.title}>
          {this.props.title}
        </div>
      </ButtonBase>
    );
  }
}

export default CategoryGridItem;
