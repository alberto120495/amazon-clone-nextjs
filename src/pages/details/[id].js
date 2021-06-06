import ProductDetails from "../../components/Details/ProductDetails";
import Header from "../../components/Header/Header";
import Head from "next/head";
import { useState } from "react";
function Details({ product }) {
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  return (
    <div>
      <Head>
        <title>{product?.title} | Amazon</title>
      </Head>
      <Header />
      <ProductDetails
        id={product.id}
        title={product.title}
        rating={rating}
        price={product.price}
        description={product.description}
        category={product.category}
        image={product.image}
        hasPrime={product.hasPrime}
      />
    </div>
  );
}

export default Details;

export async function getServerSideProps(context) {
  const product = await fetch(
    `https://fakestoreapi.com/products/${context.query.id}`
  ).then((res) => res.json());
  return {
    props: {
      product,
    },
  };
}
