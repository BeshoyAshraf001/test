import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/cart.context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function ProductCart({ productInfo }) {
  // Destructure props for readability
  const { title, price, id, category, imageCover, ratingsAverage } =
    productInfo;
  const overlayClass =
    "layer absolute top-0 left-0 w-full h-full bg-[#00000080] flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300";

  // ^ ================|> CartContext
  const { addProductToCart } = useContext(cartContext);
  
  return (
    <>
   
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      {/* Product Image */}
      <picture className="relative cursor-pointer">
        <img
          src={imageCover}
          alt={`${title} cover`}
          className="w-full object-cover"
          loading="lazy"
        />
        {/* Overlay with actions */}
        <div className={overlayClass}>
          {/* Wishlist Icon */}
          <button
            onClick={() => addProductToWishlist({ productId: id })}
            className="iconClass"
            aria-label="Add to Wishlist"
          >
            <i className="fa-regular fa-heart"></i>
          </button>

          {/* Add to Cart Icon */}
          <Link
            onClick={() => addProductToCart({ productId: id })}
            className="iconClass"
            aria-label="Add to Cart"
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>

          {/* View Product Icon */}
          <Link
            to={`/orders/${id}`}
            className="iconClass"
            aria-label="View Product Details"
            
          >
            <i className="fa-solid fa-eye"></i>
          </Link>
        </div>
      </picture>

      {/* Card Content */}
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold line-clamp-1"><Link to={`/orders/${id}`}>{title}</Link></h2>
        <p className="text-primary-500">{category.name}</p>
        <div className="flex items-center justify-between mt-2">
          {/* Product Price */}
          <span>{price} L.E</span>
          {/* Ratings */}
          <span className="flex items-center">
            {ratingsAverage}
            <i className="fa-solid fa-star fa-beat text-yellow-400 ml-1"></i>
          </span>
        </div>
      </div>
    </div>
    </>
  );
}
