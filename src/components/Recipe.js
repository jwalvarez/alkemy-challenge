import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Recipe = ({
  deleteRecipe,
  setRecipes,
  recipes,
  recipe,
  setSearchResults,
  showingResults,
  setShowingResults,
}) => {
  const addRecipe = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information/?apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        Swal.fire(
          "Yeiii",
          "¡El producto se ha agregado correctamente!",
          "success"
        );

        const recipe = res.data;

        let veganCounter = 0;
        recipes.forEach((recipe) => {
          recipe["vegan"] && veganCounter++;
        });
        res.data["vegan"] && veganCounter++;

        if (recipes.length < 4 && veganCounter <= 2) {
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
          setSearchResults([]);
        } else {
          Swal.fire(
            "Hey",
            "¡Recuerda que no puedes agregar más de 2 platos veganos y no más de 4 platos en total!",
            "error"
          );
        }
        setShowingResults(false);
      });
  };

  return (
    <div
      className={
        recipe.vegan
          ? "border-2 border-success card align-items-stretch"
          : "border-2 border-primary card align-items-stretch"
      }
    >
      {!showingResults && recipe?.vegan && (
        <div className="card-header d-flex justify-content-start align-items-center my-auto">
          {recipe.vegan && (
            <small className="px-0 py-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#adc178"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z" />
              </svg>
            </small>
          )}
        </div>
      )}
      <div className="row g-0">
        <div className="col">
          <div className="card-body d-block">
            <div className="row">
              <div className="col d-flex justify-content-start align-items-center">
                <h5 className="card-title ">
                  <strong>{recipe.title}</strong>
                </h5>
              </div>
              {showingResults && (
                <div className="col d-flex justify-content-end">
                  <button
                    onClick={() => addRecipe()}
                    className="btn btn-primary"
                  >
                    Agregar
                  </button>
                </div>
              )}
            </div>

            {recipe.props && (
              <div className="row">
                <div className="col">
                  {recipe.props.map((prop) => (
                    <small
                      key={prop}
                      className="text-truncate d-inline border rounded-3 bg-light text-secondary p-1 my-4 me-2"
                    >
                      {prop}
                    </small>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="col-2">
          <img
            src={recipe.img ? recipe.img : recipe.image}
            className="w-auto h-100 img-fluid "
            alt={recipe.title}showingResults
          />
        </div> */}

        {recipe.props && (
          <div className="card-footer">
            <div className="row">
              <small className="col text-muted">
                Duración: {recipe.time} min
                <br />
                {recipe.healthScore} Health Score
              </small>
              <h3 className="col card-text d-flex justify-content-end my-auto">
                <strong className="">{recipe.price} USD</strong>
                <small>
                  <i
                    onClick={() => deleteRecipe(recipe)}
                    className="bi bi-trash-fill text-secondary align-middle mx-1"
                    role="button"
                  ></i>
                </small>
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
