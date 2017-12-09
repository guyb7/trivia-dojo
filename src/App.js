import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Provider } from 'react-redux'

import store from './store'
import TopBar from './components/TopBar'
import Notifications from './components/Notifications'
import Home from './pages/Home'
import Profile from './pages/Profile'
import QuizCasual from './pages/QuizCasual'
import AdminHome from './pages/Admin'
import './App.css'

const style = {
  container: {
    height: '100%'
  }
}

const App = () => (
  <Provider store={store}>
    <div style={style.container}>
      <TopBar />
      <Profile />
      <Notifications />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/casual/:category" component={QuizCasual} />
        <Route exact path="/admin" component={AdminHome} />
      </Switch>
    </div>
  </Provider>
)

export default App
