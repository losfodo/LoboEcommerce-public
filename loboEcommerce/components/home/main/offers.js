import styles from "./styles.module.scss";
import { offersAarray } from "../../../data/home";//array com os dados do carrousell
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper";
import Link from "next/link";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <div className={styles.offers__text}>
        <p>
          use code <b>“Build”</b> for 30% off all products.
        </p>
        <Link href="/">Shop now</Link>{/*<Link href="/browse">Shop now</Link> */}
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersAarray.map((offer, k) => (
          <SwiperSlide key={k}>
            <Link href="">
              <img src={offer.image} alt="" />
            </Link>
            <span>{offer.price}$</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
