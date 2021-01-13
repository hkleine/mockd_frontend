import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0ProviderWithHistory } from './components';
import './index.css';
import './tailwind.output.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme'

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
    <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
);
