import Level from '../../shared/Level'

const defaultState = {
  level: 1,
  percentage: 0,
  xp: 0
}

const level = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_LEVEL_XP':
      const level = Level.calcLevel(action.xp)
      const start = Level.getXpStart(level)
      const end = Level.getXpStart(level + 1)
      const percentage = Math.floor((action.xp - start) / (end - start) * 100)
      return {
        ...state,
        xp: action.xp,
        level,
        percentage
      }
    default:
      return state
  }
}

export default level
