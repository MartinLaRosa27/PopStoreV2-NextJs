import React from "react";
import Head from "next/head";
import { Registrase } from "../components/login/Registrase";
import { IniciarSesion } from "../components/login/IniciarSesion";

const login = () => {
  return (
    <div className="login">
      {/* head */}
      <Head>
        <title>PopStore - Iniciar Sesión</title>
      </Head>
      {/* Formulario Registrarse */}
      <Registrase />
      {/* Formulario Inciar Sesión */}
      <IniciarSesion />
    </div>
  );
};

export default login;
