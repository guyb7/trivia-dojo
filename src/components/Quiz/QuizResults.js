import React, { Component } from 'react'

import { CircularProgress } from 'material-ui/Progress'
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
    height: 300
  }
}

class QuizResults extends Component {
  render() {
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        {
          this.props.isSubmitting &&
          <div style={style.loadingContainer}>
            <CircularProgress style={style.loading} />
          </div>
        }
        {
          !this.props.isSubmitting && this.props.results.maxQuizScore &&
          <div style={style.resultsContainer}>
            <QuizResultsScore
              value={this.props.results.score || 0}
              max={this.props.results.maxQuizScore}
              />
          </div>
        }
      </div>
    )
  }
}

export default QuizResults
