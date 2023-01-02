import React, { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Cookies from "universal-cookie";
const Context = createContext();

export const UserContext = ({ children }) => {
  // ---------------------------------------------------------------
  const crearUsuario = async (userForm) => {
    let usuarioCreadoConfirmacion = false;
    userForm.email = userForm.email.toLowerCase();
    userForm.email = userForm.email.trim();
    userForm.password = userForm.password.trim();
    userForm.passwordAux = userForm.passwordAux.trim();
    const { email, password, passwordAux } = userForm;
    if (password !== passwordAux) {
      toast.error("Las contraseñas ingresadas no coinciden");
    } else {
      await axios
        .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/crear-usuario`, {
          email,
          password,
          passwordAux,
        })
        .then(async (res) => {
          toast.success("Usuario registrado con exito");
          const cookies = new Cookies();
          cookies.set("token", res.data.token, { path: "/" });
          usuarioCreadoConfirmacion = true;
        })
        .catch((e) => {
          toast.error(e.response.data.message);
        });
    }
    return usuarioCreadoConfirmacion;
  };

  // ---------------------------------------------------------------
  const autenticarUsuario = async (userForm) => {
    let usuarioExisteConfirmacion = false;
    userForm.email = userForm.email.toLowerCase();
    userForm.email = userForm.email.trim();
    userForm.password = userForm.password.trim();
    const { email, password } = userForm;
    await axios
      .post(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/autenticar-usuario`,
        {
          email,
          password,
        }
      )
      .then(async (res) => {
        const cookies = new Cookies();
        cookies.set("token", res.data.token, { path: "/" });
        usuarioExisteConfirmacion = true;
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
    return usuarioExisteConfirmacion;
  };

  // ---------------------------------------------------------------
  return (
    <Context.Provider value={{ crearUsuario, autenticarUsuario }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => {
  return useContext(Context);
};
