import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import MenuPage from './components/Menus/MenuPage';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          loggedIn ? <Navigate to="/menu" /> : <Login onLogin={() => setLoggedIn(true)}/>
        } />
        <Route path="/menu" element={
          loggedIn ? <MenuPage /> : <Navigate to="/" />
        } />
        <Route path="/dashboard" element={
          loggedIn ? <Dashboard /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
    
  );
}

export default App;
