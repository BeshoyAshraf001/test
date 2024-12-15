import React from "react";
import Image1 from "../../assets/images/slider-image-1.jpeg";
import Image2 from "../../assets/images/slider-image-2.jpeg";
import Image3 from "../../assets/images/slider-image-3.jpeg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-8">
          <Swiper loop={true} style={{ width: "100%", height: "100%" }}>
            <SwiperSlide>
              <picture classNames="block">
                <img
                  src={Image3}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </picture>
            </SwiperSlide>

            <SwiperSlide>
              <picture classNames="block">
                <img
                  src={Image3}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </picture>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <picture classNames="block">
            <img src={Image1} alt="" className="w-full object-cover" />
          </picture>
          <picture classNames="block">
            <img src={Image2} alt="" className="w-full object-cover" />
          </picture>
        </div>
      </div>
    </>
  );
}
