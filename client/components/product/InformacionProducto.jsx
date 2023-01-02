import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { vefificarToken } from "../../middleware/verificarToken";

export const InformacionProducto = ({ selectedProduct }) => {
  // -----------------------------------------------------------------------------
  const { incrQty, decrQty, qty, onAdd, finalizarCompra, availableProducts } =
    useStateContext();

  // -----------------------------------------------------------------------------
  const [index, setIndex] = useState(0);

  // -----------------------------------------------------------------------------
  const finCompra = async (product) => {
    if (!(await vefificarToken())) {
      router.push("/login");
    } else {
      await onAdd(product, qty);
      await finalizarCompra();
    }
  };

  // -----------------------------------------------------------------------------
  return (
    <div className="product-detail-container">
      <div>
        <div className="image-container">
          <img
            src={`${selectedProduct.image[index]}`}
            title={selectedProduct.name}
            alt={selectedProduct.name}
          ></img>
        </div>

        <div className="small-images-container">
          {selectedProduct.image.map((img, i) => {
            return (
              <div className="small-image" key={i}>
                <img src={`${img}`} onMouseEnter={() => setIndex(i)}></img>
              </div>
            );
          })}
        </div>
      </div>

      <div className="product-detail-desc">
        <h1>{selectedProduct.name}</h1>
        <h4>Detalles: </h4>
        <p>{selectedProduct.details}</p>
        <p className="price">USD {selectedProduct.priceUSD}</p>
        <div className="quantity-desc">
          {selectedProduct.stock > 0 && (
            <div>
              <h3>Cantidad: </h3>
              <span className="minus" onClick={() => decrQty()}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span
                className="plus"
                onClick={() => incrQty(availableProducts(selectedProduct))}
              >
                <AiOutlinePlus />
              </span>
            </div>
          )}
          {selectedProduct.stock <= 0 && <h3>No hay stock</h3>}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="add-to-cart"
            onClick={() => onAdd(selectedProduct, qty)}
          >
            Agregar al Carrito
          </button>
          <button
            type="button"
            className="buy-now"
            onClick={() => finCompra(selectedProduct)}
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};
