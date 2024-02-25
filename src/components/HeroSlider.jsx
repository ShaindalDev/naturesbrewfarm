import React from "react";
// swiper react component
import { Swiper, SwiperSlide } from "swiper/react";
// swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
// required modules
import { EffectFade, Autoplay } from "swiper";
import Img1 from "../assets/img/heroSlider/houseWinter.jpg";
import Img2 from "../assets/img/heroSlider/modern.jpg";
import Img3 from "../assets/img/heroSlider/luxuryHouse.jpg";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Your Luxury Get Away For Vacation",
    bg: Img1,
    btnText: "See our venues",
  },
  {
    title: "Your Luxury Get Away For Vacation",
    bg: Img2,
    btnText: "See our venues",
  },
  {
    title: "Your Luxury Get Away For Vacation",
    bg: Img3,
    btnText: "See our venues",
  },
];
const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className='heroSlider h-[600px] lg:h-[860px]'
    >
      {slides.map((slide, index) => {
        //destructure slide
        const { title, bg, btnText } = slide;
        return (
          <SwiperSlide
            className='h-full relative flex justify-center items-center'
            key={index}
          >
            <div className='z-20 text-white text-center'>
              <div className='uppercase font-tertiary tracking-[6px] mb-5'>
                Just Enjoy and relax
              </div>
              <h1 className='text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] lead-tight mb-6'>
                {title}
              </h1>
              <button className='btn btn-lg btn-primary mx-auto'>
                <Link to='/'>{btnText}</Link>
              </button>
            </div>

            <div className='absolute top-0 w-full h-full'>
              <img className='object-cover h-full w-full' src={bg} alt='' />
            </div>
            {/* Overlay */}
            <div className='absolute w-full h-full bg-black/70'></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
