"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import Image from "next/image";
import img1 from "../components/img/1.png";
import img2 from "../components/img/2.png";
import img3 from "../components/img/3.png";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";

const team = [
  {
    name: "Aditya Meshram",
    role: "Regional CEO, MMR",
    group: img1,
  },
  {
    name: "Priya Sharma",
    role: "VP, Operations",
    group: img2,
  },
  {
    name: "Rahul Verma",
    role: "Head of Product",
    group: img3,
  },
  {
    name: "Rahul Verma",
    role: "Head of Product",
    group: img3,
  },
  {
    name: "Rahul Verma",
    role: "Head of Product",
    group: img3,
  },
  {
    name: "Rahul Verma",
    role: "Head of Product",
    group: img3,
  },
];

export default function TeamSliderClient() {
  // Odometer counter
  const odometerRef = useRef(null);
  useEffect(() => {
    const root = odometerRef.current;
    if (!root) return;

    const DIGIT_HEIGHT = 50; // must match CSS
    const DIGITS = 5;

    // Populate digit strips with 0-9
    const stripHTML = Array.from(
      { length: 10 },
      (_, i) => `<div class="digit">${i}</div>`
    ).join("");
    const strips = root.querySelectorAll(".digit-strip");
    strips.forEach((strip) => (strip.innerHTML = stripHTML));

    let count = 0;
    const update = () => {
      const str = String(count).padStart(DIGITS, "0");
      str.split("").forEach((d, i) => {
        const y = parseInt(d, 10) * DIGIT_HEIGHT;
        strips[i].style.transform = `translateY(-${y}px)`;
      });
      count = (count + 1) % Math.pow(10, DIGITS);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* Slider container */}
      <div className="bg-white relative dark:bg-neutral-950">
        <div className="border border-neutral-200/80 dark:border-neutral-800 rounded-xl h-[470px] w-[500px] absolute -bottom-[1px] left-[50px]">
          <div className="bg-[#5fd02e] h-full w-full absolute bottom-0 left-0 p-[20px] z-auto"></div>
          <div className="bg-amber-200 absolute bottom-0 left-0 p-[20px] w-full z-10">
            <p>Munna shukla</p>
            <p>UI Designer</p>
          </div>
        </div>
        <Swiper
          className="team-swiper"
          modules={[Navigation, Keyboard, A11y]}
          slidesPerView={4}
          spaceBetween={0}
          loop={true}
          speed={650}
          grabCursor={true}
          keyboard={{ enabled: true }}
          navigation
          pagination={{ clickable: true }}
        >
          {team.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="slide-card h-[600px] overflow-hidden flex items-center justify-center align-center">
                <Image
                  src={item.group}
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Odometer Counter */}
        <div className="mt-10 flex justify-center">
          <div ref={odometerRef} className="odometer">
            <div className="digit-container">
              <div className="digit-strip"></div>
            </div>
            <div className="digit-container">
              <div className="digit-strip"></div>
            </div>
            <div className="digit-container">
              <div className="digit-strip"></div>
            </div>
            <div className="digit-container">
              <div className="digit-strip"></div>
            </div>
            <div className="digit-container">
              <div className="digit-strip"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
