import React, { useEffect, useState } from "react";
import ProductCart from "../ProductCart/ProductCart";
import axios from "axios";
import Loading from "../Loading/Loading";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Home() {
  {
    //#region  Before React Query
    // const [product, setProduct] = useState(null); // Initialize as null

    // async function getProducts() {
    //   try {
    //     const { data } = await axios.get(
    //       "https://ecommerce.routemisr.com/api/v1/products"
    //     );
    //     setProduct(data.data); // Set the product data
    //   } catch (error) {
    //
    //   }
    // }

    // useEffect(() => {
    //   getProducts();
    // }, []);

    //#endregion}

    const {
      data: product,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["products"],
      queryFn: () =>
        axios
          .get("https://ecommerce.routemisr.com/api/v1/products")
          .then((res) => res.data.data),
      staleTime: 6 * 60 * 60 * 1000,
      refetchOnMount: false,
    });

    if (isError) {
      console.log(error);
    }

    console.log(product);

    return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Home" />
        </Helmet>
        <div className="container ">
          <HomeSlider />
          <CategorySlider />

          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen mx-auto">
              <Loading />
            </div>
          ) : (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
              {product.map((item) => (
                <ProductCart key={item.id} productInfo={item} />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
