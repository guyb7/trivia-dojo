import _orderBy from 'lodash/orderBy'
import _sortedUniqBy from 'lodash/sortedUniqBy'

const defaultState = []

const sort = categories => {
  return unique(_orderBy(categories, ['title'], ['asc']))
}

const unique = sortedCategories => {
  return _sortedUniqBy(sortedCategories, 'id')
}

const categories = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return sort(action.categories)

    case 'ADD_CATEGORIES':
      return sort([
        ...state,
        ...action.categories.map(c => ({
          ...c,
          isNew: true
        }))
      ])

    case 'MARK_CATEGORIES_AS_NOT_NEW':
      return sort([
        ...state.map(c => ({
          ...c,
          isNew: false
        }))
      ])

    default:
      return state
  }
}

export default categories
