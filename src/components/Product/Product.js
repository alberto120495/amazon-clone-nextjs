import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../slices/basketSlice";
import Fade from "react-reveal/Fade";
import { EyeIcon } from "@heroicons/react/outline";
import QuickView from "./QuickView";
import styles from "../../styles/Product.module.css";
import Link from "next/link";

const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, description, category, image, products }) {
  const [showQuick, setShowQuick] = useState(false);
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      rating,
      price,
      description,
      category,
      image,
      hasPrime,
    };
    //Sending the product as an action to the REDUX store... the basket slice
    dispatch(addToBasket(product));
  };

  return (
    <>
      <Fade bottom>
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
          <p className="absolute top-2 right-2 text-xs italic text-gray-400">
            {category}
          </p>
          <div
            className={`relative flex flex-col ${styles.product_image_wrapper}`}
          >
            <Image
              src={image}
              height={200}
              width={200}
              objectFit="contain"
              className={`cursor-pointer ${styles.loop_product_image} `}
            />
            <div
              onClick={() => setShowQuick(true)}
              className={`rounded-lg cursor-pointer ${styles.product_image_overly} `}
            >
              <div className={`button rounded-lg flex items-center space-x-2`}>
                <span>Quick View</span>
                <EyeIcon className="h-6" />
              </div>
            </div>
          </div>

          <Link href={`/details/${id}`}>
            <div className="cursor-pointer">
              <h4 className="my-3 font-bold ">{title}</h4>

              <div className="flex">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <StarIcon key={i} className="h-5 text-yellow-500" />
                  ))}
              </div>
              <p className="text-xs my-2 line-clamp-2">{description}</p>
              <div className="mb-5">
                <Currency quantity={price} currency="USD" />
              </div>
              {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                  <img
                    src="https://links.papareact.com/fdw"
                    alt="prime deliver"
                    loading="lazy"
                    className="w-12"
                  />
                  <p className="text-xs text-gray-500">
                    FREE Next-day Delivery
                  </p>
                </div>
              )}
            </div>
          </Link>

          <button className="mt-auto button" onClick={addItemToBasket}>
            Add to Basket
          </button>
        </div>
      </Fade>
      {showQuick && (
        <QuickView
          setShowQuick={setShowQuick}
          id={id}
          products={products}
          imag={image}
          price={price}
        />
      )}
    </>
  );
}

export default Product;
