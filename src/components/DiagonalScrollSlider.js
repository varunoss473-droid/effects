"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

/**
 * DiagonalScrollSlider
 * - Sticky section that tracks scroll progress to move a TRACK diagonally
 *   from bottom-left to top-right. The track contains multiple cards.
 * - Drop this component anywhere in a page to get a diagonal on-scroll motion.
 *
 * Props (optional):
 * - heightVh: number (height of the scroll section in vh). Default: 200
 * - className: string (extra classes for each card)
 * - items: array of card data [{ title, subtitle, iconSrc? }]
 * - cardWidth: px width of each card. Default: 320
 * - cardHeight: px height of each card. Default: 200
 * - gapX: horizontal gap between cards in row layout. Default: 24
 * - staggered: boolean. If true, uses stepped diagonal layout (may overlap if offsets are small). Default: false
 * - offsetX: px horizontal offset between cards when staggered = true. Default: 180
 * - offsetY: px vertical offset between cards when staggered = true (positive moves up). Default: 120
 */
const defaultItems = [
  { title: "Strategy", subtitle: "001", iconSrc: "/file.svg" },
  { title: "Design", subtitle: "002", iconSrc: "/globe.svg" },
  { title: "Engineering", subtitle: "003", iconSrc: "/next.svg" },
  { title: "Research", subtitle: "004", iconSrc: "/file.svg" },
  { title: "Delivery", subtitle: "005", iconSrc: "/globe.svg" },
];

export default function DiagonalScrollSlider({
  heightVh = 200,
  className = "",
  items = defaultItems,
  cardWidth = 320,
  cardHeight = 200,
  gapX = 24,
  staggered = false,
  offsetX = 180,
  offsetY = 120,
}) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // 0 when section enters, 1 when it leaves
  });

  // Measure container and item to compute travel distance
  const [dims, setDims] = useState({ cw: 0, ch: 0, iw: 0, ih: 0 });

  useLayoutEffect(() => {
    const stickyEl = stickyRef.current;
    const itemEl = trackRef.current;
    if (!stickyEl || !itemEl) return;

    const read = () => {
      const cr = stickyEl.getBoundingClientRect();
      const ir = itemEl.getBoundingClientRect();
      setDims({ cw: cr.width, ch: cr.height, iw: ir.width, ih: ir.height });
    };

    read();

    const ro = new ResizeObserver(() => read());
    ro.observe(stickyEl);
    ro.observe(itemEl);
    window.addEventListener("orientationchange", read);
    window.addEventListener("resize", read);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  // Compute a diagonal travel based on container and a single card,
  // so motion is always up-right and visible.
  const endX = Math.max(0, dims.cw - cardWidth);
  const endY = -Math.max(0, dims.ch - cardHeight);

  // Convert progress -> diagonal travel (bottom-left -> top-right)
  const rawX = useTransform(scrollYProgress, [0, 1], [0, endX]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, endY]);

  // Smooth a bit for nicer feel
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.9 });
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.9 });

  // Precompute track dimensions so the cards fit inside (row vs staggered)
  const count = Math.max(1, items.length);
  const spacingX = staggered ? offsetX : cardWidth + gapX; // ensure no overlap in row mode
  const spacingY = staggered ? offsetY : 0;
  const trackW = cardWidth + (count - 1) * spacingX;
  const trackH = cardHeight + Math.max(0, (count - 1) * spacingY);

  return (
    <div className="flex flex-row items-start gap-[50px]">
      <div className="w-[360px] shrink-0 flex flex-col items-center justify-center">
        <h1>Diagonal Scroll Slider</h1>
        <p>
          Scroll to see the diagonal slider in action or click on the cards to
          see the modal
        </p>
      </div>
      <section
        ref={sectionRef}
        className="relative flex-1"
        style={{ height: `${heightVh}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-transparent"
        >
          <motion.div
            ref={trackRef}
            style={{ x, y, width: trackW, height: trackH }}
            className={"absolute bottom-0 left-0 transform-gpu"}
          >
            {items.map((it, idx) => {
              const left = idx * spacingX;
              const top = trackH - cardHeight - idx * spacingY; // row: constant; staggered: step up
              return (
                <div
                  key={`${it.title}-${idx}`}
                  style={{ left, top, width: cardWidth, height: cardHeight }}
                  className={
                    "absolute rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 " +
                    "bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl shadow-2xl p-4 flex flex-col justify-between " +
                    className
                  }
                >
                  <div className="flex flex-col h-full">
                    <div className="relative flex-1 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                      {it.image ? (
                        <Image
                          src={it.image}
                          alt={it.title || "card image"}
                          fill
                          sizes="(max-width: 768px) 90vw, 320px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center text-neutral-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold">{it.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {it.subtitle}
                        </p>
                      </div>
                      {it.iconSrc ? (
                        <Image
                          src={it.iconSrc}
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
