'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.scss';

import { LatestNewsCard } from './LatestNewsCard';
import { Post } from '../../_types/post';

// import required modules
import { Pagination } from 'swiper/modules';

interface LatestNewsCarouselProps {
    posts: Post[];
}

export function LatestNewsCarousel({ posts = [] }: LatestNewsCarouselProps) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet'
            }}
            centerInsufficientSlides={true}
            modules={[Pagination]}
            className="SwiperComponent"
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {posts.map((post: Post) => (
                <SwiperSlide key={post.slug}>
                    <LatestNewsCard post={post} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
