const defaultState = []

const categories = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return [
        ...action.categories
      ]

    case 'ADD_CATEGORIES':
      //TODO ignore existing categories
      return [
        ...state,
        ...action.categories.map(c => ({
          ...c,
          isNew: true
        }))
      ]

    case 'MARK_CATEGORIES_AS_NOT_NEW':
      return [
        ...state.map(c => ({
          ...c,
          isNew: false
        }))
      ]

    default:
      return state
  }
}

export default categories
