const defaultState = {
  id: null,
  loggedIn: false,
  name: 'Guest'
}

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

export default user
