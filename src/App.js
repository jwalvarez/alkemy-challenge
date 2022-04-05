import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import NoRecipes from "./components/NoRecipes";
import Recipe from "./components/Recipe";

const App = () => {
  const [recipes, setRecipes] = useState([]);

  // Add recipe to the state
  const getRequest = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const recipe = res.data["recipes"][0];
        setRecipes([
          {
            id: recipe.id,
            props: recipe.diets,
            vegan: recipe.vegan,
            summary: recipe.summary,
            img: recipe.image,
            title: recipe.title,
            price: recipe.pricePerServing,
            time: recipe.readyInMinutes,
            healthScore: recipe.healthScore,
          },
          ...recipes,
        ]);
      });
  };

  //Delete recipe with provided id
  const deleteRecipe = (recipe) => {
    console.log(recipes);
    recipes.splice(recipes.indexOf(recipe), 1);
    setRecipes([...recipes]);
  };

  // update variables
  const [menuInformation, setMenuInformation] = useState({
    total: 0,
    avgPreparationTime: 0,
    avgHS: 0,
  });

  // ? Why we write this line?
  const { total, avgPreparationTime, avgHS } = menuInformation;

  const updateMenuInfo = () => {
    var total = 0;
    var avgPreparationTime = 0;
    var avgHS = 0;
    recipes.forEach((recipe) => {
      total += recipe.price;
      avgPreparationTime += recipe.time;
      console.log(recipe.healthScore);
      avgHS += parseFloat(recipe.healthScore);
    });

    setMenuInformation({
      total: total,
      avgPreparationTime: avgPreparationTime / recipes.length,
      avgHS: parseFloat(avgHS) / recipes.length,
    });
  };

  useEffect(() => {
    console.log("Update Price!!!");
    updateMenuInfo();
    // updateTotal();
    // document.title = `$ ${updateTotal()} usd`;
  }, [recipes]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light px-4 mb-4">
        <a className="navbar-brand mb-2" href="#">
          <img
            src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt=""
          />
          Menú Alkemy
        </a>
        <form className="d-flex w-100">
          <input
            className="form-control mr-sm-2 w-80"
            type="search"
            placeholder="Nombre del plato, ingrediente, etc"
            aria-label="Search"
          />
          <Button
            onClick={getRequest}
            variant="primary"
            className="btn btn-sm btn-success px-4 w-20 ms-2"
          >
            Buscar
          </Button>
        </form>
      </nav>
      {recipes.length == 0 ? (
        <></>
      ) : (
        <div className="mx-4 d-flex justify-content-start justify-content-between">
          <span className="d-inline">
            TOTAL:
            <small className="rounded-3 bg-primary bg-gradient text-light px-2 py-1 mx-2">
              {Math.ceil(total)} USD
            </small>
          </span>
          <span className="d-inline">
            Promedio HS:
            <small className="rounded-3 bg-primary bg-gradient text-light px-2 py-1 mx-2">
              {Math.ceil(avgPreparationTime)} min
            </small>
          </span>
          <span className="d-inline">
            Promedio HS:
            <small className="rounded-3 bg-primary bg-gradient text-light px-2 py-1 mx-2">
              {Math.ceil(avgHS)} HS
            </small>
          </span>
        </div>
      )}
      <div className="x-4">
        {recipes.length == 0 ? (
          <NoRecipes />
        ) : (
          <ul className="p-0">
            {recipes.map((recipe) => (
              <li className="list-unstyled grid" key={recipe.id}>
                <Recipe deleteRecipe={deleteRecipe} recipe={recipe} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-auto bg-dark p-3 d-flex justify-content-center">
        <small className="text-muted text-light">
          Yeah boy, this is my footer
        </small>
      </footer>
    </div>
  );
};

export default App;
