import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RecipesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = location.state?.ingredients || [];

  const [recipes, setRecipes] = useState([]);
  const [exactRecipes, setExactRecipes] = useState([]);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ✅ GET USER NAME */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/");
    } else {
      setUserName(user.fullName || user.name || "User");
    }
  }, [navigate]);

  useEffect(() => {
    if (ingredients.length > 0) {
      fetchRecipes();
    }
  }, [ingredients]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      const ingredientsStr = ingredients.join(",");
      const apiKey = "f948da65a7974629a04dc0cbecb773bf";
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsStr}&number=12&ranking=2&apiKey=${apiKey}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch recipes");

      const data = await response.json();
      setRecipes(data);

      setExactRecipes(data.filter(r => r.missedIngredientCount === 0));
      setRelatedRecipes(data.filter(r => r.missedIngredientCount > 0));
    } catch (err) {
      setError("No recipes found. Try different ingredients.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = async (recipeId) => {
    try {
      const apiKey = "f948da65a7974629a04dc0cbecb773bf";
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error();

      const recipeDetails = await response.json();
      navigate("/recipe-details", {
        state: { recipe: recipeDetails, ingredients, fromSearch: true }
      });
    } catch {
      alert("Failed to load recipe details");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", margin: "50px" }}>🔍 Searching recipes...</h2>;
  }

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

      {/* ✅ NAVBAR (ADDED ONLY) */}
      <div style={{
        background: "#3f3f3f",
        color: "white",
        padding: "14px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="logo"
            width="36"
          />
          <strong>Cooking Assistant</strong>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>Hello, {userName}</span>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/ingredients")}>Add Ingredients</span>
          <span style={{ color: "#ff9800", fontWeight: "600" }}>Recipes</span>
          <span style={{ cursor: "pointer" }} onClick={logout}>Logout</span>
        </div>
      </div>

      {/* ✅ CONTENT */}
      <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#ff4e08" }}>
          Recipes Based on Ingredients
        </h1>

        {/* INGREDIENTS */}
        <div style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "30px"
        }}>
          <h3>Your Ingredients:</h3>
          <ul style={{ display: "flex", gap: "10px", listStyle: "none", padding: 0, flexWrap: "wrap" }}>
            {ingredients.map((i, idx) => (
              <li key={idx} style={{
                background: "#fc640c",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px"
              }}>
                {i}
              </li>
            ))}
          </ul>
        </div>

        {/* EXACT MATCH */}
        <h2 style={{ color: "#ff4e08" }}>Exact Match Recipes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "25px" }}>
          {exactRecipes.map(r => (
            <RecipeCard key={r.id} recipe={r} view={handleViewRecipe} />
          ))}
        </div>

        {/* RELATED */}
        {relatedRecipes.length > 0 && (
          <>
            <h2 style={{ marginTop: "50px", color: "#777" }}>Related Recipes</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "25px" }}>
              {relatedRecipes.map(r => (
                <RecipeCard key={r.id} recipe={r} view={handleViewRecipe} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* FOOTER (UNCHANGED) */}
      <footer className="footer">
        <h3>Cooking Assistant 🍳</h3>
        <p>Your smart kitchen companion</p>
        <p className="copyright">
          © 2025 Cooking Assistant | Made with ❤️ by Swarna
        </p>
      </footer>
    </div>
  );
}

/* ✅ SINGLE CARD PER RECIPE */
function RecipeCard({ recipe, view }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      overflow: "hidden"
    }}>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "20px" }}>
        <h3 style={{
          background: "#fff0e6",
          padding: "10px",
          borderRadius: "8px",
          color: "#ff4e08"
        }}>
          {recipe.title}
        </h3>
        <button
          onClick={() => view(recipe.id)}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg,#f1600c,#a0a24b)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          👁️ View Full Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipesPage;
