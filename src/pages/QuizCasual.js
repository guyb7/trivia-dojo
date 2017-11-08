import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import _each from 'lodash/each'
import _findIndex from 'lodash/findIndex'

import Question from '../components/Quiz/Question'
import QuizProgress from '../components/Quiz/QuizProgress'
import QuizResults from '../components/Quiz/QuizResults'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

import Icon from '../components/Icon'
import Colors from '../components/Colors'

let keyHandler

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
    backgroundColor: Colors.title.default,
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
      quizQuestions: [],
      quizResults: false,
      isResultsVisible: false
    }
  }

  componentDidMount() {
    const category = this.getCategory()
    this.setState({
      ...this.state,
      category,
      isLoading: true
    })
    this.getNewQuiz()
    this.keydownListener = k => {
      this.onKeyDown(k)
    }
    keyHandler = k => { this.onKeydown(k) }
    document.body.addEventListener('keydown', keyHandler, false)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', keyHandler ,false)
  }

  onKeydown(k) {
    switch(k.code) {
      case 'ArrowLeft':
        if (this.state.currentQuestion > 0) {
          this.changeCurrentQuestion(this.state.currentQuestion - 1)
        }
        break
      case 'ArrowRight':
        if (this.state.currentQuestion < this.state.quizQuestions.length - 1) {
          this.changeCurrentQuestion(this.state.currentQuestion + 1)
        }
        break
      case 'ArrowDown':
        this.nextAnswer()
        break
      case 'ArrowUp':
        this.prevAnswer()
        break
      case 'Enter':
        if (this.state.isSubmitted) {
          this.backHome(false)
        } else {
          this.submitQuiz()
        }
        break
      default:
    }
  }

  getNewQuiz() {
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
      currentQuestion: n,
      isResultsVisible: false
    })
  }

  addAnswer(question, answer) {
    const current = this.state.quizQuestions[this.state.currentQuestion]
    if (current.id === question) {
      const newQuizQuestions = [...this.state.quizQuestions]
      newQuizQuestions[this.state.currentQuestion].chosenAnswer = answer
      this.setState({
        ...this.state,
        quizQuestions: newQuizQuestions
      }, () => {
        //TODO prevent multiple clicks during delay
        setTimeout(() => {
          this.goToNextUnanswered()
        }, 400)
      })
    } else {
      console.error('Answered not current question?', question)
    }
  }

  nextAnswer() {
    const current = this.state.quizQuestions[this.state.currentQuestion]
    const idx = _findIndex(current.options, o => o === current.chosenAnswer)
    if (idx >= current.options.length - 1 ) {
      return
    }
    const newQuizQuestions = [...this.state.quizQuestions]
    newQuizQuestions[this.state.currentQuestion].chosenAnswer = current.options[idx + 1]
    this.setState({
      ...this.state,
      quizQuestions: newQuizQuestions
    })
    this.checkForUnanswered()
  }

  prevAnswer() {
    const current = this.state.quizQuestions[this.state.currentQuestion]
    const idx = _findIndex(current.options, o => o === current.chosenAnswer)
    if (idx < 1 ) {
      return
    }
    const newQuizQuestions = [...this.state.quizQuestions]
    newQuizQuestions[this.state.currentQuestion].chosenAnswer = current.options[idx - 1]
    this.setState({
      ...this.state,
      quizQuestions: newQuizQuestions
    })
    this.checkForUnanswered()
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

  checkForUnanswered() {
    const questions = this.state.quizQuestions
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].chosenAnswer === null) {
        this.setState({
          ...this.state,
          isAllAnswered: false
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
    if (this.state.isSubmitted || !this.state.isAllAnswered) {
      return
    }
    this.setState({
      ...this.state,
      isSubmitted: true,
      isSubmitting: true,
      isResultsVisible: true,
      currentQuestion: 999
    })
    const questions = this.state.quizQuestions.map(q => {
      return {
        id: q.id,
        answer: q.chosenAnswer
      }
    })
    axios.post('/api/quiz', { questions })
    .then(response => {
      this.animateResults(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  animateResults(data) {
    this.setState({
      ...this.state,
      isSubmitting: false
    })
    const delay = 500
    let questions = [ ...this.state.quizQuestions ]
    let results = {
      maxQuizScore: data.summary.maxQuizScore,
      score: 0
    }
    _each(this.state.quizQuestions, (q, n) => {
      setTimeout(() => {
        questions[n] = {
          ...questions[n],
          actualAnswer: data.results[q.id].correctAnswer
        }
        results.score += data.results[q.id].score
        this.setState({
          ...this.state,
          quizQuestions: [ ...questions ]
        })
      }, delay * (n + 1))
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        quizResults: { ...results }
      })
    }, delay * (this.state.quizQuestions.length + 1))
  }

  backHome(delay = true) {
    //TODO prevent multiple clicks during delay
    setTimeout(() => {
      this.props.history.push('/')
    }, delay ? 400 : 0)
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
          !this.state.isLoading && !this.state.isResultsVisible &&
          <Question
            style={style.question}
            question={this.state.quizQuestions[this.state.currentQuestion]}
            onAnswer={(q, a) => this.addAnswer(q, a)}
            readOnly={this.state.isSubmitted}
            />
        }
        {
          this.state.isResultsVisible &&
          <QuizResults
            style={style.quizResults}
            isSubmitting={this.state.isSubmitting}
            results={this.state.quizResults}
            />
        }
        {
          this.state.isSubmitted && !this.state.isSubmitting &&
          <Button
            raised
            style={style.submit}
            onClick={() => this.backHome()}>
            Continue
          </Button>
        }
        {
          !this.state.isSubmitted && !this.state.isLoading &&
          <Button
            raised
            style={{
              ...style.submit,
              visibility: this.state.isAllAnswered ? 'visible' : 'hidden' }}
              onClick={() => {
                //TODO prevent multiple clicks during delay
                setTimeout(() => {
                  this.submitQuiz()
                }, 400)
              }}>
            Submit
          </Button>
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
