import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Product } from "../../components/Product";
import { useProductContext } from "../../context/ProductContext";
import { categoryBanner } from "../../helpers/CategoryBanner";

// -------------------------------------------------------------
const Category = ({ brand, category }) => {
  // -------------------------------------------------------------
  const { obtenerTodosProductosCategoria } = useProductContext();

  // -------------------------------------------------------------
  const [products, setProducts] = useState(null);

  // -------------------------------------------------------------
  useEffect(() => {
    const callObtenerTodosProductosCategoria = async () => {
      setProducts(await obtenerTodosProductosCategoria(category));
    };
    callObtenerTodosProductosCategoria();
  }, []);

  // -------------------------------------------------------------
  return (
    <div>
      {/* head */}
      <Head>
        <title>PopStore - {brand.category}</title>
      </Head>

      {/* banner */}
      <div className="footer-banner-container">
        <img
          src={brand.image}
          alt={brand.category}
          title={brand.category}
          className="footer-banner-image"
        ></img>
      </div>

      {/* productos */}
      <div className="all-products-category">
        {products === null && (
          <div className="products-heading">
            <h2>Cargando productos de {category}</h2>
          </div>
        )}
        {products !== null && products.length > 0 && (
          <>
            <div className="products-heading">
              <h2>Todos los Productos de {category}</h2>
            </div>
            {products.map((product) => {
              return (
                <div className="elemento-category" key={product._id}>
                  <Product product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
export const getServerSideProps = ({ params }) => {
  let brand = null;
  for (let i = 0; i < categoryBanner.length; i++) {
    if (categoryBanner[i].category === params.category) {
      brand = categoryBanner[i];
      break;
    }
  }
  if (brand === null) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
  return {
    props: {
      brand,
      category: params.category,
    },
  };
};

// -------------------------------------------------------------
export default Category;
