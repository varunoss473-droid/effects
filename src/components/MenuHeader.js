"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const defaultItems = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team-slider" },
  // Add more items as needed
];

export default function MenuHeader({
  items = defaultItems,
  logoSrc = "/Xanadu_New_Logo-3.svg",
  showLogo = true,
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky p-[10px] top-0 z-50 bg-white/80 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200/60 dark:border-neutral-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          {/* Reserve space to avoid layout shift while shared element mounts */}
          <div style={{ width: 120, height: 60 }} className="relative">
            {showLogo && (
              <motion.div
                layoutId="site-logo"
                className="transform-gpu will-change-transform"
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 150,
                    damping: 30,
                    mass: 1,
                  },
                  default: {
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    mass: 1,
                  },
                }}
              >
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={120}
                  height={80}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  priority
                />
              </motion.div>
            )}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200 dark:border-neutral-800"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-800 dark:text-neutral-200"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 flex flex-col gap-3 text-sm">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="py-2 text-neutral-800 dark:text-neutral-200 border-b border-neutral-200/60 dark:border-neutral-800/80"
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
