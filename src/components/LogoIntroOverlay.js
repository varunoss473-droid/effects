"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function LogoIntroOverlay({
  logoSrc = "/Xanadu_New_Logo-3.svg",
  onDone,
}) {
  const [show, setShow] = useState(true);
  const [startScale, setStartScale] = useState(100); // fallback
  const DURATION = 5.5;
  const [completed, setCompleted] = useState(false);

  // Completion is now handled by onAnimationComplete of the scaling motion div
  // Fallback: ensure overlay hides even if animation doesn't report completion
  useEffect(() => {
    if (completed) return;
    const t = setTimeout(() => {
      if (completed) return;
      onDone?.();
      requestAnimationFrame(() => setShow(false));
    }, Math.round(DURATION * 1000) + 850); // include ~0.8s overlay fade
    return () => clearTimeout(t);
  }, [completed, onDone]);

  // Measure viewport to pick a scale that guarantees the logo starts fully off-screen
  useLayoutEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Match the header logo size for a seamless handoff
    const logoW = 110;
    const logoH = 28;
    // scale so the logo starts well beyond the edges (higher factor = more zoom-in)
    const scaleX = (vw / logoW) * 4.0;
    const scaleY = (vh / logoH) * 4.0;
    const s = Math.max(scaleX, scaleY);
    setStartScale(s);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Dimming backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 dark:bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 1, backdropFilter: "blur(6px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{
              opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
              backdropFilter: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center transform-gpu">
            <motion.div
              layoutId="site-logo"
              className="relative z-10 will-change-transform"
              initial={{ scale: startScale }}
              animate={{ scale: 2.5 }}
              transition={{
                // Softer, smoother scale spring
                scale: {
                  type: "spring",
                  stiffness: 80,
                  damping: 32,
                  mass: 1.1,
                },
                // Gentle shared element move to header
                layout: {
                  type: "spring",
                  stiffness: 110,
                  damping: 32,
                  mass: 1.1,
                },
              }}
              onAnimationComplete={() => {
                if (completed) return;
                setCompleted(true);
                onDone?.();
                // slight delay to ensure presence swap registration
                requestAnimationFrame(() => setShow(false));
              }}
            >
              <Image
                src={logoSrc}
                alt="Logo"
                width={110}
                height={28}
                priority
                style={{ display: "block" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
