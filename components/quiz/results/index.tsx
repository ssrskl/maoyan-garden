import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizResults } from "../types";
import { MultipleChoiceSummary } from "./multiple-choice-summary";
import { FlashCardSummary } from "./flashcard-summary";

interface QuizResultsProps {
  results: QuizResults;
  onRestart: () => void;
}

export function QuizResultsComponent({ results, onRestart }: QuizResultsProps) {
  const hasMultipleChoice = results.multipleChoice.total > 0;
  const hasFlashcards = results.flashcards.total > 0;

  return (
    <Card className="w-full mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">🎉 测验完成！</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {hasMultipleChoice && (
          <div>
            <div className="text-lg font-semibold mb-4">📊 选择题成绩</div>
            <MultipleChoiceSummary
              total={results.multipleChoice.total}
              correct={results.multipleChoice.correct}
              score={results.multipleChoice.score}
              answers={results.multipleChoice.answers}
            />
          </div>
        )}

        {hasFlashcards && (
          <div>
            <div className="text-lg font-semibold mb-4">📚 闪卡学习统计</div>
            <FlashCardSummary
              total={results.flashcards.total}
              mastered={results.flashcards.mastered}
              needReview={results.flashcards.needReview}
              cards={results.flashcards.cards}
            />
          </div>
        )}

        {hasMultipleChoice && hasFlashcards && (
          <div className="border-t pt-6">
            <div className="text-center text-sm text-muted-foreground">
              完成了 {results.multipleChoice.total} 道选择题和 {results.flashcards.total} 张闪卡
            </div>
          </div>
        )}

        <div className="text-center">
          <Button onClick={onRestart}>再试一次</Button>
        </div>
      </CardContent>
    </Card>
  );
}
