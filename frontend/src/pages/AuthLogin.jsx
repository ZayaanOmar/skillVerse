import React from "react";
import "./AuthLogin.css";

const AuthOptions = () => {
  const apiUrl =
    process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000";

  const handleGoogleLogin = () => {
    console.log("Logging in with Google...");

    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleFacebookLogin = () => {
    // Placeholder for actual Facebook login logic
    console.log("Logging in with Facebook...");
  };

  return (
    <div className="auth-options-container d-flex flex-column justify-content-center align-items-center">
      <div className="auth-box shadow p-4 rounded text-center">
        <h2 className="mb-4">Welcome to SkillVerse</h2>
        <p className="mb-4">Login or Sign Up using your preferred provider:</p>

        <button
          className="btn btn-outline-danger w-100 mb-3"
          onClick={handleGoogleLogin}
        >
          <i className="bi bi-google me-2"></i> Continue with Google
        </button>

        <button
          className="btn btn-outline-primary w-100"
          onClick={handleFacebookLogin}
        >
          <i className="bi bi-facebook me-2"></i> Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
