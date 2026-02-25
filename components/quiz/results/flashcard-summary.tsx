import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FlashCardSummaryProps {
  total: number;
  mastered: number;
  needReview: number;
  cards: Array<{
    question: string;
    status: "mastered" | "need-review" | "skipped";
  }>;
}

export function FlashCardSummary({
  total,
  mastered,
  needReview,
  cards,
}: FlashCardSummaryProps) {
  if (total === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">📚</div>
        <div className="text-2xl font-bold">闪卡学习统计</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 border rounded-lg">
          <div className="text-3xl font-bold">{total}</div>
          <div className="text-sm text-muted-foreground">总计</div>
        </div>
        <div className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-950">
          <div className="text-3xl font-bold text-green-600">{mastered}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> 已掌握
          </div>
        </div>
        <div className="text-center p-4 border rounded-lg bg-orange-50 dark:bg-orange-950">
          <div className="text-3xl font-bold text-orange-600">{needReview}</div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <AlertCircle className="h-4 w-4" /> 需复习
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{card.question}</p>
            </div>
            <div className="text-sm">
              {card.status === "mastered" && (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> 已掌握
                </span>
              )}
              {card.status === "need-review" && (
                <span className="text-orange-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> 需复习
                </span>
              )}
              {card.status === "skipped" && (
                <span className="text-muted-foreground">已跳过</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
