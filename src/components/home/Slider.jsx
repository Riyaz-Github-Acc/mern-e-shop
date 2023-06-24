/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import bannerImg1 from "../../assets/images/home/banner-1.jpeg";
import bannerImg2 from "../../assets/images/home/banner-2.jpeg";
import bannerImg3 from "../../assets/images/home/banner-3.jpeg";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  return (
    <div className="relative w-[100%] h-[85vh] center overflow-hidden">
      <div
        className="flex w-[300vw] h-[100%] transition-all duration-300"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img
          src={bannerImg1}
          alt="bannerImg1"
          className="w-[100vw] h-[100%] object-cover object-center md:object-right-top"
        />
        <img
          src={bannerImg2}
          alt="bannerImg2"
          className="w-[100vw] h-[100%] object-cover object-center md:object-right-top"
        />
        <img
          src={bannerImg3}
          alt="bannerImg3"
          className="w-[100vw] h-[100%] object-cover object-center md:object-right-top"
        />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <ArrowBackIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
