import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TextList from './components/Editor/TextList';
import TextEditor from './components/Editor/TextEditor';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    localStorage.setItem('token', 'some_token');
    setIsAuthenticated(true);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsAuthenticated(false);
  // };

  return (
    <Router>
      <div style={{ backgroundColor: '#f0f4f8', height: '100vh', overflow: 'auto' }}>
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/editor" element={<PrivateRoute isAuthenticated={isAuthenticated}><TextList /></PrivateRoute>} />
          <Route path="/editor/:filename" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<TextEditor />} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;