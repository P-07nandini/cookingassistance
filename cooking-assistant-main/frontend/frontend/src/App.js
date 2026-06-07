import { BrowserRouter, Routes, Route } from "react-router-dom";
import IngredientsPage from "./components/IngredientsPage";
import RecipesPage from "./components/RecipesPage";
import Home from "./components/Home";  // Login page
import RecipeDetailsPage from "./components/RecipeDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipe-details" element={<RecipeDetailsPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
