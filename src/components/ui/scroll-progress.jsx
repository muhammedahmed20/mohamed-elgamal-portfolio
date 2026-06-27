"use client";
import { motion, useScroll } from "motion/react";

import { cn } from "@/lib/utils"

export function ScrollProgress({
  className,
  ref,
  ...props
}) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-0.75 origin-left bg-primary",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props} />
  );
}
