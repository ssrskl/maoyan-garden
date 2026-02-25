"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Question, QuestionType, QuizProps, QuizResults } from "./types";
import { MultipleChoice } from "./multiple-choice";
import { FlashCardQuestionComponent } from "./flashcard";
import { QuizResultsComponent } from "./results";
import { ProgressBar } from "./progress-bar";
import { normalizeQuestion } from "./utils";

export function Quiz({ questions: rawQuestions, showProgress = true, allowSkip = false }: QuizProps) {
  const questions = rawQuestions.map((q) => normalizeQuestion(q));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);

  const currentQuestion = questions[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setShowResults(false);
    setResults(null);
  }, []);

  const handleMultipleChoiceResult = useCallback(
    (result: { userAnswer: string; isCorrect: boolean }) => {
      setResults((prev) => {
        const existing = prev?.multipleChoice || {
          total: 0,
          correct: 0,
          score: 0,
          answers: [],
        };

        const newAnswers = [
          ...existing.answers,
          {
            question: currentQuestion.question,
            userAnswer: result.userAnswer,
            correctAnswer:
              currentQuestion.type === QuestionType.MULTIPLE_CHOICE
                ? currentQuestion.correctAnswer
                : "",
            isCorrect: result.isCorrect,
          },
        ];

        const newCorrect = existing.correct + (result.isCorrect ? 1 : 0);
        const newTotal = existing.total + 1;

        return {
          ...prev,
          multipleChoice: {
            total: newTotal,
            correct: newCorrect,
            score: (newCorrect / newTotal) * 100,
            answers: newAnswers,
          },
        } as QuizResults;
      });
    },
    [currentQuestion]
  );

  const handleFlashCardResult = useCallback(
    (result: { status: "mastered" | "need-review" | "skipped" }) => {
      setResults((prev) => {
        const existing = prev?.flashcards || {
          total: 0,
          mastered: 0,
          needReview: 0,
          cards: [],
        };

        const newCards = [
          ...existing.cards,
          {
            question: currentQuestion.question,
            status: result.status,
          },
        ];

        const newMastered = existing.mastered + (result.status === "mastered" ? 1 : 0);
        const newNeedReview = existing.needReview + (result.status === "need-review" ? 1 : 0);
        const newTotal = existing.total + 1;

        return {
          ...prev,
          flashcards: {
            total: newTotal,
            mastered: newMastered,
            needReview: newNeedReview,
            cards: newCards,
          },
        } as QuizResults;
      });
    },
    [currentQuestion]
  );

  if (showResults && results) {
    return <QuizResultsComponent results={results} onRestart={handleRestart} />;
  }

  return (
    <Card className="w-full mt-10 shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">测验</CardTitle>
          {showProgress && (
            <Badge variant="secondary">
              {currentIndex + 1} / {questions.length}
            </Badge>
          )}
        </div>
        {showProgress && <ProgressBar current={currentIndex + 1} total={questions.length} />}
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentQuestion.type === QuestionType.MULTIPLE_CHOICE ? (
              <MultipleChoice
                question={currentQuestion}
                onNext={handleNext}
                onUpdateResults={handleMultipleChoiceResult}
              />
            ) : (
              <FlashCardQuestionComponent
                question={currentQuestion}
                onNext={handleNext}
                onUpdateResults={handleFlashCardResult}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
