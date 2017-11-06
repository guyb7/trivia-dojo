import React, { Component } from 'react'

import { CircularProgress } from 'material-ui/Progress'

const style = {
  container: {},
  loadingContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
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
          !this.props.isSubmitting &&
          <div>
            Results: {JSON.stringify(this.props.results)}
          </div>
        }
      </div>
    )
  }
}

export default QuizResults
