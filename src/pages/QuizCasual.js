import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Question from '../components/Quiz/Question'
import QuizProgress from '../components/Quiz/QuizProgress'
import QuizResults from '../components/Quiz/QuizResults'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

import Icon from '../components/Icon'
import Colors from '../components/Colors'

const style = {
  container: {
    color: Colors.ink.lightest,
    fontSize: 14,
    fontWeight: 300,
    padding: 10,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '100%'
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
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  loading: {
    color: Colors.ink.lightest
  },
  question: {
    flexGrow: 1
  },
  submit: {
    backgroundColor: Colors.green.default,
    color: Colors.white,
    marginTop: 20,
    marginBottom: 20
  },
  quizProgress: {
    marginTop: 10
  },
  quizResults: {
    flexGrow: 1
  }
}

class QuizCasual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: false,
      isLoading: false,
      isAllAnswered: false,
      isSubmitted: false,
      isSubmitting: false,
      currentQuestion: 0,
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
        quizQuestions: response.data.questions.map(q => {
          return {
            ...q,
            chosenAnswer: null,
            actualAnswer: null
          }
        })
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

  changeCurrentQuestion(n) {
    this.setState({
      ...this.state,
      currentQuestion: n
    })
  }

  addAnswer(question, answer) {
    const current = this.state.quizQuestions[this.state.currentQuestion]
    if (current.id === question) {
      current.chosenAnswer = answer
      //TODO prevent multiple clicks during delay
      setTimeout(() => {
        this.goToNextUnanswered()
      }, 400)
    } else {
      console.error('Answered not current question?', question)
    }
  }

  goToNextUnanswered() {
    const questions = this.state.quizQuestions
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].chosenAnswer === null) {
        this.setState({
          ...this.state,
          currentQuestion: i
        })
        return
      }
    }
    this.setState({
      ...this.state,
      isAllAnswered: true
    })
  }

  submitQuiz() {
    this.setState({
      ...this.state,
      isSubmitted: true,
      isSubmitting: true
    })
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
          !this.state.isSubmitted && this.state.isLoading &&
          <div style={style.loadingContainer}>
            <CircularProgress style={style.loading} />
          </div>
        }
        {
          !this.state.isSubmitted && !this.state.isLoading &&
          <Question
            style={style.question}
            question={this.state.quizQuestions[this.state.currentQuestion]}
            onAnswer={(q, a) => this.addAnswer(q, a)}
            />
        }
        {
          !this.state.isSubmitted && !this.state.isLoading &&
          <Button
            raised
            style={{
              ...style.submit,
              visibility: this.state.isAllAnswered ? 'visible' : 'hidden' }}
              onClick={() => this.submitQuiz()}>
            Submit
          </Button>
        }
        {
          this.state.isSubmitted && <QuizResults style={style.quizResults} />
        }
        {
          !this.state.isLoading &&
          <QuizProgress
            questions={this.state.quizQuestions}
            current={this.state.currentQuestion}
            style={style.quizProgress}
            onChange={n => this.changeCurrentQuestion(n)}
            />
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
