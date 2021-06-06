import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../../slices/basketSlice";
import ReactImageZoom from "react-image-zoom";
import { useMediaQuery } from "react-responsive";
function ProductDetails({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //Remove item from Redux
    dispatch(removeFromBasket({ id }));
  };
  const props = {
    width: 400,
    height: 500,
    img: image,
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center mt-14">
        <div className="w-1/2 flex justify-center items-center border border-gray-100 ml-2">
          {!isMobile ? (
            <ReactImageZoom {...props} />
          ) : (
            <Image src={image} height={400} width={400} objectFit="contain" />
          )}
        </div>
        <div className=" w-1/2 mx-5">
          <p className="font-bold sm:text-2xl mt-4">{title}</p>
          <p className="text-lg">{category}</p>

          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="h-5 text-yellow-500" />
              ))}
          </div>
          <p className="text-justify text-sm sm:text-base mt-2 mb-2">
            {description}
          </p>
          <p className="text-2xl font-semibold">
            <Currency quantity={price} currency="USD" />
          </p>
          <div className="flex space-x-3 my-3">
            <button className="mt-auto button" onClick={addItemToBasket}>
              Add to Basket
            </button>
            <button className="button" onClick={removeItemFromBasket}>
              Remove from Basket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
