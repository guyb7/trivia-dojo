const defaultState = []

const statistics = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_STATISTICS':
      return [
        ...action.statistics
      ]
    default:
      return state
  }
}

export default statistics
