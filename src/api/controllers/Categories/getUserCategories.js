import { query } from '../../Server/DB'

const defaultCategories = [
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

export default async userId => {
  const res = await query('SELECT * FROM categories', [])
  return res.rows
}
