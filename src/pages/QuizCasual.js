import React, { Component } from 'react';
import { connect } from 'react-redux'

const style = {
  container: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: 300,
    padding: 10
  }
}

class QuizCasual extends Component {
  getCategory() {
    const categories = this.props.categories
    const urlCategoryId = this.props.match.params.category
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === urlCategoryId) {
        return categories[i]
      }
    }
    console.error('No such category: ' + urlCategoryId)
    return false
  }

  render() {
    return (
      <div style={style.container}>
        {this.getCategory().title} (Casual)
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories
  }
}

const connectedQuizCasual = connect(
  mapStateToProps
)(QuizCasual)

export default connectedQuizCasual
