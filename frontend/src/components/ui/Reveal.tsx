"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: { 
  children: ReactNode; 
  delay?: number; 
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const directions = {
    up: { y: 30, x: 0 },
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] // Luxury ease out
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = "",
  direction = "up"
}: { 
  children: ReactNode; 
  className?: string;
  direction?: "up" | "none";
}) {
  const yOffset = direction === "up" ? 35 : 0;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: yOffset, scale: 0.97 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
      }}
    >
      {children}
    </motion.div>
  );
}
