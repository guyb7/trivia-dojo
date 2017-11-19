export default {
  setAchievements(achievements) {
    return {
      type: 'SET_ACHIEVEMENTS',
      achievements
    }
  },

  completeAchievement(id) {
    return {
      type: 'COMPLETE_ACHIEVEMENT',
      id
    }
  }
}
