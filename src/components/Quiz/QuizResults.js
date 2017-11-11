import React, { Component } from 'react'

import Spinner from '../Spinner'
import QuizResultsChanges from './QuizResultsChanges'
import QuizResultsScore from './QuizResultsScore'

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  loadingContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  score: {
    height: 200
  },
  changes: {
    flexGrow: 1
  }
}

const SCORE_ANIMATION_DURATION = 2500

class QuizResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changesVisible: false
    }
  }

  render() {
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        {
          this.props.isSubmitting &&
          <div style={style.loadingContainer}>
            <Spinner style={style.loading} />
          </div>
        }
        {
          !this.props.isSubmitting && this.props.results.maxQuizScore &&
          <div style={style.resultsContainer}>
            <QuizResultsScore
              value={this.props.results.score || 0}
              max={this.props.results.maxQuizScore}
              duration={SCORE_ANIMATION_DURATION}
              style={style.score}
              />
            <QuizResultsChanges
              changes={this.props.results.profileChanges}
              duration={SCORE_ANIMATION_DURATION}
              style={style.changes}
              />
          </div>
        }
      </div>
    )
  }
}

export default QuizResults
