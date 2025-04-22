import React, { useEffect, useState } from "react";
import "./ClientHome.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const ClientHome = () => {
  const [user, setUser] = useState(null);
  const [message /*setMessage*/] = useState("");

  useEffect(() => {
    //this is used to retrieve the client details from local storage (from role selections)
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

  //Handling role change request by a user

  /* const [requestedRole, setRequestedRole] = useState("");
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
  }; */

  return (
    <main className="client-home">
      <Navbar />
      <section>
        {/* Welcome Banner */}
        <header className="welcome-banner">
          <h1 className="heading1">SkillVerse</h1>
        </header>

        {/* Service buttons*/}
        {/* the choose service blue section */}
        <section className="chooseDesc">
          <p className="description">CHOOSE A SERVICE</p>
        </section>

        {/* each button */}
        <section className="section1">
          <button
            className="buttonSD"
            onClick={() => handleServiceSelection("Software Development")}
          >
            Software Development
          </button>
          <button
            className="buttonML"
            onClick={() =>
              handleServiceSelection("Data Science - Machine Learning")
            }
          >
            Data Science
          </button>
          <button
            className="buttonCL"
            onClick={() => handleServiceSelection("Creating Logos")}
          >
            Creating Logos
          </button>
          <button
            className="buttonGD"
            onClick={() => handleServiceSelection("Graphic Designer")}
          >
            Graphic Designer
          </button>
          <button
            className="buttonDM"
            onClick={() => handleServiceSelection("Digital Marketing")}
          >
            Digital Marketing
          </button>
          {message && <p>{message}</p>}
        </section>

        {/* section grid on what skillverse offers */}
        <article>
          <h2>What Skill Verse Offers You</h2>
          <section className="offer-grid">
            <section className="offer-item">
              <h3>Dedicated hiring experts</h3>
              <p>
                Count on an account manager to find you the right talent and see
                to your project’s every need.
              </p>
            </section>
            <section className="offer-item">
              <h3>Satisfaction guarantee</h3>
              <p>
                We guarantee satisfaction with every project, ensuring you're
                happy with the results.
              </p>
            </section>
            <section className="offer-item">
              <h3>Flexible payment models</h3>
              <p>
                Choose from a variety of flexible payment models to fit your
                needs and budget.
              </p>
            </section>
            <section className="offer-item">
              <h3>Advanced management tools</h3>
              <p>
                Access powerful tools to manage your projects and teams with
                ease.
              </p>
            </section>
          </section>
        </article>
        {/* Footer */}
        <footer className="Ebrahimfooter">
          <footer className="footer">
            <section>
              <p>&copy; 2025 SkillVerse. All rights reserved.</p>
            </section>
          </footer>
        </footer>
      </section>
    </main>
  );
};

export default ClientHome;
