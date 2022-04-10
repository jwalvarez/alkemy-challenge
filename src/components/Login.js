import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  let navigate = useNavigate();
  const login = ({ email, password }) => {
    axios({
      method: "post",
      url: "http://challenge-react.alkemy.org/",
      data: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        localStorage.setItem("alkemyToken", response.data["token"]);
        navigate("/");
      })
      .catch(function (error) {
        Swal.fire(
          "Hubo un problema",
          "Por favor, verifica las credenciales proporcionadas",
          "error"
        );
      });
  };
  return (
    <div className="row min-vh-100 d-flex justify-content-center align-items-center ">
      <div className="col"></div>
      <div className="card shadow col-9  col-xl-4 col-lg-5 col-md-5 col-sm-6 p-0">
        <div className="card-header px-5 pt-4">
          <h2 className="font-weight-bold">Iniciar sesión</h2>
        </div>
        <div className=" card-body bg-light px-5 pb-5">
          <h5 className="card-title">
            Inicia sesión para descubrir platillo sorprendentes.
          </h5>
          <p className="card-text">
            Descubre, agrega y empieza a disfrutar de increibles platos que
            tenemos para ti.
          </p>

          <Formik
            initialValues={{
              email: process.env.REACT_APP_USERNAME,
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                login(values);
              }, 2000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mt-6 mb-2"
                  autoComplete="off"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                {errors.email && (
                  <div className="alert alert-danger" role="alert">
                    <small>{errors.email && errors.email}</small>
                  </div>
                )}
                <input
                  className="form-control my-3"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button
                  className="btn btn-success w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Ingresar
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="card-footer text-muted px-5"></div>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Login;
