import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loadCategories } from '../store/actions'
import CategoryGridItem from '../components/CategoryGridItem'
import GameTypeNavigation from '../components/GameTypeNavigation'

const style = {
  categoriesList: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 400,
    marginLeft: 'auto',
    marginTop: 60,
    marginRight: 'auto',
    marginBottom: 60
  },
  categoriesItem: {
    flexGrow: 1,
    height: 100,
    padding: 5,
    width: '30%'
  },
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    left: 0
  }
}

class Home extends Component {
  componentDidMount() {
    this.props.getCategories()
  }

  startCasualQuiz(category) {
    //TODO prevent multiple clicks during delay
    setTimeout(() => {
      this.props.history.push('/casual/' + category.id)
    }, 400)
  }

  render() {
    return (
      <div>
        <div style={style.categoriesList}>
          {this.props.categories.map((category, n) => (
            <CategoryGridItem
              key={category.id}
              style={style.categoriesItem}
              id={category.id}
              title={category.title}
              icon={category.icon}
              onClick={category => this.startCasualQuiz(category)}
              />
          ))}
        </div>
        <GameTypeNavigation style={style.bottomNavigation} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: () => {
      dispatch(loadCategories())
    }
  }
}

const connectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectedHome
