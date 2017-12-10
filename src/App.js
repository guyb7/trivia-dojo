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
import AdminCategories from './pages/AdminCategories'
import AdminQuestions from './pages/AdminQuestions'
import AdminUsers from './pages/AdminUsers'
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
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route exact path="/admin/questions" component={AdminQuestions} />
        <Route exact path="/admin/users" component={AdminUsers} />
      </Switch>
    </div>
  </Provider>
)

export default App
