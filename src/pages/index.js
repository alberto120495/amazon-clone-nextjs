import Head from "next/head";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/Product/ProductFeed";
import { getSession } from "next-auth/client";

export default function Home({ session, products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  const session = await getSession(context);
  return {
    props: {
      session,
      products,
    },
  };
}
