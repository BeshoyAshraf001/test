import React, { useContext } from "react";
import { cartContext } from "../Context/cart.context";
import { Link } from "react-router-dom";

export default function CardItem({ productInfo }) {
  const { removeProduct, updateProduct } = useContext(cartContext);
  const { count, price, product } = productInfo;
  const { imageCover, title, category, id } = product;
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="card-item flex items-center justify-between gap-6 bg-white shadow-md rounded-lg p-6 flex-grow border border-gray-200">
          <picture>
            <img
              src={imageCover}
              alt="Product"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              loading="lazy"
            />
          </picture>

          <div className="flex flex-col justify-between ">
            <Link to={`/orders/${product.id}`} className="font-semibold text-gray-700 text-lg max-w-28 line-clamp-1 ">
              {title}
            </Link>
            <h4 className="text-sm text-gray-500">{category.name}</h4>
          </div>

          <div className="count flex items-center gap-4">
            <span className="font-medium text-gray-600">{count}</span>
            <div className="icons flex flex-col gap-2">
              <button
                onClick={() =>
                  updateProduct({ productId: id, count: count + 1 })
                }
                className="icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <button
                onClick={() =>
                  updateProduct({ productId: id, count: count - 1 })
                }
                className="icon w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
            </div>
          </div>

          <span className="font-medium text-gray-800">{price} L.E</span>
        </div>

        <button
          onClick={() => {
            removeProduct({ productId: id });
          }}
          className="delete-btn w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center text-white hover:bg-red-700"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </>
  );
}
