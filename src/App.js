import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from './components';
import { AlertView, Dashboard, StatisticView, ProfileView, EditView, AddView } from './views';

import './App.css';

const App = () => {
  return (
    <div id="app" className="d-flex flex-column h-100">
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute path="/alerts" exact component={AlertView} />
        <PrivateRoute path="/statistics" exact component={StatisticView} />
        <PrivateRoute path="/edit/:id" exact component={EditView} />
        <PrivateRoute path="/add" exact component={AddView} />
      </Switch>
    </div>
  );
};

export default App;
