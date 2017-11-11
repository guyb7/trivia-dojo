const defaultState = {
  id: null,
  loggedIn: false,
  name: 'Guest',
  isDrawerOpen: false
}

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action
      }
    case 'OPEN_USER_DRAWER':
      return {
        ...state,
        isDrawerOpen: true
      }
    case 'CLOSE_USER_DRAWER':
      return {
        ...state,
        isDrawerOpen: false
      }
    default:
      return state
  }
}

export default user
