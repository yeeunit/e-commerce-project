"use client";

import React, { useCallback, useEffect, useState } from "react";
import sliderData from "./SliderData";
import styles from "./Slider.module.scss";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";

const Slider = () => {
  const [currentSlide, setCurrentSlider] = useState(0);
  const sliderLength = sliderData.length;

  const intervalTime = 5000;

  const nextSlide = useCallback(() => {
    // nextSlide는 current에 1을 더하되, currentSlide는 0,1,2중에 하나이므로, sliderLength의 마지막 인덱스에 도달할경우에는 next를 눌렀을때 다시 0번째 인덱스로 돌아가도록함.
    setCurrentSlider(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  const prevSlide = useCallback(() => {
    setCurrentSlider(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }, [currentSlide, sliderLength]);

  useEffect(() => {
    const interval = setInterval(nextSlide, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <>
      <div className={styles.slider}>
        <AiOutlineArrowLeft
          className={`${styles.arrow} ${styles.prev}`}
          onClick={prevSlide}
        />
        <AiOutlineArrowRight
          className={`${styles.arrow} ${styles.next}`}
          onClick={nextSlide}
        />

        {sliderData.map((slider, index) => {
          const { image, heading } = slider;

          return (
            <div
              key={heading}
              className={
                index === currentSlide
                  ? `${styles.slide} ${styles.current}`
                  : `${styles.slide}`
              }
            >
              {index === currentSlide ? (
                <Image src={image} alt={heading} fill />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
