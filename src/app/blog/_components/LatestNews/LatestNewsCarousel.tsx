// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "./styles.scss";
// import { Post } from "../../_types/post";
// import { LatestNewsCard } from "./LatestNewsCard";

// interface LatestNewsCarouselProps {
//   posts: Post[];
// }

// const swiperConfig = {
//   slidesPerView: 1,
//   spaceBetween: 20,
//   pagination: { clickable: true, bulletClass: "swiper-pagination-bullet" },
//   centerInsufficientSlides: true,
//   modules: [Pagination],
//   className: "SwiperComponent",
//   breakpoints: {
//     640: { slidesPerView: 2 },
//     1024: { slidesPerView: 3 },
//   },
// };

// export function LatestNewsCarousel({ posts = [] }: LatestNewsCarouselProps) {
//   if (posts.length === 0) return null;

//   return (
//     <Swiper {...swiperConfig}>
//       {posts.map((post) => (
//         <SwiperSlide key={post.slug}>
//           <LatestNewsCard post={post} />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }
