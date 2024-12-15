import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const swiperSettings = {
    loop: true,
    slidesPerView: 6,
    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 6 },
    },
  };

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get("https://ecommerce.routemisr.com/api/v1/categories")
        .then((res) => res.data.data),
    staleTime: 6 * 60 * 60 * 1000, // 6 hours
    refetchOnMount: false,
  });

  return (
    <div>
      {isError ? (
        <p className="text-red-500 text-center">
          {error?.message || "Failed to load categories. Please try again."}
        </p>
      ) : isLoading ? (
        <Loading />
      ) : (
        <section className="py-8">
          <h2 className="text-xl text-primary-400 text-center mb-4">
            Category Slider Shop
          </h2>
          <Swiper {...swiperSettings}>
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <Link to={`/category/${category._id}`}>
                  <picture>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-72 cursor-pointer"
                      aria-label={category.name}
                    />
                  </picture>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </div>
  );
}
