import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import TopBar from './components/TopBar';
import Home from './Home';
import './App.css';

const App = () => (
  <div>
    <TopBar />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </div>
);

export default App;
