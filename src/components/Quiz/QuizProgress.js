import React, { Component } from 'react'

const style = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  },
  question: {
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    zIndex: 60
  },
  questionStates: {
    empty: {
      color: '#4A4A4A',
      backgroundColor: '#DFE4E8'
    },
    chosen: {
      backgroundColor: '#007ACE'
    },
    correct: {
      backgroundColor: '#50B83C'
    },
    wrong: {
      backgroundColor: '#ED6347'
    },
    current: {
      boxShadow: 'inset 0 0 4px #212B35'
    }
  },
  line: {
    width: '99%',
    borderBottom: '1px solid #DFE4E8',
    position: 'absolute',
    top: 15,
    left: 2,
    zIndex: 50
  }
}

class QuizProgress extends Component {
  render() {
    return (
      <div style={{ ...style.container, ...this.props.style }}>
        {
          this.props.questions.map((q, n) => {
            let questionStyle
            if (q.chosenAnswer === null) {
              questionStyle = style.questionStates.empty
            } else if (q.actualAnswer === null) {
              questionStyle = style.questionStates.chosen
            } else if (q.actualAnswer === q.chosenAnswer) {
              questionStyle = style.questionStates.correct
            } else {
              questionStyle = style.questionStates.wrong
            }
            if (n === this.props.current) {
              questionStyle = {
                ...questionStyle,
                ...style.questionStates.current
              }
            }
            return <div
              key={q.id}
              style={{ ...style.question, ...questionStyle }}
              onClick={() => this.props.onChange(n)}
              >
              {n + 1}
            </div>
          })
        }
        <div style={style.line}></div>
      </div>
    )
  }
}

export default QuizProgress
