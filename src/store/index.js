import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import achievements from './reducers/achievements'
import categories from './reducers/categories'
import level from './reducers/level'
import notifications from './reducers/notifications'
import statistics from './reducers/statistics'
import user from './reducers/user'

const appReducers = combineReducers({
  achievements,
  categories,
  level,
  notifications,
  statistics,
  user
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(
  appReducers,
  /* preloadedState, */
  composeEnhancers(applyMiddleware())
)

export default store
