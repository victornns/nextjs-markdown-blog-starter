"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";

import type { Post } from "../../_types/post";
import { LatestNewsCard } from "./LatestNewsCard";

interface LatestNewsCarouselProps {
  posts: Post[];
}

const SWIPER_CONFIG: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet",
  },
  centerInsufficientSlides: false,
  modules: [Pagination],
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};

export function LatestNewsCarousel({ posts = [] }: LatestNewsCarouselProps) {
  if (posts.length === 0) return null;

  return (
    <Swiper
      {...SWIPER_CONFIG}
      className="SwiperComponent"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.slug}>
          <LatestNewsCard post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
