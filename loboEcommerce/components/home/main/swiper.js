import styles from "./styles.module.scss";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.scss';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {[...Array(3).keys()].map((i, k) => (//numero de imagens que possui
          <SwiperSlide key={k}>
            <img key={k} src={`../../../images/swiper/${i + 1}.png`} alt="" />
          </SwiperSlide>
        ))}
           {/* <SwiperSlide><img src={`../../../images/swiper/1.jpg`} alt="" /></SwiperSlide>
          <SwiperSlide>img src={`../../../images/swiper/2.jpg`} alt=""</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
           <SwiperSlide>Slide 4</SwiperSlide>
           <SwiperSlide>Slide 5</SwiperSlide>
           <SwiperSlide>Slide 6</SwiperSlide>
           <SwiperSlide>Slide 7</SwiperSlide>
           <SwiperSlide>Slide 8</SwiperSlide>
           <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
