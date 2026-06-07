import React, { useState, useEffect } from "react";
import "./IngredientsPage.css";
import { useNavigate } from "react-router-dom";

function IngredientsPage() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/");
    } else {
      setUserName(user.fullName || user.name || "User");
    }
  }, [navigate]);

  const suggestedIngredients = [
    "chicken breast",
    "tomatoes",
    "onions",
    "garlic",
    "rice",
    "potatoes",
    "carrots",
    "bell peppers",
    "cheese",
    "eggs",
  ];

  const addIngredient = (item) => {
    if (!item.trim() || ingredients.includes(item)) return;
    setIngredients([...ingredients, item]);
    setIngredient("");
  };

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const findRecipes = () => {
    if (ingredients.length === 0) return;
    navigate("/recipes", { state: { ingredients } });
  };

  return (
    <div className="ingredients-page">
      {/* NAVBAR */}
      <div className="ingredients-navbar">
        <div className="nav-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="logo"
          />
          <span className="nav-title">Cooking Assistant</span>
        </div>

        <div className="nav-right">
          <span className="nav-item">Hello, {userName}</span>
          <span className="nav-item" onClick={() => navigate("/")}>Home</span>
          <span className="nav-item active">Ingredients</span>
          <span className="nav-item" onClick={logout}>Logout</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="page-wrapper">
        <div className="glass-card">
          <h2 className="title">What's in your fridge?</h2>

          <div className="input-box">
            <input
              placeholder="e.g., chicken breast, tomatoes"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <span className="search-btn" onClick={() => addIngredient(ingredient)}>
              🔍
            </span>
          </div>

          <h3 className="sub-title">Suggested Ingredients</h3>
          <div className="chips-container">
            {suggestedIngredients.map((item, i) => (
              <div
                key={i}
                className="chip suggested"
                onClick={() => addIngredient(item)}
              >
                {item}
              </div>
            ))}
          </div>

          <h3 className="sub-title">Added Ingredients</h3>
          <div className="chips-container">
            {ingredients.map((item, i) => (
              <div key={i} className="chip">
                {item}
                <span className="remove" onClick={() => removeIngredient(item)}>
                  ✖
                </span>
              </div>
            ))}
          </div>

          <button className="find-btn" onClick={findRecipes}>
            Find Recipes ({ingredients.length})
          </button>
        </div>
      </div>

      {/* FOOTER (SAME AS HOME) */}
      <footer className="footer">
        <h3>Cooking Assistant 🍳</h3>
        <p>Your smart kitchen companion</p>

        <div className="footer-social">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
          </a>

          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
          </a>
        </div>

        <p className="copyright">
          © 2025 Cooking Assistant | Made with ❤️ by Swarna
        </p>
      </footer>
    </div>
  );
}

export default IngredientsPage;
