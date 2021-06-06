import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/basketSlice";
import { useState } from "react";
import Link from "next/link";
function Header({ products }) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchProduct = (e) => {
    let term = e.target.value;
    term = term.toLowerCase();
    setSearchTerm(term);
    setSearchResults(
      products?.filter((product) => product.title.toLowerCase().includes(term))
    );
  };
  return (
    <header className="sticky top-0 z-40 ">
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="hidden relative sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            onChange={searchProduct}
            value={searchTerm}
            type="text"
            placeholder="Search a product..."
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
          {showResults && (
            <div
              onMouseLeave={() => {
                setSearchResults([]);
                setSearchTerm("");
              }}
              className="absolute w-full h-auto max-h-96 top-10 border-b-2 rounded-md border-gray-100 bg-gray-50 overflow-y-scroll"
            >
              {searchResults?.length ? (
                searchResults.map(({ id, title, image }, i) => (
                  <Link href={`/details/${id}`} key={i}>
                    <div
                      onClick={() => console.log("hola")}
                      className="flex justify-between p-2 mt-2 border-b-2 rounded-md border-gray-100 bg-gray-50"
                    >
                      <h5 className="font-medium text-sm text-gray-600">
                        {title}
                      </h5>
                      <Image
                        src={image}
                        height={44}
                        width={44}
                        objectFit="contain"
                      />
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  {searchTerm && (
                    <p className="text-xs text-gray-400 text-center py-2">
                      No product found
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center text-sm space-x-6 mx-6 whitespace-nowrap text-white">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello ${session.user.name}` : "Sign In"}</p>
            <p className="bold">Account & Lists</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="bold">& Orders</p>
          </div>
          <div
            className="link flex items-center relative"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0  right-0 md:right-10 h-4 w-4 text-center  bg-yellow-400 rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="bold hidden md:inline mt-2">Bastek</p>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
        <p className="flex link items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
