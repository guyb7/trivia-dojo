const defaultState = []

const achievements = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ACHIEVEMENTS':
      return action.achievements

    case 'COMPLETE_ACHIEVEMENT':
      return state

    default:
      return state
  }
}

export default achievements
