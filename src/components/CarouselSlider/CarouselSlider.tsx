import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css';
import SwiperCore from "swiper/core";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { EffectCoverflow } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import '../CarouselSlider/styles.css'; // Add your custom styles here

// Install Swiper components
SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

const CarouselSlider: React.FC = () => {
  const imageSrc =
    "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg";

    /*
inspiration
https://dribbble.com/shots/4684682-Aquatic-Animals
*/
  

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      keyboard={true}
      mousewheel={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      breakpoints={{
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 3
        },
        1560: {
          slidesPerView: 5
        }
      }}
    >
      {/* Add your slides here */}
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 1" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 2" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 3" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 3" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 3" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 3" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="slide">
          <img src={imageSrc} alt="Slide 3" />
        </div>
      </SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default CarouselSlider;
