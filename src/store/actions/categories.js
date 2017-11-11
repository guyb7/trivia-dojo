export default {
  loadCategories() {
    return {
      type: 'SET_CATEGORIES',
      categories: [
        {
          id: 'music',
          title: 'Music',
          icon: 'MusicNote'
        }, {
          id: 'geography',
          title: 'Geography',
          icon: 'Globe'
        }, {
          id: 'history',
          title: 'History',
          icon: 'Bank'
        }, {
          id: 'sports',
          title: 'Sports',
          icon: 'Sport'
        }, {
          id: 'movies',
          title: 'Movies',
          icon: 'Movie'
        }, {
          id: 'art',
          title: 'Art',
          icon: 'Palette'
        }, {
          id: 'tech',
          title: 'Tech',
          icon: 'Technology'
        }, {
          id: 'science',
          title: 'Science',
          icon: 'Science'
        }, {
          id: 'pop',
          title: 'Pop',
          icon: 'Star'
        }
      ]
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
