import React, { useEffect, useState } from "react";
import { Product } from "../Product";
import { useProductContext } from "../../context/ProductContext";

export const ProductosSimilares = ({ categoryId, selectedProduct }) => {
  const { obtenerProductosPorCategoriaId } = useProductContext();

  const [productosSimilares, setProductosSimilares] = useState(null);

  useEffect(() => {
    const callObtenerProductosPorCategoriaId = async () => {
      setProductosSimilares(await obtenerProductosPorCategoriaId(categoryId));
    };
    callObtenerProductosPorCategoriaId();
  }, []);

  return (
    <div className="maylike-products-wrapper">
      {productosSimilares !== null && (
        <div>
          <h2>Productos Similares a "{selectedProduct}"</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {productosSimilares.map((productoSimilar) => {
                return (
                  <Product
                    key={productoSimilar._id}
                    product={productoSimilar}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
