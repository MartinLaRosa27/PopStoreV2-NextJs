import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { BiSearchAlt2 } from "react-icons/bi";
import { MainBanner } from "../components/MainBanner";
import { Product } from "../components/Product";
import { FooterBanner } from "../components/FooterBanner";
import { useProductContext } from "../context/ProductContext";

const Home = () => {
  // -------------------------------------------------------------------
  const { obtenerTodosProductos, products } = useProductContext();

  // -------------------------------------------------------------------
  const [search, setSearch] = useState("");

  // -------------------------------------------------------------------
  useEffect(() => {
    obtenerTodosProductos();
  }, []);

  // -------------------------------------------------------------------
  return (
    <>
      {/* head */}
      <Head>
        <title>PopStore - Home</title>
      </Head>
      {/* main banner */}
      <MainBanner />

      {/* informacion */}
      <div className="products-heading">
        <h2>Productos Principales</h2>
        <p>Las mejores marcas te esperan</p>
      </div>

      {/* buscador */}
      <div className="navbar-buscador">
        <input
          type="text"
          placeholder="Funko POP! WWE: Becky Lynch"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <Link href={`/search/${search}`}>
          <p>
            <BiSearchAlt2 />
          </p>
        </Link>
      </div>

      {/* productos */}
      <div className="products-container">
        {products === null && (
          <div className="products-heading">
            <p>Cargando Productos...</p>
          </div>
        )}
        <div className="marquee">
          <div className="maylike-products-container track">
            {products !== null &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </div>
      </div>

      {/* footer banner */}
      <FooterBanner />
    </>
  );
};

export default Home;
