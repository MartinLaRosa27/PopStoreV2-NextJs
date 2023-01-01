import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
const Context = createContext();

export const StateContext = ({ children }) => {
  // --------------------------------------------------------------------------
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);

  // --------------------------------------------------------------------------
  useEffect(() => {
    try {
      const cartLocal = JSON.parse(localStorage.getItem("cartItems"));
      if (cartLocal.length !== cartItems.length) {
        setCartItems(JSON.parse(localStorage.getItem("cartItems")));
        setTotalQuantities(cartLocal.length);
      }
    } catch (e) {}
  });

  // --------------------------------------------------------------------------
  const availableProducts = (product) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart != undefined) {
      return product.stock - checkProductInCart.quantity;
    }
    return product.stock;
  };

  // --------------------------------------------------------------------------
  const incrQty = (stock) => {
    if (qty < stock) {
      setQty(qty + 1);
    }
  };

  // --------------------------------------------------------------------------
  const decrQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // --------------------------------------------------------------------------
  const onAdd = async (product, quantity) => {
    const auxCartItem = cartItems;
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(totalPrice + product.priceUSD * quantity);
    setTotalQuantities(totalQuantities + quantity);
    if (checkProductInCart) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]._id === product._id) {
          cartItems[i].quantity += quantity;
        }
      }
    } else {
      product.quantity = quantity;
      auxCartItem.push(product);
      setCartItems(auxCartItem);
    }
    setQty(1);
    localStorage.setItem("cartItems", JSON.stringify(auxCartItem));
    toast.success(`(x${quantity})"${product.name}" Agregado al Carrito`);
  };

  // --------------------------------------------------------------------------
  const removeItem = (product) => {
    const updatedCartItems = cartItems.filter((item) => {
      return item._id !== product._id;
    });
    setTotalPrice(totalPrice - product.priceUSD);
    setCartItems(updatedCartItems);
    setTotalQuantities(0);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.error(
      `(x${product.quantity})"${product.name}" Eliminado del Carrito`
    );
  };

  // --------------------------------------------------------------------------
  const finalizarCompra = () => {
    Swal.fire({
      title: "¿Desea finalizar la compra?",
      text: `El valor es de ${totalPrice.toFixed(2)}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Compra realizada",
          "Se realizo la compra correctamente",
          "success"
        );
        setCartItems([]);
        setTotalPrice(0);
        setQty(1);
        setTotalQuantities(0);
      }
    });
  };

  // --------------------------------------------------------------------------
  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        qty,
        totalQuantities,
        incrQty,
        decrQty,
        onAdd,
        setShowCart,
        removeItem,
        availableProducts,
        finalizarCompra,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// --------------------------------------------------------------------------
export const useStateContext = () => {
  return useContext(Context);
};
