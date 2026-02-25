export enum QuestionType {
  MULTIPLE_CHOICE = "multiple-choice",
  FLASHCARD = "flashcard",
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  explanation?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  correctAnswer: string;
}

export interface FlashCardQuestion extends BaseQuestion {
  type: QuestionType.FLASHCARD;
  front: string;
  back: string;
  category?: string;
  difficulty?: 1 | 2 | 3;
}

export type Question = MultipleChoiceQuestion | FlashCardQuestion;

export interface QuizProps {
  questions: Question[];
  showProgress?: boolean;
  allowSkip?: boolean;
}

export interface QuizResults {
  multipleChoice: {
    total: number;
    correct: number;
    score: number;
    answers: Array<{
      question: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
    }>;
  };
  flashcards: {
    total: number;
    mastered: number;
    needReview: number;
    cards: Array<{
      question: string;
      status: "mastered" | "need-review" | "skipped";
    }>;
  };
}
