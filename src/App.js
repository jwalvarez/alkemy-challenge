import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

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

  useEffect(() => {
    updateTotal();
    // document.title = `$ ${updateTotal()} usd`;
  });

  const updateTotal = () => {
    let total = 0;
    recipes.forEach((recipe) => {
      total += recipe.price;
    });
    console.log(total);
    return total;
  };

  const [recipes, setRecipes] = useState([]);

  return (
    <>
      <nav className="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light px-4 mb-4">
        <a className="navbar-brand" href="#">
          {/* <img
            src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          /> */}
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
      <div className="mx-4">
        {recipes.length == 0 ? (
          <NoRecipes />
        ) : (
          <ul className="p-0">
            {recipes.map((recipe) => (
              <li className="list-unstyled" key={recipe.id}>
                <div className="card border-primary mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={recipe.img}
                        className="w-100 img-fluid rounded-top"
                        alt={recipe.img}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title">
                              <strong>{recipe.title}</strong>
                            </h5>
                          </div>

                          <div className="col-2 d-flex justify-content-end">
                            <i className="bi bi-trash-fill" role="button"></i>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            {recipe.props.map((prop) => (
                              <small
                                key={prop}
                                className="d-inline rounded-3 bg-dark text-light px-2 py-1 my-4 me-2"
                              >
                                {prop}
                              </small>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="row">
                        <small className="col text-muted">
                          Duración: {recipe.time} min
                          <br />
                          {recipe.healthScore} Health Score
                        </small>
                        <h3 className="col card-text d-flex justify-content-end my-auto">
                          <strong>{recipe.price} USD</strong>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <footer className="bg-dark p-3"></footer>
      </div>
    </>
  );
};

export default App;
