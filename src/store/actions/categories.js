export default {
  setCategories(categories) {
    return {
      type: 'SET_CATEGORIES',
      categories: categories
    }
  },

  addCategories(categories) {
    return {
      type: 'ADD_CATEGORIES',
      categories
    }
  },

  markCategoriesAsNotNew() {
    return {
      type: 'MARK_CATEGORIES_AS_NOT_NEW'
    }
  }
}
