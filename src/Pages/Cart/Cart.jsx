import { useContext, useEffect } from "react";
import { cartContext } from "../../components/Context/cart.context";
import Loading from "../../components/Loading/Loading";
import CardItem from "./../../components/CardItem/CardItem";

import { Link } from "react-router-dom";

export default function Cart() {
  const { getProducts, product, clearCart } = useContext(cartContext);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {product === null ? (
        <Loading />
      ) : (
        <>
          <section className="p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <i
                className="fa-brands fa-opencart text-4xl text-gray-600"
                aria-hidden="true"
              ></i>
              <h2 className="text-2xl font-semibold text-gray-700 border-l-2 border-gray-800 pl-4">
                Your Cart
              </h2>
            </div>

            {/* Conditional Rendering */}
            {product.numOfCartItems === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <h2 className="">Your cart is empty 🛒</h2>

                <Link to="/" className="btn-primary">
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {product.data.products.map((item) => (
                  <CardItem key={item._id} productInfo={item} />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-3 ">
              <p className="text-lg font-semibold text-gray-700">
                Your total price :{" "}
                <span className="text-primary-500">
                  {" "}
                  {product.data.totalCartPrice}
                </span>{" "}
                $
              </p>
              <button
                className="btn-primary bg-red-500 hover:bg-red-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link to="/checkout" className="btn-primary">
                pay now
              </Link>
            </div>

          </section>
        </>
      )}
    </>
  );
}
