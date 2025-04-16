import React from 'react';
import './AuthLogin.css';
import { useNavigate } from 'react-router-dom';
import loginImage from "./images/Login-image.png"; // Adjust the path as necessary

const AuthOptions = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    console.log("Logging in with Google...");
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <section className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center">
      <section className="row shadow rounded overflow-hidden" style={{ width: '80%', maxWidth: '1000px' }}>
        {/* Left section */}
        <section className="col-md-6 p-0 left-panel">
          <section className="left-panel-inner d-flex flex-column h-100 p-5 text-white">
            <h2 className="welcomeHeading" id="left-panel-heading">Welcome to SkillVerser <br/><br/></h2>
            <p className="welcomeText" id="left-panel-text">Sign in to manage your freelance work or hire top talent with ease.
              Stay connected, track progress, and grow your business or career.
              Let’s make great work happen—together!
            </p>
            <img
              src={loginImage}
              alt="Working Woman"
              className="img-fluid mt-4"
            />
          </section>
        </section>

        {/* Right section */}
        <section className="col-md-6 p-5" style={{ backgroundColor: '#AFEEEE' }}>
          <section className="right-panel-text">
            <h3 id="right-panel-heading">Continue with your account</h3>
          </section>

          <section className="d-grid gap-3 button-section">
            <button className="btn btn-outline-dark" id="google-btn" onClick={handleGoogleLogin}><i className="bi bi-google me-2"
            style={{ backgroundColor: 'white', color: 'red', borderColor: 'red' }}></i> Continue with Google</button>
            <button className="btn btn-outline-dark" id="twitter-btn"><i className="bi bi-twitter me-2" style={{ color: '#1DA1F2' }}></i> Continue with Twitter</button>
            <button className="btn btn-outline-dark" id="apple-btn"><i className="bi bi-apple me-2"></i> Continue with Apple</button>
            <button className="btn btn-outline-dark" id="fb-btn"><i className="bi bi-facebook me-2" style={{ color: 'blue' }}></i> Continue with Facebook</button>
          </section>
        </section>
      </section>
    </section>
  );

};

export default AuthOptions;