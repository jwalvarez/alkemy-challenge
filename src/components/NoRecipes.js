import React from "react";

const NoRecipes = () => {
  return (
    <>
      <div
        className="alert alert-warning d-flex align-items-center m-4"
        role="alert"
      >
        {/* <i className="bi bi-trash-fill bi flex-shrink-0 me-2"></i> */}
        <div className="d-flex m-2">
          {/* <i className="bi bi-cart-x" style={{ fontSize: 40 }}></i> */}
          No hay recetas agregadas en el menú. Por favor, empieza a buscar y
          agregar platos.
        </div>
      </div>
    </>
  );
};

export default NoRecipes;
