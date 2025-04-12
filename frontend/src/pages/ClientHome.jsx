import React from 'react';
import './ClientHome.css';

const ClientHome = () => {
  return (
    <main className="client-home">
      <section>
        {/* Welcome Banner */}
        <header className="welcome-banner">
          <h1 className="heading1">SKILLVERSE</h1>
        </header>

        {/*the choose service blue section */}
        <section className='chooseDesc'>
          <p className="description">CHOOSE A SERVICE</p>
        </section>

        {/*each button */}
        <section className="section1">
          <button className="button1">Software Development</button>
          <button className="button2">Data Science - Machine Learning</button>
          <button className="button3">Creating Logos</button>
          <button className="button4">Graphic Designer</button>
          <button className="button5">Digital Marketing</button>
        </section>

        {/*the section grid onn whar skillverse offers */}
        <article>
          <h2>
            What Skill Verse Offers You
          </h2>

          <section className="offer-grid">
            <section className="offer-item">
              <h3>Dedicated hiring experts</h3>
              <p>Count on an account manager to find you the right talent and see to your project’s every need.</p>
            </section>

            <section className="offer-item">
              <h3>Satisfaction guarantee</h3>
              <p>We guarantee satisfaction with every project, ensuring you're happy with the results.</p>
            </section>

            <section className="offer-item">
              <h3>Flexible payment models</h3>
              <p>Choose from a variety of flexible payment models to fit your needs and budget.</p>
            </section>

            <section className="offer-item">
              <h3>Advanced management tools</h3>
              <p>Access powerful tools to manage your projects and teams with ease.</p>
            </section>
          </section>
        </article>

        {/*this is for the footer */}
        <footer className='footer'>
          
          <section>
          <p>&copy; 2025 SkillVerse. All rights reserved.</p>
          </section>
        </footer>
      </section>
    </main>
  );
};

export default ClientHome;
