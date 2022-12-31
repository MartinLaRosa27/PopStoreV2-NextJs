import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const Context = createContext();

export const ProductContext = ({ children }) => {
  // --------------------------------------------------------------------------
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --------------------------------------------------------------------------
  const obtenerTodosProductos = async () => {
    await axios
      .get(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-todos-productos`
      )
      .then(async (res) => {
        setProducts(res.data.products);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // --------------------------------------------------------------------------
  const obtenerProductoId = async (id) => {
    await axios
      .get(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-producto-id/${id}`
      )
      .then(async (res) => {
        setSelectedProduct(res.data.product);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // --------------------------------------------------------------------------
  const obtenerTodosProductosCategoria = async (category) => {
    let selectedProducts = {};
    await axios
      .get(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-todos-productos-categoria/${category}`
      )
      .then(async (res) => {
        selectedProducts = res.data.products;
      })
      .catch((e) => {
        console.log(e);
      });
    return selectedProducts;
  };

  // --------------------------------------------------------------------------
  const obtenerProductosPorCategoriaId = async (categoryId) => {
    let selectedProducts = {};
    await axios
      .get(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-productos-categoria-id/${categoryId}`
      )
      .then(async (res) => {
        selectedProducts = res.data.products;
      })
      .catch((e) => {
        console.log(e);
      });
    return selectedProducts;
  };

  // --------------------------------------------------------------------------
  const obtenerProductoNombre = async (name) => {
    let searchProducts = [];
    await axios
      .get(
        `http://${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-producto-nombre/${name}`
      )
      .then(async (res) => {
        searchProducts = res.data.products;
      })
      .catch((e) => {
        console.log(e);
      });
    return searchProducts;
  };

  // --------------------------------------------------------------------------
  return (
    <Context.Provider
      value={{
        products,
        selectedProduct,
        obtenerTodosProductos,
        obtenerProductoId,
        obtenerTodosProductosCategoria,
        obtenerProductoNombre,
        obtenerProductosPorCategoriaId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// --------------------------------------------------------------------------
export const useProductContext = () => {
  return useContext(Context);
};
