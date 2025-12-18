"use client";

import { motion } from "framer-motion";

export function WaveDivider() {
  const clipPathVariants = {
    hidden: {
      clipPath: "inset(100% 0 0 0)",
    },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // Easing suave que simula fluido
      },
    },
  };

  return (
    <motion.div
      className="relative h-24 w-full overflow-hidden"
      variants={clipPathVariants}
      initial="hidden"
      animate="visible"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full transition-colors duration-500 ease-in-out"
        style={{ fill: "var(--wave-divider)" }}
      >
        <path d="M0,100 C240,20 480,20 720,60 C960,100 1200,100 1440,60 L1440,100 L0,100 Z" />
      </svg>
    </motion.div>
  );
}

