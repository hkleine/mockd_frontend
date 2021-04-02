import React from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { PrivateRoute } from './components';
import { AlertView, Dashboard, StatisticView, ProfileView, EditView, AddView } from './views';

import './App.css';
import { SocketProvider, UserProvider } from './context';

const App = () => {
  const { user } = useAuth0();

  return (
    <div id="app" className="d-flex flex-column h-100 h-screen bg-gray-200">
        <Switch>
          <UserProvider user={user}>
            <PrivateRoute path="/" exact component={Dashboard} />
            <PrivateRoute path="/add" exact component={AddView} />
            <PrivateRoute path="/alerts" exact component={AlertView} />
            <PrivateRoute path="/statistics" exact component={StatisticView} />
            <PrivateRoute path="/profile" exact component={ProfileView} />
            <SocketProvider><PrivateRoute path="/edit/:id" exact component={EditView} /></SocketProvider>
          </UserProvider>
        </Switch>
    </div>
  );
};

export default App;
