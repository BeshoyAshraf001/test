 import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { cartContext } from "../../components/Context/cart.context";
import ImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loading from "../../components/Loading/Loading";
import ProductCart from "../../components/ProductCart/ProductCart";
import { Helmet } from 'react-helmet';

const useProductDetails = (id) => {
  const [productDet, setProductDet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`
        );
        setProductDet(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductDetails();
  }, [id]);

  return { productDet, error };
};

const useRelatedProducts = (categoryId) => {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
        );
        setRelatedProducts(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRelatedProducts();
  }, [categoryId]);

  return { relatedProducts, error };
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const { productDet, error: productError } = useProductDetails(id);
  const { relatedProducts, error: relatedError } = useRelatedProducts(
    productDet?.category._id
  );

  if (productError || relatedError) {
    return <div>Error: {productError || relatedError}</div>;
  }

  if (!productDet) return <Loading />;

  return (
    <>
  <Helmet>
    <title>{productDet.title}</title>
    <meta name="description" content={productDet.description} />
  </Helmet>
      <section className="grid grid-cols-12 gap-6 p-4 bg-white shadow-lg rounded-lg">
        {/* Image Section */}
        <div className="col-span-12 md:col-span-4">
          <ImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            items={productDet.images.map((image) => ({
              original: image,
              thumbnail: image,
            }))}
          />
        </div>

        {/* Product Details Section */}
        <div className="col-span-12 md:col-span-8">
          <header className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {productDet.title}
            </h2>
            <h3 className="text-lg font-medium text-gray-600">
              {productDet.category.name}
            </h3>
          </header>
          <p className="text-gray-700 leading-relaxed mb-4">
            {productDet.description}
          </p>
          <footer className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-gray-900">
              ${productDet.price}
            </h4>
            <div className="flex items-center text-yellow-500">
              <span>4.5</span>
              <i className="fas fa-star ml-2"></i>
            </div>
          </footer>
          <button
            className="btn-primary mt-3 w-full"
            onClick={() => addProductToCart({ productId: id })}
          >
            Add to Cart
          </button>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Related Products
        </h2>
        {relatedProducts ? (
          <Swiper
            slidesPerView={6}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
          >
            {relatedProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCart productInfo={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
}
