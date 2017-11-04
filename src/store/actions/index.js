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

export const addCategory = category => {
  return {
    type: 'ADD_CATEGORY',
    title: category.title,
    icon: category.icon
  }
}
