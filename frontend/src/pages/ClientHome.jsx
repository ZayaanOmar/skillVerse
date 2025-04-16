import React, { useState } from 'react';
import './ClientHome.css';

const ClientHome = () => {
  const [requestedRole, setRequestedRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      requestedRole,
      message,
    };

    try {
      const response = await fetch("/users/request-role-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setStatus("success");
        setRequestedRole("");
        setMessage("");
        console.log("response is ok here") //debugging
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <main className="client-home">
      <section>
        {/* Welcome Banner */}
        <header className="welcome-banner">
          <h1 className="heading1">SKILLVERSE</h1>
        </header>

        {/* the choose service blue section */}
        <section className='chooseDesc'>
          <p className="description">CHOOSE A SERVICE</p>
        </section>

        {/* each button */}
        <section className="section1">
          <button className="button1">Software Development</button>
          <button className="button2">Data Science - Machine Learning</button>
          <button className="button3">Creating Logos</button>
          <button className="button4">Graphic Designer</button>
          <button className="button5">Digital Marketing</button>
        </section>

        {/* section grid on what skillverse offers */}
        <article>
          <h2>What Skill Verse Offers You</h2>
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

        {/* Role Change Form */}
        <form className="RoleForm" onSubmit={handleSubmit}>
          <h2>Request Role Change</h2>

          <label>
            Desired Role:
            <select
              value={requestedRole}
              onChange={(e) => setRequestedRole(e.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>
          </label>

          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Leave a message for the admin..."
            />
          </label>

          <button type="submit">Submit Request</button>
          {status === "success" && <p style={{ color: "green" }}>Request submitted!</p>}
          {status === "error" && <p style={{ color: "red" }}>Something went wrong.</p>}
        </form>

        {/* Footer */}
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
