import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useUserContext } from "../../context/UsuarioContext";

export const Registrase = () => {
  // --------------------------------------------------------------------
  const router = useRouter();
  const { crearUsuario } = useUserContext();

  // --------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordAux: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es obligatorio.")
        .email("Email invalido.")
        .min(5, "El email ingresado debe tener entre 5 y 300 caracteres.")
        .max(300, "El email ingresado debe tener entre 5 y 300 caracteres."),
      password: Yup.string()
        .required("La contraseña es obligatoria.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "La contraseña solo puede tener letras en minúscula, mayúscula y números."
        )
        .matches("[0-9]", "La contraseña debe tener al menos un número.")
        .min(8, "La contraseña ingresada debe tener entre 8 y 20 caracteres.")
        .max(20, "La contraseña ingresada debe tener entre 8 y 20 caracteres.")
        .oneOf(
          [Yup.ref("passwordAux")],
          "Las contraseñas ingresadas no coinciden"
        ),
    }),
    onSubmit: async (FormData) => {
      if (await crearUsuario(FormData)) {
        formik.handleReset();
        router.push("/");
      }
    },
  });

  // --------------------------------------------------------------------
  return (
    <div id="registrarse">
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <p>Registrarse</p>
          <div>
            <input
              type="email"
              placeholder="Ingrese Email"
              className="items"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Ingrese Contraseña"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="Ingrese Contraseña Nuevamente"
              name="passwordAux"
              onChange={formik.handleChange}
              value={formik.values.passwordAux}
            ></input>
          </div>
          <button type="submit">Registrarse</button>
        </div>
      </form>
    </div>
  );
};
