import Categories from './categories'

export const setUser = user => {
  return {
    type: 'SET_USER',
    ...user
  }
}

export const setLevel = level => {
  return {
    type: 'SET_LEVEL',
    level
  }
}

export const loadCategories = Categories.loadCategories
