import React, { Component } from 'react'
import { connect } from 'react-redux'

import Drawer from 'material-ui/Drawer'
import Icon from '../components/Icon'
import IconButton from 'material-ui/IconButton'

import { closeUserDrawer } from '../store/actions'

const style = {
  container: {
    width: '95vw',
    position: 'relative'
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10
  }
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Drawer open={this.props.user.isDrawerOpen} anchor="right">
        <div style={style.container}>
          <IconButton style={style.close} onClick={() => this.props.closeDrawer()}>
            <Icon type='Close' />
          </IconButton>
          <div style={style.page}>
          </div>
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    level: state.level,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeDrawer() {
      dispatch(closeUserDrawer())
    }
  }
}

const connectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default connectedProfile
