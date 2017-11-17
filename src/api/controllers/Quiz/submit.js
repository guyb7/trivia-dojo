import { query } from '../../Server/DB'

const getAnswers = async questions => {
  const ids = questions.reduce((acc, q) => {
    acc.push(q.id.replace(/[^0-9a-f\-]/g, ''))
    return acc
  }, [])
  const idsSql = ids.join("','")
  const res = await query(`SELECT id, answer FROM questions WHERE id IN ('${idsSql}')`)
  const dict = res.rows.reduce((acc, q) => {
    acc[q.id] = q.answer
    return acc
  }, {})
  return dict
}

export default async questions => {
  const answers = await getAnswers(questions)
  const correctScore = 30
  const wrongScore = 0

  let score = 0
  const results = questions.reduce((acc, q) => {
    score += q.answer === answers[q.id] ? correctScore : wrongScore
    acc[q.id] = {
      correctAnswer: answers[q.id],
      isCorrect: q.answer === answers[q.id],
      score: q.answer === answers[q.id] ? correctScore : wrongScore
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
