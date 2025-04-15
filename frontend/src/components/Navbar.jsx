
import React from 'react';
const Navbar = () => {
  return (
<nav className="bg-slate-800 text-white px-8 py-4 flex justify-end items-center">
  <ul className="flex gap-6 list-none m-0 p-0">
    <li><a href="#home" className="font-semibold hover:underline">Home</a></li>
    <li><a href="#features" className="font-semibold hover:underline">Features</a></li>
    <li><a href="#about" className="font-semibold hover:underline">About</a></li>
    <li><a href="#contact" className="font-semibold hover:underline">Contact</a></li>
    <li><a href="#settings" className="font-semibold hover:underline">Settings</a></li>
  </ul>
</nav>

  );
};

export default Navbar;
