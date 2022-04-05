import React from "react";

const Recipe = ({ deleteRecipe, recipe }) => {
  return (
    //     @include media-breakpoint-up(xs) { ... }
    // @include media-breakpoint-up(sm) { ... }
    // @include media-breakpoint-up(md) { ... }
    // @include media-breakpoint-up(lg) { ... }
    // @include media-breakpoint-up(xl) { ... }
    <div className="card border-primary m-4">
      <div className="row g-0">
        <div className="col-md-2">
          <img
            src={recipe.img}
            className="w-100 img-fluid rounded-top"
            alt={recipe.img}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-block">
            <div className="row">
              <div className="col">
                <h5 className="card-title">
                  <strong>{recipe.title}</strong>
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {recipe.props.map((prop) => (
                  <small
                    key={prop}
                    className="d-inline border rounded-3 bg-light text-secondary px-2 py-1 my-4 me-2"
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
      </div>
    </div>
  );
};

export default Recipe;
