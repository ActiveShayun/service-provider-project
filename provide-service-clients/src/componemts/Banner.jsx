import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                <SwiperSlide>
                    <div className='relative h-[300px] lg:w-full lg:h-[550px] bg-slide-3 bg-cover bg-center rounded-md z-50'>
                        <div className='z-40 flex items-center justify-center h-full'>
                            <h2 className='text-3xl font-bold text-white'> Crafting Stunning Websites, Creative Designs,
                                <span className='inline-block lg:block lg:mt-2'>
                                    and Marketing That Converts
                                </span>
                            </h2>

                        </div>
                        <div className='absolute w-full h-full -z-30 opacity-60 top-0 left-0 bg-black rounded-md'></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-[300px] lg:w-full lg:h-[550px] relative  bg-slide-2 bg-cover bg-center rounded-md '>
                        <div className='z-30 absolute flex items-center justify-center h-full w-full'>
                            <h2 className='text-3xl font-bold text-white'>Where Creativity Meets Precision: Graphic Designs That
                                <span className='lg:block text-center lg:mt-2'>
                                    Inspire and Engage Your Audience
                                </span>
                            </h2>
                        </div>
                        <div className='w-full h-full opacity-60 top-0 left-0 bg-black rounded-md z-20 absolute'>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-[300px] lg:w-full lg:h-[550px] bg-slide-1 bg-cover bg-center rounded-md z-50'>
                        <div className='z-40 absolute w-full flex items-center justify-center h-full'>
                            <h3 className='text-3xl font-bold text-white'>Driving Growth and Engagement with Strategic
                                <span className='lg:block lg:mt-2'>
                                    Digital Marketing Solutions
                                </span>
                            </h3>
                        </div>
                        <div className='absolute w-full h-full opacity-60 top-0 left-0 bg-black rounded-md z-30 '></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;