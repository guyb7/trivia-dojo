import React, { Component } from 'react';

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
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    this.setState(
    {
      ...this.state,
      categories: [
        {
          title: 'Music',
          icon: 'jill111'
        }, {
          title: 'Geography',
          icon: 'jill111'
        }, {
          title: 'History',
          icon: 'jill111'
        }, {
          title: 'Sports',
          icon: 'jill111'
        }, {
          title: 'Movies',
          icon: 'jill111'
        }, {
          title: 'Science',
          icon: 'jill111'
        }, {
          title: 'Tech',
          icon: 'jill111'
        }, {
          title: 'Animals',
          icon: 'jill111'
        }, {
          title: 'Pop',
          icon: 'jill111'
        }
      ]
    }
  )}

  render() {
    return (
      <div>
        <div style={style.categoriesList}>
          {this.state.categories.map((category, n) => (
            <CategoryGridItem
              key={n}
              style={style.categoriesItem}
              title={category.title}
              />
          ))}
        </div>
        <GameTypeNavigation style={style.bottomNavigation} />
      </div>
    );
  }
}

export default Home;
