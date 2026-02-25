"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultipleChoiceQuestion } from "./types";

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onNext: () => void;
  onUpdateResults: (result: { userAnswer: string; isCorrect: boolean }) => void;
}

export function MultipleChoice({ question, onNext, onUpdateResults }: MultipleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleConfirm = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      setIsAnswered(true);
      onUpdateResults({ userAnswer: selectedAnswer, isCorrect });
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    onNext();
  };

  return (
    <div className="space-y-3">
      <p className="text-lg font-semibold mb-6 h-12">{question.question}</p>

      {question.options.map((option) => {
        const isCorrect = option === question.correctAnswer;
        const isSelected = option === selectedAnswer;

        return (
          <motion.div key={option} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => handleAnswerSelect(option)}
              className={cn(
                "w-full justify-start h-auto py-3 text-left",
                isAnswered && isSelected && !isCorrect && "bg-red-300 text-red-800 hover:bg-red-400",
                isAnswered && isCorrect && "bg-green-300 text-green-800 hover:bg-green-400",
                !isAnswered && isSelected && "bg-primary"
              )}
              variant={isSelected ? "default" : "outline"}
              disabled={isAnswered}
            >
              <div className="flex items-center w-full">
                <span className="flex-1">{option}</span>
                {isAnswered && isCorrect && <Check className="h-5 w-5 text-green-600" />}
                {isAnswered && isSelected && !isCorrect && <X className="h-5 w-5 text-red-600" />}
              </div>
            </Button>
          </motion.div>
        );
      })}

      <div className="mt-6 flex justify-end">
        {isAnswered ? (
          <Button onClick={handleNext}>下一题</Button>
        ) : (
          <Button onClick={handleConfirm} disabled={!selectedAnswer}>
            确认答案
          </Button>
        )}
      </div>
    </div>
  );
}
