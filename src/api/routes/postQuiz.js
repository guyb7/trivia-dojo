const mockAnswers = {
  'ab1234': 'Showbiz',
  'ab1235': 'Metallica',
  'ab1236': 'Thriller, Michael Jackson',
  'ab1237': 'Dire Straits'
}

export default (req, res) => {
  const correctScore = 30
  const wrongScore = 0

  const success = () => {
    let score = 0
    const results = req.body.questions.reduce((acc, q) => {
      score += q.answer === mockAnswers[q.id] ? correctScore : wrongScore
      acc[q.id] = {
        correctAnswer: mockAnswers[q.id],
        isCorrect: q.answer === mockAnswers[q.id],
        score: q.answer === mockAnswers[q.id] ? correctScore : wrongScore
      }
      return acc
    }, {})
    res.json({
      success: true,
      results,
      summary: {
        maxQuizScore: correctScore * req.body.questions.length,
        score
      }
    })
  }
  setTimeout(success, 800)
}
