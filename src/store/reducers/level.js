const defaultState = {
  level: 1,
  percentage: 70
}

const level = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_LEVEL':
      return {
        ...state,
        ...action.level
      }
    default:
      return state
  }
}

export default level
