import React, { Component } from 'react'
import { connect } from 'react-redux'

import CategoryGridItem from '../components/CategoryGridItem'

const style = {
  container: {
    padding: 20
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    width: 100,
    height: 100,
    margin: 10
  }
}

class Home extends Component {
  isAdmin() {
    return this.props.user.role === 'admin'
  }

  navigateTo(path) {
    this.props.history.push('/admin/' + path)
  }

  render() {
    return (
      <div style={style.container}>
        {
          this.isAdmin() &&
          <div>
          <h2>Admin</h2>
            <div style={style.list}>
              <CategoryGridItem
                style={style.button}
                title='Users'
                icon='Users'
                onClick={() => this.navigateTo('users')}
                />
              <CategoryGridItem
                style={style.button}
                title='Categories'
                icon='Categories'
                onClick={() => this.navigateTo('categories')}
                />
              <CategoryGridItem
                style={style.button}
                title='Questions'
                icon='Questions'
                onClick={() => this.navigateTo('questions')}
                />
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const connectedAdminHome = connect(
  mapStateToProps
)(Home)

export default connectedAdminHome
