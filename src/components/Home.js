import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import NoRecipes from "./NoRecipes";
import Recipe from "./Recipe";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [showingResults, setShowingResults] = useState(false);

  const [formValues, handleInputChange] = useForm({
    searchValue: "",
  });
  const { searchValue } = formValues;

  const [searchResults, setSearchResults] = useState([]);

  const submit = (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    searchValue.length > 2 && getRecipesByWord();
  };

  // Add recipe to the state
  const getRecipesByWord = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        setSearchResults([res.data["results"]][0]);
        setShowingResults(true);
      })
      .catch((error) => {
        Swal.fire(
          "Hubo un problema",
          "Por favor, vuelva a intentarlo más tarde.",
          "warning"
        );
      });
  };

  //Delete recipe with provided id
  const deleteRecipe = (recipe) => {
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

      avgHS += parseFloat(recipe.healthScore);
    });

    setMenuInformation({
      total: total,
      avgPreparationTime: avgPreparationTime,
      avgHS: parseFloat(avgHS) / recipes.length,
    });
  };

  useEffect(() => {
    updateMenuInfo();
  }, [recipes]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="sticky-top d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light px-4 mb-4 shadow-sm">
        <span className="navbar-brand mb-2" href="#">
          <svg
            width="50"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 30.0054L12.2141 5.00146H15.975L17.7688 8.6725L19.5947 12.4104L28.1891 30.0054H24.5353L17.7688 16.1507L15.9428 12.4128L14.0946 8.62951L3.65404 30.0054H0Z"
              fill="#58C1F5"
            />
            <path
              d="M7.33057 30.0055L19.5445 5.00159H23.3054L25.0992 8.67262L26.9251 12.4105L35.5174 30.0011L31.8693 30.0127L25.0992 16.1508L23.2732 12.4129L21.425 8.62963L10.9844 30.0055H7.33057Z"
              fill="#58C1F5"
            />
          </svg>
          Menú Alkemy
        </span>
        <form className="d-flex w-100" onSubmit={submit}>
          <input
            className="form-control mr-sm-2 w-80"
            placeholder="Nombre del plato, ingrediente, etc"
            aria-label="Search"
            name="searchValue"
            type="text"
            value={searchValue}
            onChange={handleInputChange}
          />
          <Button
            // onClick={getRequest}
            type="sudmit"
            variant="primary"
            className="btn btn-sm btn-success px-4 w-20 ms-2"
          >
            Buscar
          </Button>
        </form>
      </nav>

      {showingResults && (
        <ul className="p-0 mx-4 mt-4">
          <h2 className="">Products with "{searchValue}"</h2>
          {searchResults.map((result) => (
            <li className="list-unstyled py-1" key={result.id}>
              <Recipe
                setSearchResults={setSearchResults}
                setRecipes={setRecipes}
                recipe={result}
                recipes={recipes}
                showingResults={showingResults}
                setShowingResults={setShowingResults}
              />
            </li>
          ))}
        </ul>
      )}
      {recipes.length === 0 ? (
        <></>
      ) : (
        <div className="mx-4 pb-2 border-bottom d-flex justify-content-between">
          <div className="d-flex justify-content-start align-items-center">
            <h3>Resumen:</h3>
          </div>
          <div className="d-flex justify-content-end">
            <span className="d-block my-2">
              <small className="text-truncate rounded-3 bg-primary bg-gradient text-light px-2 py-1 mx-2">
                Total: {Math.ceil(total)} USD
              </small>
            </span>
            <span className="d-block my-2">
              <small className="text-truncate rounded-3 bg-primary bg-gradient text-light px-2 py-1 mx-2">
                Duración: {Math.ceil(avgPreparationTime)} min
              </small>
            </span>
            <span className="d-block my-2">
              <small className="text-truncate rounded-3 bg-primary bg-gradient text-light px-2 py-1 mx-2">
                Promedio HS: {Math.ceil(avgHS)} HS
              </small>
            </span>
          </div>
        </div>
      )}
      <div className="x-4">
        {recipes.length === 0 ? (
          <NoRecipes />
        ) : (
          <ul className="p-0 mx-4 mt-4">
            {recipes.map((recipe) => (
              <li className="list-unstyled my-3" key={recipe.id}>
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

export default Home;
