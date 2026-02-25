"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FlashCard } from "./card";
import { FlashCardQuestion } from "../types";

interface FlashCardQuestionProps {
  question: FlashCardQuestion;
  onNext: () => void;
  onUpdateResults: (result: { status: "mastered" | "need-review" | "skipped" }) => void;
}

export function FlashCardQuestionComponent({
  question,
  onNext,
  onUpdateResults,
}: FlashCardQuestionProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleAnswer = (status: "mastered" | "need-review") => {
    setIsFlipped(false);
    onUpdateResults({ status });
    onNext();
  };

  return (
    <div className="space-y-4">
      <FlashCard data={question} isFlipped={isFlipped} onFlip={handleFlip} onAnswer={handleAnswer} />

      {!isFlipped && (
        <div className="flex justify-center">
          <Button onClick={handleFlip}>查看答案</Button>
        </div>
      )}
    </div>
  );
}
