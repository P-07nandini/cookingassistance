import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RecipeDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe, ingredients, fromSearch } = location.state || {};

  if (!recipe) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#7f8c8d" }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate(-1)} style={{
          background: "#3498db", color: "white", padding: "12px 24px",
          border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", marginTop: "20px"
        }}>
          ← Go Back
        </button>
      </div>
    );
  }

  // Extract nutrition from summary or calculate from ingredients
  const extractNutritionFromSummary = (summary) => {
    const nutrition = {};
    const regex = /(\d+(?:\.\d+)?)\s*(g|calories|min)/gi;
    let match;
    while ((match = regex.exec(summary)) !== null) {
      nutrition[match[2]] = parseFloat(match[1]);
    }
    return nutrition;
  };

  const nutrition = extractNutritionFromSummary(recipe.summary || "");

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", lineHeight: "1.6" }}>
      {/* Back Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
        <button onClick={() => navigate(-1)} style={{
          background: "#f57b08ff", color: "white", padding: "12px 20px", border: "none",
          borderRadius: "50px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px"
        }}>
          ← Back to Recipes
        </button>
        {fromSearch && (
          <div style={{ fontSize: "14px", color: "#7f8c8d", background: "#f8f9fa", padding: "8px 12px", borderRadius: "20px" }}>
            Made with: {ingredients.slice(0, 4).join(", ")}{ingredients.length > 4 && "..."}
          </div>
        )}
      </div>

      {/* Recipe Hero */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "20px", color: "#f57b08ff", background: "#fff0e6", display: "inline-block", padding: "10px 16px", borderRadius: "12px", hover: "transform: scale(1.02);" }}>
          {recipe.title}
        </h1>
        <img 
          src={recipe.image || "https://via.placeholder.com/600x400?text=No+Image"}
          alt={recipe.title}
          style={{ 
            width: "100%", maxWidth: "600px", height: "400px", objectFit: "cover",
            borderRadius: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", marginBottom: "24px"
          }}
        />
        
        {/* Enhanced Metadata */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <div style={{ background: "#e8f5e8", padding: "10px 16px", borderRadius: "25px", fontSize: "14px" }}>
            ⏱️ {recipe.readyInMinutes || "30"} min
          </div>
          <div style={{ background: "#fff3cd", padding: "10px 16px", borderRadius: "25px", fontSize: "14px" }}>
            👥 {recipe.servings || 4} servings
          </div>
          {recipe.pricePerServing && (
            <div style={{ background: "#d1ecf1", padding: "10px 16px", borderRadius: "25px", fontSize: "14px" }}>
              💰 ${(recipe.pricePerServing / 100).toFixed(2)}/serving
            </div>
          )}
          {recipe.spoonacularScore && (
            <div style={{ background: "#f8f9fa", padding: "10px 16px", borderRadius: "25px", fontSize: "14px" }}>
              ⭐ {recipe.spoonacularScore.toFixed(0)}/100
            </div>
          )}
        </div>

        {/* Diet & Health Badges */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          {recipe.vegetarian && <span style={{ background: "#d4edda", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#155724" }}>🌱 Vegetarian</span>}
          {recipe.vegan && <span style={{ background: "#d4edda", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#155724" }}>🌿 Vegan</span>}
          {recipe.glutenFree && <span style={{ background: "#d1ecf1", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#0c5460" }}>🌾 Gluten Free</span>}
          {recipe.dairyFree && <span style={{ background: "#f8d7da", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#721c24" }}>🧀 Dairy Free</span>}
          {recipe.veryHealthy && <span style={{ background: "#d4edda", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#155724" }}>🥗 Very Healthy</span>}
          {recipe.cheap && <span style={{ background: "#d4edda", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#155724" }}>💰 Budget Friendly</span>}
          {recipe.dishTypes?.map(type => (
            <span key={type} style={{ background: "#e8f5e8", padding: "6px 12px", borderRadius: "20px", fontSize: "12px" }}>
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Nutrition Summary */}
      {nutrition.g || nutrition.calories && (
        <div style={{ background: "#e3f2fd", padding: "24px", borderRadius: "16px", marginBottom: "40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#1976d2" }}>🥗 Nutrition (per serving)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", maxWidth: "600px", margin: "0 auto" }}>
            {nutrition.calories && (
              <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1976d2" }}>{nutrition.calories}</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Calories</div>
              </div>
            )}
            {nutrition.g && (
              <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#388e3c" }}>{nutrition.g}g</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Protein/Carbs</div>
              </div>
            )}
            {recipe.healthScore && (
              <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f57c00" }}>{recipe.healthScore}/100</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Health Score</div>
              </div>
            )}
            {recipe.weightWatcherSmartPoints && (
              <div style={{ background: "white", padding: "16px", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#d81b60" }}>{recipe.weightWatcherSmartPoints}</div>
                <div style={{ fontSize: "14px", color: "#666" }}>WW Points</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "40px" }}>
        {/* Ingredients */}
        <div>
          <h2 style={{ fontSize: "28px", marginBottom: "24px", color: "#f57b08ff",background: "#fff0e6", borderRadius: "12px", padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
            🥘 Ingredients ({recipe.extendedIngredients?.length || 0})
          </h2>
          <div style={{ background: "#f8f9fa", padding: "24px", borderRadius: "16px", border: "1px solid #e9ecef" }}>
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <div key={index} style={{
                display: "flex", gap: "12px", alignItems: "center", padding: "12px", 
                marginBottom: "12px", background: "white", borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}>
                {ingredient.image && (
                  <img 
                    src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                    style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", color: "#2c3e50", marginBottom: "4px" }}>
                    {ingredient.amount?.toFixed(1)} {ingredient.unit} {ingredient.name}
                  </div>
                  <div style={{ fontSize: "14px", color: "#6c757d" }}>{ingredient.original}</div>
                </div>
                <div style={{ fontSize: "12px", color: "#f57b08ff", fontWeight: "500" }}>
                  {ingredient.measures?.us?.unitShort || ingredient.unit}
                </div>
              </div>
            )) || <p>No ingredients available</p>}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 style={{ fontSize: "28px", marginBottom: "24px", color: "#f57b08ff", background: "#fff0e6", borderRadius: "12px", padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
            📋 Instructions ({recipe.analyzedInstructions?.[0]?.steps?.length || 0} steps)
          </h2>
          <div style={{ background: "#f8f9fa", padding: "24px", borderRadius: "16px", border: "1px solid #e9ecef", maxHeight: "600px", overflowY: "auto" }}>
            {recipe.analyzedInstructions?.[0]?.steps?.map((step, index) => (
              <div key={index} style={{ marginBottom: "16px", padding: "16px", background: "white", borderRadius: "12px", borderLeft: "4px solid #3498db" }}>
                <div style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "8px" }}>Step {step.number || index + 1}</div>
                <p>{step.step}</p>
              </div>
            )) || (
              recipe.instructions ? (
                <div style={{ lineHeight: "1.7", color: "#495057" }}>
                  {recipe.instructions.split('. ').map((sentence, index) => (
                    sentence && <p key={index} style={{ marginBottom: "12px" }}>{sentence}.</p>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#6c757d", textAlign: "center" }}>Instructions not available</p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Additional Info Footer */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "40px" }}>
        {recipe.winePairing?.pairedWines?.length > 0 && (
          <div style={{ background: "#fdf2e9", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ marginTop: 0, color: "#e67717" }}>🍷 Wine Pairing</h3>
            <div>{recipe.winePairing.pairedWines.join(", ")}</div>
          </div>
        )}
        {recipe.dishTypes?.length > 0 && (
          <div style={{ background: "#f0f8f0", padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ marginTop: 0, color: "#2e7d32" }}>🍽️ Dish Types</h3>
            <div>{recipe.dishTypes.join(", ")}</div>
          </div>
        )}
      </div>

      {/* Source Links */}
      {/* ✅ FOOTER (SAME AS RECIPESPAGE) */}
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

export default RecipeDetailsPage;
