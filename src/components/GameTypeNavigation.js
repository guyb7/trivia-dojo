import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'

const style = {
  container: {
    width: '100%'
  }
}

class GameTypeNavigation extends Component {
  render() {
    return (
      <Paper style={{ ...style.container, ...this.props.style }}>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          centered
          fullWidth
        >
          <Tab label="Casual" />
          <Tab label="Ranked" disabled />
          <Tab label="Events" disabled />
        </Tabs>
      </Paper>
    );
  }
}

export default GameTypeNavigation;
