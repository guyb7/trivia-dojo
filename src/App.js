import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Provider } from 'react-redux'

import store from './store'
import TopBar from './components/TopBar';
import Home from './pages/Home';
import './App.css';

const App = () => (
  <Provider store={store}>
    <div>
      <TopBar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </Provider>
);

export default App;
