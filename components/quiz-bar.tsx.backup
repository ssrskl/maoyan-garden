// components/Quiz.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, X, Award, BrainCircuit, Sparkles, Star, Rocket } from "lucide-react";

// 定义题目数据结构
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
}

export function QuizBar({ questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const score = userAnswers.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setUserAnswers([...userAnswers, selectedAnswer]);
    }

    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleConfirmAnswer = () => {
    if (selectedAnswer) {
        setIsAnswered(true);
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowResults(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { message: "完美！知识小天才！", icon: <Award className="h-6 w-6 text-yellow-500" /> };
    if (percentage >= 80) return { message: "太棒了！你真是个知识小能手！", icon: <Star className="h-6 w-6 text-blue-500" /> };
    if (percentage >= 60) return { message: "不错哦，继续努力！", icon: <Rocket className="h-6 w-6 text-green-500" /> };
    return { message: "加油！再来一次，你会更棒！", icon: <Sparkles className="h-6 w-6 text-purple-500" /> };
  };

  if (showResults) {
    const { message, icon } = getScoreMessage();
    return (
      <Card className="w-full mt-10 shadow-lg">
        <CardHeader className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex justify-center items-center gap-2">
            {icon}
            <CardTitle className="text-2xl font-bold">{message}</CardTitle>
          </motion.div>
          <p className="text-4xl font-bold">{score} / {questions.length}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border rounded-lg"
              >
                <p className="font-semibold">{index + 1}. {question.question}</p>
                <div className="mt-2 text-sm">
                  <p>你的答案: <span className={cn("font-bold", userAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600")}>{userAnswers[index]}</span></p>
                  <p>正确答案: <span className="font-bold text-green-600">{question.correctAnswer}</span></p>
                </div>
                <div className="mt-3 p-3 bg-muted rounded-md text-sm">
                    <div className="flex items-center gap-2 font-semibold">
                        <BrainCircuit className="h-5 w-5 text-blue-500"/>
                        解析
                    </div>
                    <p className="mt-2 text-muted-foreground">{question.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} className="text-center mt-8">
            <Button onClick={handleRestart}>再试一次</Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mt-10 overflow-hidden shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">小测验</div>
          <Badge variant="secondary">{currentQuestionIndex + 1} / {questions.length}</Badge>
        </div>
         <div className="w-full bg-muted rounded-full h-2 mt-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
             <motion.div 
                className="h-full bg-white/30"
                animate={{ scaleX: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
             />
          </motion.div>
        </div>
      </CardHeader>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <CardContent>
            <p className="text-lg font-semibold mb-6 h-12">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = option === selectedAnswer;

                return (
                  <motion.div
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
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
            </div>
            <div className="mt-6 flex justify-end">
                {isAnswered ? (
                    <Button onClick={handleNext}>
                        {currentQuestionIndex < questions.length - 1 ? "下一题" : "查看结果"}
                    </Button>
                ) : (
                    <Button onClick={handleConfirmAnswer} disabled={!selectedAnswer}>
                        确认答案
                    </Button>
                )}
            </div>
          </CardContent>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}