import React, { Component } from 'react'

import QuizOption from './QuizOption'

const style = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexGrow: 1
  },
  question: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexGrow: 1
  },
  questionText: {
    color: '#212B35',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 300,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class Question extends Component {
  render() {
    const question = this.props.question
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        {
          question &&
          <div style={style.question}>
            <h2 style={style.questionText}>{question.question}</h2>
            <div>
              {
                question.options.map(option => {
                  let optionStatus = 'default'
                  return <QuizOption
                    text={option}
                    status={optionStatus} />
                })
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Question
