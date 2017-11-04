const defaultState = [
  {
    title: 'Music',
    icon: 'jill111'
  }, {
    title: 'Geography',
    icon: 'jill111'
  }, {
    title: 'History',
    icon: 'jill111'
  }, {
    title: 'Sports',
    icon: 'jill111'
  }, {
    title: 'Movies',
    icon: 'jill111'
  }, {
    title: 'Science',
    icon: 'jill111'
  }, {
    title: 'Tech',
    icon: 'jill111'
  }, {
    title: 'Animals',
    icon: 'jill111'
  }, {
    title: 'Pop',
    icon: 'jill111'
  }
]

const categories = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          title: action.title,
          icon: action.icon
        }
      ]
    default:
      return state
  }
}

export default categories
