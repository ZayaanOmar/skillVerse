//import React, { useState } from 'react';
import "./FreelancerHome.css";

import { useNavigate } from "react-router-dom";

function FreelancerHome() {
  const navigate = useNavigate();

  return (
    <main className="freelancer-home">
      <header className="welcome">
        <h1 className="heading">SkillVerse</h1>
        <h2 className="welcome-freelancer">Welcome to your profile</h2>
      </header>

      <section>
        <button onClick={() => navigate("/freelancer/jobs")}>Find Jobs</button>
        <nav className="NavBar">
          <ul>
            <li>
              <a href="home"> Home</a>
            </li>
            <li>
              <a href="#explore"> Explore</a>
            </li>
            <li>
              <a href="client">Become a client</a>
            </li>
            <li>
              <a href="about">About </a>
            </li>
            <li>
              <a href="settings">Settings</a>
            </li>
          </ul>
        </nav>
      </section>
      <h1 className="how">How it works</h1>
      <ol className="worklist">
        <li>Create an assignment</li>
        <li>Deliver great work</li>
        <li>Get paid</li>
      </ol>
      <section className="offers">
        <h2>What SkillVerse offers you</h2>
        <p>
          One platform to find new clients, efficiently manage your projects,
          invoicing and payments{" "}
        </p>
      </section>

      <section className="services">
        <h2 className="servheading">Popular Services</h2>
        <ul>
          <li>Website development</li>
          <li>Digital marketing</li>
          <li>Software development</li>
          <li>Creating Logos</li>
          <li>Graphic Designer</li>
        </ul>
      </section>

      <button className="btn">Get started</button>

      <section className="questions">
        <h2 className="Qs">Q&A</h2>

        <button className="button1">What can I sell?</button>
        <button className="button2">How much money can I make?</button>
        <button className="button3">How do payments work?</button>
        <button className="button4">Can I set my own rates?</button>
      </section>

      <section className="profile">
        <h2> Projects </h2>
        <ul>
          <li>List of your projects </li>
        </ul>
      </section>

      <section className="guides">
        <h2>Guides to help you grow</h2>
        <button className="btn1">start a side business</button>
        <button className="btn2">create content</button>
      </section>

      <footer className="footer">
        <p>© 2025 SkillVerse. All rights reserved. </p>
      </footer>
    </main>
  );
}

export default FreelancerHome;
