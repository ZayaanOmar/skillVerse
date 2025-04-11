import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientHome from './pages/ClientHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello from Landing Page</h1>} />
        <Route path="/client/home" element={<ClientHome />} />
      </Routes>
    </Router>
  );
}

export default App;
