"use client";

import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import MenuHeader from "@/components/MenuHeader";
import LogoIntroOverlay from "@/components/LogoIntroOverlay";
import TeamSliderClient from "./TeamSliderClient";
import DiagonalScrollSlider from "@/components/DiagonalScrollSlider";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";

export default function ClientShell() {
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);
  const teamItems = [
    {
      title: "Aditya Meshram",
      subtitle: "Regional CEO, MMR",
      image: img1,
      iconSrc: "/globe.svg",
    },
    {
      title: "Priya Sharma",
      subtitle: "VP, Operations",
      image: img2,
      iconSrc: "/file.svg",
    },
    {
      title: "Rahul Verma",
      subtitle: "Head of Product",
      image: img3,
      iconSrc: "/next.svg",
    },
    {
      title: "Rahul Verma",
      subtitle: "Head of Product",
      image: img3,
      iconSrc: "/globe.svg",
    },
    {
      title: "Rahul Verma",
      subtitle: "Head of Product",
      image: img3,
      iconSrc: "/file.svg",
    },
    {
      title: "Rahul Verma",
      subtitle: "Head of Product",
      image: img3,
      iconSrc: "/next.svg",
    },
  ];

  return (
    <LayoutGroup>
      {/* Overlay plays once, then unmounts */}
      {!showHeaderLogo && (
        <LogoIntroOverlay onDone={() => setShowHeaderLogo(true)} />
      )}

      {/* Header with shared logo */}
      <MenuHeader showLogo={showHeaderLogo} />

      {/* Page content */}
      <main className="container mx-auto pt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Our Leadership
        </h1>
        <TeamSliderClient />
      </main>
      {/* Diagonal on-scroll slider demo */}
      <div className="mt-24">
        <DiagonalScrollSlider
          heightVh={260}
          items={teamItems}
          cardWidth={360}
          cardHeight={260}
          gapX={24}
          staggered={true}
          offsetX={384} // cardWidth + gapX to avoid overlap
          offsetY={140}
        />
      </div>
    </LayoutGroup>
  );
}
