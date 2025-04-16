import React, { useEffect, useState } from "react";
import './ClientHome.css';
import Navbar from '../components/Navbar';
import axios from "axios";

const ClientHome = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {//this is used to retrieve the client details from local storage (from role selections)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleServiceSelection = async (category) => {
    if (!user || !user._id) {
      console.log("User is not defined or user ID is missing");
      return;
    }

    try {
      console.log("Sending request with:", {
        clientId: user._id,
        category,
        description: `Request for ${category}`,
      });

      const response = await axios.post(
        "http://localhost:5000/api/service-requests/create",
        {
          clientId: user._id,
          serviceType: category,
          description: `Request for ${category}`,
        },
        { withCredentials: true }
      );
      console.log("Service request response:", response.data);
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <main className="client-home">
      <Navbar />
      <section>
        {/* Welcome Banner */}
        <header className="welcome-banner">
          <h1 className="heading1">SKILLVERSE</h1>
        </header>

        {/* Choose service section */}
        <section className='chooseDesc'>
          <p className="description">CHOOSE A SERVICE</p>
        </section>
    
        {/* Service buttons*/}
        <section className="section1">
          <button className="buttonSD" onClick={() => handleServiceSelection("Software Development")}>Software Development</button>
          <button className="buttonML" onClick={() => handleServiceSelection("Data Science - Machine Learning")}>Data Science</button>
          <button className="buttonCL" onClick={() => handleServiceSelection("Creating Logos")}>Creating Logos</button>
          <button className="buttonGD" onClick={() => handleServiceSelection("Graphic Designer")}>Graphic Designer</button>
          <button className="buttonDM" onClick={() => handleServiceSelection("Digital Marketing")}>Digital Marketing</button>
          {message && <p>{message}</p>}
        </section>

        {/* What SkillVerse offers */}
        <article>
          <h2>What SkillVerse Offers You</h2>
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

        {/* Footer */}
        <footer className='Ebrahimfooter'>
          <section>
            <p>&copy; 2025 SkillVerse. All rights reserved.</p>
          </section>
        </footer>
      </section>
    </main>
  );
};

export default ClientHome;
