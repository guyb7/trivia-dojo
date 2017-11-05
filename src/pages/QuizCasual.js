import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import QuizProgress from '../components/Quiz/QuizProgress'
import { CircularProgress } from 'material-ui/Progress'

import Icon from '../components/Icon'

const style = {
  container: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: 300,
    padding: 10
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  categoryIcon: {
    height: 20,
    width: 20,
    marginRight: 5
  },
  loadingContainer: {
    minHeight: '90vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quizContainer: {
    minHeight: '95vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  }
}

class QuizCasual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: false,
      isLoading: false,
      quizQuestions: []
    }
  }

  componentDidMount() {
    const category = this.getCategory()
    this.setState({
      ...this.state,
      category,
      isLoading: true
    })

    axios.get('/api/quiz/music')
    .then(response => {
      this.setState({
        ...this.state,
        isLoading: false,
        quizQuestions: response.data.questions
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

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
    const category = this.state.category
    return (
      <div style={style.container}>
        {
          category &&
          <div style={style.categoryContainer}>
            <Icon type={category.icon} style={style.categoryIcon} />
            {category.title} (Casual)
          </div>
        }
        {
          this.state.isLoading &&
          <div style={style.loadingContainer}>
            <CircularProgress  />
          </div>
        }
        {
          !this.state.isLoading &&
          <div style={style.quizContainer}>
            <div>Question</div>
            <div>Submit</div>
            <QuizProgress questions={this.state.quizQuestions} />
          </div>
        }
      </div>
    )
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
