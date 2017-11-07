import React, { Component } from 'react'

import QuizOption from './QuizOption'

import Colors from '../Colors'

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
    color: Colors.ink.default,
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
                question.options.map((option, n) => {
                  let optionStatus
                  if (this.props.readOnly) {
                    if (question.actualAnswer === option) {
                      optionStatus = 'correct'
                    } else if (question.chosenAnswer === option) {
                      optionStatus = 'wrong'
                    } else {
                      optionStatus = 'default'
                    }
                  } else {
                    if (question.chosenAnswer === option) {
                      optionStatus = 'selected'
                    } else {
                      optionStatus = 'default'
                    }
                  }
                  return (
                    <QuizOption
                      key={option}
                      text={option}
                      status={optionStatus}
                      onClick={() => this.props.onAnswer(question.id, option)}
                      disabled={this.props.readOnly}
                      number={n+1}
                      />
                  )
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
