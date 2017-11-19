export default async userId => {
  const res = [
    {
      key: 'music-master',
      icon: 'MusicNote',
      title: 'Music Master',
      description: '10 correct music answers',
      status: 'completed'
    }, {
      key: 'geography-ninja',
      icon: 'Globe',
      title: 'Geography Ninja',
      description: '10 correct geography answers',
      status: 'in-progress',
      value: 40
    }, {
      key: 'perfect-quiz',
      icon: 'Stars',
      title: 'Perfect Quiz',
      description: 'Complete a quiz without any wrong answers',
      status: 'locked'
    }
  ]
  return res
}
