import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from './components';
import { AlertView, Dashboard, StatisticView, ProfileView, EditView, AddView } from './views';

import './App.css';
import { SocketProvider } from './context/SocketContext';

const App = () => {
  return (
    <div id="app" className="d-flex flex-column h-100 h-screen bg-gray-200">
        <Switch>
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/alerts" exact component={AlertView} />
          <PrivateRoute path="/statistics" exact component={StatisticView} />
          <SocketProvider><PrivateRoute path="/edit/:id" exact component={EditView} /></SocketProvider>
          <PrivateRoute path="/add" exact component={AddView} />
          <PrivateRoute path="/profile" exact component={ProfileView} />
        </Switch>
    </div>
  );
};

export default App;
