import _filter from 'lodash/filter'

const defaultState = {
  queue: []
}

const notifications = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        queue: [
          ...state.queue,
          action.notification
        ]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        queue: _filter(state.queue, n => { return n.id !== action.id })
      }
    default:
      return state
  }
}

export default notifications
