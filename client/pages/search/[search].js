import React from "react";
import Head from "next/head";
import { ResultadosBusqueda } from "../../components/search/ResultadosBusqueda";

const Search = ({ search }) => {
  return (
    <div>
      <Head>
        <title>PopStore - Resultados de {search}</title>
      </Head>
      <ResultadosBusqueda search={search} />
    </div>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      search: params.search,
    },
  };
};

export default Search;
