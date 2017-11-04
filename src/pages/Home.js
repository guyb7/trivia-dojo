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
    marginTop: 50,
    marginRight: 'auto',
    marginBottom: 50,
  },
  categoriesItem: {
    height: 100,
    width: 100,
    margin: 10
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
    this.props.history.push('/casual/' + category.id)
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
