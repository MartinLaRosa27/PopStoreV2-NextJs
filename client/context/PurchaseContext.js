import React, { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import Cookie from "universal-cookie";
const Context = createContext();

export const PurchaseContext = ({ children }) => {
  // --------------------------------------------------------------------------------
  const router = useRouter();

  // ---------------------------------------------------------------
  const nuevaCompra = async (productsId) => {
    const cookie = new Cookie();
    const token = cookie.get("token");
    let compraConfirmacion = false;
    await axios
      .post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/nueva-compra`, {
        productsId,
        auth: token,
      })
      .then(async (res) => {
        toast.success(res.data.message);
        compraConfirmacion = true;
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        if (e.response.data.status === "error - token") {
          const cookies = new Cookies();
          cookies.remove("token", { path: "/" });
          router.push("/");
        }
      });
    return compraConfirmacion;
  };

  // ---------------------------------------------------------------
  return (
    <Context.Provider value={{ nuevaCompra }}>{children}</Context.Provider>
  );
};

export const usePurchaseContext = () => {
  return useContext(Context);
};
