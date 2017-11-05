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
    color: '#4A4A4A',
    backgroundColor: '#E8E8E8',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    zIndex: 60
  },
  line: {
    width: '99%',
    borderBottom: '1px solid #ccc',
    position: 'absolute',
    top: 15,
    left: 2,
    zIndex: 50
  }
}

class QuizProgress extends Component {
  render() {
    return (
      <div style={style.container}>
        {
          this.props.questions.map((q, n) => {
            return <div style={style.question}>
              {n + 1}
            </div>
          })
        }
        <div style={style.line}></div>
      </div>
    );
  }
}

export default QuizProgress;
