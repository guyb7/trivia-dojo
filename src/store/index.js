import { combineReducers, createStore } from 'redux'

import categories from './reducers/categories'
import level from './reducers/level'
import user from './reducers/user'

const appReducers = combineReducers({
  categories,
  level,
  user
})

let store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
