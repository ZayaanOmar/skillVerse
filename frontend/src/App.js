import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientHome from './pages/ClientHome';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 className="p-4 text-xl">Hello from Landing Page</h1>} />
        <Route path="/client/home" element={<ClientHome />} />
      </Routes>
    </Router>
  );
}

export default App;
