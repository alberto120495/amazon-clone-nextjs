import { useEffect, useState } from "react";
import styles from "../../styles/Quickview.module.css";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";
import ReactImageZoom from "react-image-zoom";

function QuickView({ setShowQuick, id, products, imag, price }) {
  const props = {
    width: 400,
    height: 400,
    zoomPosition: "original",
    img: imag,
  };
  const [product, setProduct] = useState({});
  const router = useRouter();
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  useEffect(() => {
    const found = products.filter((product) => product.id == id)[0];
    setProduct(found);
  }, [id]);

  return (
    <>
      <div
        className={
          "fixed mx-6 h-screen sm:h-auto top-0 left-0 flex justify-center items-start overflow-y-scroll " +
          styles.quickView
        }
        style={{ zIndex: "1200" }}
      >
        <div
          className={`relative my-28 h-auto sm:h-2/4 sm:w-2/4 ${styles.quickView_wrapper}`}
          style={{ zIndex: "200" }}
        >
          <div className="flex flex-wrap mt-5">
            <div className="px-5 mb-7 w-full md:w-7/12">
              <div className="w-full mb-4 overflow-hidden rounded-lg sm:h-auto">
                {product && <ReactImageZoom {...props} />}
              </div>
            </div>
            <div className="px-5 mb-5 w-full md:w-5/12">
              <p className="font-serif text-xl text-black">
                {product?.category}
              </p>
              <h1 className="my-2 text-5xl text-yellow-500 mb-7">
                {product?.name}
              </h1>
              <p className="text-gray-600 text-base mb-5 line-clamp-5">
                {product?.description}
              </p>
              <p className="flex items-center">
                <b className="mr-1">Rating:</b>{" "}
                {Array(rating)
                  .fill()
                  .map((_, index) => (
                    <StarIcon key={index} className="h-5 text-yellow-500" />
                  ))}
                <span> (30)</span>
              </p>
              <p>
                <b>Stock:</b> Available in stock
              </p>

              <p className="text-yellow-500 text-2xl mb-7">
                <Currency quantity={price} currency="USD" />
              </p>

              <button
                onClick={() => router.push(`/details/${id}`)}
                className="w-full button mt-4"
              >
                View details
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => setShowQuick(false)}
          className="w-full h-screen bg-gray-900 bg-opacity-60 fixed top-0 right-0 cursor-pointer"
          style={{ zIndex: "100" }}
        />
      </div>
    </>
  );
}

export default QuickView;
