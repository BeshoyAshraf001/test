import { createContext, useContext, useState } from "react";

import axios from "axios";
import { userContext } from "./userData.Context";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

function CartProvider({ children }) {
  const { token } = useContext(userContext);
  const [product, setProduct] = useState(null);
  async function addProductToCart({ productId }) {
    const loadingToast = toast.loading("Wait a moment please.");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      toast.success("Product added to cart successfully.");
      getProducts();
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function getProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProduct({ productId }) {
    const loadingToast = toast.loading("Wait a moment please.");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.status === "success") {
        toast.success("Product removed from cart successfully.");
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function clearCart() {
    const loadingToast = toast.loading("Wait a moment please.");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.message === "success") {
        setProduct({
          numOfCartItems: 0,
          data: {
            totalPrice: 0,
          },
        });
      }
      toast.success("Cart cleared successfully.");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  async function updateProduct({ productId, count }) {
    const loadingToast = toast.loading("Wait a moment please.");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);
      if (data.status === "success") {
        toast.success("product updated successfully.");
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  }
  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getProducts,
        product,
        removeProduct,
        clearCart,
        updateProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartProvider;
