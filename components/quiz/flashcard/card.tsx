"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { FlashCardQuestion } from "../types";

interface FlashCardProps {
  data: FlashCardQuestion;
  isFlipped: boolean;
  onFlip: () => void;
  onAnswer: (status: "mastered" | "need-review") => void;
}

export function FlashCard({ data, isFlipped, onFlip, onAnswer }: FlashCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      onFlip();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleAnswer = (status: "mastered" | "need-review") => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      onAnswer(status);
    };
  };

  return (
    <div className="flashcard-container" style={{ perspective: "1000px" }}>
      <motion.div
        className={cn(
          "flashcard relative w-full h-80 cursor-pointer select-none"
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleFlip}
        style={{ transformStyle: "preserve-3d" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleFlip();
          }
        }}
        aria-label="闪卡，按空格键翻转"
      >
        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            "bg-gradient-to-br from-blue-50 to-indigo-50",
            "dark:from-blue-950 dark:to-indigo-950",
            "rounded-xl p-8 flex flex-col items-center justify-center"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {data.category && (
            <span className="text-sm text-muted-foreground mb-4">{data.category}</span>
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{data.front}</ReactMarkdown>
          </div>
          <p className="text-sm text-muted-foreground mt-6">👆 点击卡片查看答案</p>
        </div>

        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            "bg-gradient-to-br from-green-50 to-emerald-50",
            "dark:from-green-950 dark:to-emerald-950",
            "rounded-xl p-8 flex flex-col rotate-y-180"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          aria-label="闪卡背面"
        >
          <div className="flex-1 overflow-auto">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{data.back}</ReactMarkdown>
            </div>
          </div>

          <AnimatePresence>
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex gap-3 mt-6"
              >
                <button
                  onClick={handleAnswer("mastered")}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✓ 掌握了
                </button>
                <button
                  onClick={handleAnswer("need-review")}
                  className="flex-1 py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  需复习
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
