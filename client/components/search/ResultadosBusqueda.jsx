import React, { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import { Product } from "../Product";

export const ResultadosBusqueda = ({ search }) => {
  const { obtenerProductoNombre } = useProductContext();

  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    const callObtenerProductoNombre = async () => {
      setResultados(await obtenerProductoNombre(search));
    };
    callObtenerProductoNombre();
  }, []);

  return (
    <div>
      {resultados !== null && resultados.length > 0 && (
        <div>
          <div className="products-heading">
            <h2>Resultados de la búsqueda de "{search}"</h2>
          </div>

          <div className="all-products-category">
            {resultados.map((resultado) => {
              return (
                <div className="elemento-category" key={resultado.id}>
                  <Product product={resultado} key={resultado._id} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {resultados !== null && resultados.length <= 0 && (
        <div className="products-heading">
          <h2>No se encontraron resultados la búsqueda de "{search}"</h2>
        </div>
      )}
    </div>
  );
};
