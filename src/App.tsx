import { Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AlertView, Dashboard, StatisticView, ProfileView, EditView, AddView } from './views';
import './App.css';
import { UserProvider, SnackbarProvider } from './context';
import { PrivateRoute } from './components';

const App = () => {
  const { user } = useAuth0();
  const queryClient = new QueryClient();
  
  return (
    <div id="app" className="d-flex flex-column h-100 h-screen bg-gray-200">
        <Switch>
            <UserProvider user={user}>
              <SnackbarProvider>
                <QueryClientProvider client={queryClient}>
                  <PrivateRoute path="/" exact component={Dashboard} />
                  <PrivateRoute path="/add" exact component={AddView} />
                  <PrivateRoute path="/alerts" exact component={AlertView} />
                  <PrivateRoute path="/statistics" exact component={StatisticView} />
                  <PrivateRoute path="/profile" exact component={ProfileView} />
                  <PrivateRoute path="/edit/:id" exact component={EditView} />
                </QueryClientProvider>
              </SnackbarProvider>
            </UserProvider>
          </Switch> 
    </div>
  );
};

export default App;
