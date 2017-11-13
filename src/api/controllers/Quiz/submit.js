const mockAnswers = {
  'ab1234': 'Showbiz',
  'ab1235': 'Metallica',
  'ab1236': 'Thriller, Michael Jackson',
  'ab1237': 'Dire Straits'
}

export default questions => {
  const correctScore = 30
  const wrongScore = 0

  let score = 0
  const results = questions.reduce((acc, q) => {
    score += q.answer === mockAnswers[q.id] ? correctScore : wrongScore
    acc[q.id] = {
      correctAnswer: mockAnswers[q.id],
      isCorrect: q.answer === mockAnswers[q.id],
      score: q.answer === mockAnswers[q.id] ? correctScore : wrongScore
    }
    return acc
  }, {})

  return {
    success: true,
    results,
    summary: {
      maxQuizScore: correctScore * questions.length,
      score
    },
    profileChanges: {
      xp: score,
      achievements: [
        {
          image: 'MusicNote',
          name: 'Music Master'
        }
      ],
      newCategories: [
        {
          id: 'food',
          title: 'Food',
          icon: 'Food'
        }, {
          id: 'brands',
          title: 'Brands',
          icon: 'Label'
        }
      ]
    }
  }
}
