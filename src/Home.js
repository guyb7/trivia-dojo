import React, { Component } from 'react';

import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import CategoryGridItem from './components/CategoryGridItem'

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
  navigation: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
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
        <Paper style={style.navigation}>
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
      </div>
    );
  }
}

export default Home;
