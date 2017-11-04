import React, { Component } from 'react';
import ButtonBase from 'material-ui/ButtonBase'
import StarIcon from 'material-ui-icons/Star'

const style = {
  button: {
    backgroundColor: '#E8E8E8',
    color: '#9B9B9B',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
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
        >
        <StarIcon />
        {this.props.title}
      </ButtonBase>
    );
  }
}

export default CategoryGridItem;
