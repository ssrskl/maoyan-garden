"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-muted rounded-full h-2 mt-2">
      <motion.div
        className="bg-primary h-2 rounded-full"
        initial={{ width: `${((current - 1) / total) * 100}%` }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.div
          className="h-full bg-white/30"
          animate={{ scaleX: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
