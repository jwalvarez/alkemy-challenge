import React, { useState } from "react";
import axios from "axios";
import NoRecipes from "./components/NoRecipes";

const App = () => {
  const getRequest = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const recipe = res.data["recipes"][0];
        setRecipes([
          ...recipes,
          {
            id: recipe.id,
            img: recipe.image,
            props: recipe.diets,
            title: recipe.title,
            vegan: recipe.vegan,
            price: recipe.pricePerServing,
            time: recipe.readyInMinutes,
            healthScore: recipe.healthScore,
          },
        ]);
      });
  };

  const [recipes, setRecipes] = useState([]);

  return (
    <>
      <button onClick={getRequest}> Call function </button>
      {recipes.length == 0 ? <NoRecipes /> : <></>}

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
