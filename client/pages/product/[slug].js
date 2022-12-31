import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useProductContext } from "../../context/ProductContext";
import { InformacionProducto } from "../../components/product/InformacionProducto";
import { ProductosSimilares } from "../../components/product/ProductosSimilares";

const productDetails = ({ productId }) => {
  const { selectedProduct, obtenerProductoId } = useProductContext();
  const [execute, setExecute] = useState(true);
  const [actualId, setActualId] = useState("");

  if (actualId !== productId) {
    setActualId(productId);
    setExecute(true);
  }

  useEffect(() => {
    const callObtenerProductoId = async () => {
      await obtenerProductoId(productId);
    };
    callObtenerProductoId();
    setExecute(false);
  }, [execute]);

  return (
    <div>
      <Head>
        <title>PopStore - Comprar Ahora</title>
      </Head>

      {selectedProduct !== null && Object.keys(selectedProduct).length <= 0 && (
        <div className="products-heading">
          <h2>No se encontro el producto buscado {":("} </h2>
        </div>
      )}

      {selectedProduct === null && (
        <h1>Cargando Información del Producto...</h1>
      )}

      {selectedProduct !== null && Object.keys(selectedProduct).length > 0 && (
        <InformacionProducto selectedProduct={selectedProduct} />
      )}

      {selectedProduct !== null && Object.keys(selectedProduct).length > 0 && (
        <ProductosSimilares
          categoryId={selectedProduct.categoryId}
          selectedProduct={selectedProduct.name}
        />
      )}
    </div>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      productId: params.slug,
    },
  };
};

export default productDetails;
