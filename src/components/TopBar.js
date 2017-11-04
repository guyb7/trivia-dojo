import React, { Component } from 'react'
import { CircularProgress } from 'material-ui/Progress'

const style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    boxSizing: 'border-box'
  },
  level: {
    position: 'relative'
  },
  levelText: {
    color: '#9B9B9B',
    position: 'absolute',
    width: 20,
    textAlign: 'center',
    marginLeft: -10,
    left: '50%',
    top: 11
  },
  levelProgress: {
    color: '#9B9B9B'
  }
}

class TopBar extends Component {
  render() {
    return (
      <div style={style.container}>
        <div></div>
        <div style={style.level}>
          <div style={style.levelText}>2</div>
          <CircularProgress mode="determinate" value={70} style={style.levelProgress} />
        </div>
      </div>
    );
  }
}

export default TopBar;
