import { combineReducers, createStore } from 'redux'

import categories from './reducers/categories'
import level from './reducers/level'
import notifications from './reducers/notifications'
import user from './reducers/user'

const appReducers = combineReducers({
  categories,
  level,
  notifications,
  user
})

let store = createStore(
  appReducers,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
