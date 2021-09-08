import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './views/Layouts/ListLayout';
import Detail from './views/Pages/Detail';
import './assets/styles/styles.scss';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Layout} />
      <Route exact path="/detail/:imdbId" component={Detail} />
    </Switch>
  </Router>
);

export default App;
