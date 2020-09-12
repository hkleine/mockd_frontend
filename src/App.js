import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, Dashboard } from './views';
import PrivateRoute from  './components/private-route'
import history from "./utils/history";
import './App.css';

function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <PrivateRoute path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
