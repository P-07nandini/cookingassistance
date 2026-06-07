import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Contact form
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cMessage, setCMessage] = useState("");

  const navigate = useNavigate();
  const backendURL = "http://localhost:5000";

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/signup`, {
        fullName,
        email,
        password,
      });
      setMessage(res.data.message);
      if (res.data.success) {
        setIsLogin(true);
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setMessage("Server error");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendURL}/login`, { email, password });
      setMessage(res.data.message);
      if (res.data.success) {
        navigate("/ingredients");
      }
    } catch {
      setMessage("Server error");
    }
  };

  // CONTACT
  const handleContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/contact`, {
        name: cName,
        email: cEmail,
        message: cMessage,
      });
      alert("Message sent successfully");
      setCName("");
      setCEmail("");
      setCMessage("");
    } catch {
      alert("Error sending message");
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="logo"
          />
          <h3>Cooking Assistant</h3>
        </div>

        <div className="nav-links">
          <span onClick={() => setActiveSection("home")}>Home</span>
          <span onClick={() => setActiveSection("login")}>Login</span>
          <span onClick={() => setActiveSection("about")}>About</span>
          <span onClick={() => setActiveSection("contact")}>Contact</span>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="content">
        {activeSection === "home" && (
          <div className="welcome-box">
            <h1>Welcome to Cooking Assistant 🍳</h1>
            <p>
              Discover recipes using ingredients you already have and cook
              smarter every day.
            </p>
          </div>
        )}

        {activeSection === "login" && (
          <div className="form-box">
            <h2>{isLogin ? "Login" : "Signup"}</h2>
            {message && <p className="message">{message}</p>}

            {isLogin ? (
              <form onSubmit={handleLogin} className="form">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn">Login</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="form">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn">Signup</button>
              </form>
            )}

            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="toggle-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? " Signup" : " Login"}
              </span>
            </p>
          </div>
        )}

        {activeSection === "about" && (
          <div className="info-box">
            <h2>About Us</h2>
            <p>🍽 Smart ingredient-based recipe finder</p>
            <p>⏱ Saves time & effort</p>
            <p>♻ Reduces food waste</p>
            <p>👩‍🍳 Easy for beginners</p>
          </div>
        )}

        {activeSection === "contact" && (
          <div className="form-box">
            <h2>Contact Us</h2>
            <form onSubmit={handleContact} className="form">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={cName}
                onChange={(e) => setCName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={cEmail}
                onChange={(e) => setCEmail(e.target.value)}
              />
              <textarea
                placeholder="Your Message"
                required
                value={cMessage}
                onChange={(e) => setCMessage(e.target.value)}
              />
              <button className="btn">Send Message</button>
            </form>
          </div>
        )}
      </div>

   {/* FOOTER */}
<footer className="footer">
  <h3>Cooking Assistant 🍳</h3>
  <p>Your smart kitchen companion</p>

  <div className="footer-social">
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
        alt="Instagram"
      />
    </a>

    <a
      href="https://wa.me/919014955289"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="WhatsApp"
      />
    </a>
  </div>

  <div className="footer-links">
    <span onClick={() => setActiveSection("home")}>Home</span>
    <span onClick={() => setActiveSection("about")}>About</span>
    <span onClick={() => setActiveSection("contact")}>Contact</span>
  </div>

  <p className="copyright">
    © 2025 Cooking Assistant | Made with ❤️ by Swarna
  </p>
</footer>

    </>
  );
}

export default Home;
