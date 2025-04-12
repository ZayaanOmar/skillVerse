// src/components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
     
      <ul className="flex space-x-6 text-gray-700">
        <li><a href="#home" className="homeNav">Home</a></li>
        <li><a href="#features" className="featuresNav">Features</a></li>
        <li><a href="#about" className="aboutNav">About</a></li>
        <li><a href="#contact" className="contactNav">Contact</a></li>
        <li><a href="#settings" className="settingsNav">Settings</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
