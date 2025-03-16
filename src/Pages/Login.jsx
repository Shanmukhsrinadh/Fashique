import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import "../Pages/Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate username length
    if (username.length < 5) {
      setError("Username must be at least 5 characters long");
      return;
    }

    // Clear any previous errors
    setError("");

    // Store the username in localStorage
    localStorage.setItem("username", username);

    // Navigate programmatically to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="animation-area">
<div className="cards-downward">
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2019/10/22/13/43/man-4568761_1280.jpg" alt="Card 1" />
  </div>
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2020/05/03/19/09/nike-5126389_1280.jpg" alt="Card 2" />
  </div>
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2020/05/18/09/56/shoes-5185488_1280.jpg" alt="Card 3" />
  </div>
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2018/01/18/19/06/time-3091031_1280.jpg" alt="Card 4" />
  </div>
  <div className="card opposite">
    <img src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card 5" />
  </div>
</div>

<div className="cards-upward">
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2016/11/29/07/34/beach-1868130_1280.jpg" alt="Card 1" />
  </div>
  <div className="card opposite">
    <img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card 2" />
  </div>
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2016/11/23/14/43/fashion-1853294_1280.jpg" alt="Card 3" />
  </div>
  <div className="card opposite">
    <img src="https://images.unsplash.com/photo-1668749094956-99a1961d6aee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card 4" />
  </div>
  <div className="card opposite">
    <img src="https://cdn.pixabay.com/photo/2015/05/07/13/43/watch-756487_1280.jpg" alt="Card 5" />
  </div>
</div>

      {/* Login Form Section */}
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="username">User name</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="remember-me">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Using both Link and onClick event for GitHub Pages */}
          <Link
            to="/dashboard"
            onClick={(e) => {
              if (username.length < 5) {
                e.preventDefault(); // Prevent navigation if validation fails
                setError("Username must be at least 5 characters long");
              } else {
                setError("");
                localStorage.setItem("username", username);
                navigate("/dashboard");
              }
            }}
          >
            <button type="submit">Login</button>
          </Link>

          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              <FaGoogle />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
          </div>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;