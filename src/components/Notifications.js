import React, { Component } from 'react'
import { connect } from 'react-redux'

import { removeNotification } from '../store/actions/'
import Snackbar from 'material-ui/Snackbar'
import Colors from './Colors'
import Icon from './Icon'

const style = {
  container: {
    backgroundColor: Colors.ink.light,
    color: Colors.white,
    padding: 10,
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontWeight: 300,
    fontSize: 14,
    marginRight: 10,
    marginLeft: 10
  },
  position: {
    vertical: 'top',
    horizontal: 'center'
  }
}

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      notification: false
    }
    this.timerId = false
  }

  componentDidMount() {
    this.showNotification()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  componentWillReceiveProps(nextProps) {
    this.showNotification(nextProps)
  }

  showNotification(nextProps = this.props) {
    if (this.state.notification === false && nextProps.notifications.queue.length > 0) {
      const notification = nextProps.notifications.queue[0]
      this.setState({
        ...this.state,
        open: true,
        notification
      }, () => {
        this.props.removeNotification(notification.id)
        if (notification.autoHideDuration) {
          this.timerId = setTimeout(() => this.dismiss(), notification.autoHideDuration)
        }
      })
    }
  }

  onExited() {
    this.setState({
      ...this.state,
      notification: false
    }, () => {
      this.showNotification()
    })
  }

  clearTimer() {
    clearTimeout(this.timerId)
    this.timerId = false
  }

  dismiss() {
    this.clearTimer()
    this.setState({
      ...this.state,
      open: false
    })
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        anchorOrigin={style.position}
        onExited={() => this.onExited()}
        >
        <div>
          <div
            style={{ ...style.container, ...this.state.notification.style }}
            onClick={() => this.dismiss()}>
            {
              this.state.notification.icon &&
              <Icon type={this.state.notification.icon} />
            }
            <div style={style.text}>{this.state.notification.text}</div>
          </div>
        </div>
      </Snackbar>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeNotification(id) {
      dispatch(removeNotification(id))
    }
  }
}

const connectedNotifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)

export default connectedNotifications
