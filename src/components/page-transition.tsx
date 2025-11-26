"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ y: 10, opacity: 0.25 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.32,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
