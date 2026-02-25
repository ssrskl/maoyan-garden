import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

interface MultipleChoiceSummaryProps {
  total: number;
  correct: number;
  score: number;
  answers: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
  explanations?: Record<string, string>;
}

export function MultipleChoiceSummary({
  total,
  correct,
  score,
  answers,
  explanations,
}: MultipleChoiceSummaryProps) {
  const getScoreMessage = () => {
    if (score === 100) return { message: "完美！知识小天才！", emoji: "🏆" };
    if (score >= 80) return { message: "太棒了！你真是个知识小能手！", emoji: "⭐" };
    if (score >= 60) return { message: "不错哦，继续努力！", emoji: "🚀" };
    return { message: "加油！再来一次，你会更棒！", emoji: "💪" };
  };

  const { message, emoji } = getScoreMessage();

  if (total === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">{emoji}</div>
        <div className="text-2xl font-bold">{message}</div>
        <div className="text-4xl font-bold mt-2">
          {correct} / {total}
        </div>
        <div className="text-muted-foreground">正确率 {score.toFixed(0)}%</div>
      </div>

      <div className="space-y-4">
        {answers.map((answer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border rounded-lg"
          >
            <p className="font-semibold mb-2">{index + 1}. {answer.question}</p>
            <div className="mt-2 text-sm space-y-1">
              <p>
                你的答案:{" "}
                <span
                  className={cn(
                    "font-bold",
                    answer.isCorrect ? "text-green-600" : "text-red-600"
                  )}
                >
                  {answer.userAnswer}
                </span>
              </p>
              {!answer.isCorrect && (
                <p>
                  正确答案: <span className="font-bold text-green-600">{answer.correctAnswer}</span>
                </p>
              )}
            </div>
            {explanations?.[answer.question] && (
              <div className="mt-3 p-3 bg-muted rounded-md text-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <BrainCircuit className="h-5 w-5 text-blue-500" />
                  解析
                </div>
                <p className="mt-2 text-muted-foreground">{explanations[answer.question]}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
