import React, { Component } from 'react'
import { connect } from 'react-redux'
import _once from 'lodash/once'
import _times from 'lodash/times'

import { loadCategories, markCategoriesAsNotNew } from '../store/actions'
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
    if (this.props.categories.length === 0) {
      this.props.getCategories()
    }
  }

  componentWillUnmount() {
    this.props.markCategoriesAsNotNew()
  }

  startCasualQuiz(category) {
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
              isNew={!!category.isNew}
              icon={category.icon}
              onClick={_once(category => this.startCasualQuiz(category))}
              />
          ))}
          {
            _times(3 - this.props.categories.length % 3, n => 
              <div
                key={'empty-' + n}
                style={style.categoriesItem}>
              </div>
            )
          }
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
    },
    markCategoriesAsNotNew: () => {
      dispatch(markCategoriesAsNotNew())
    }
  }
}

const connectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default connectedHome
