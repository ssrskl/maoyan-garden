import { Question, QuestionType, FlashCardQuestion, MultipleChoiceQuestion } from "./types";

export function detectQuestionType(data: unknown): QuestionType {
  if (typeof data !== "object" || data === null) {
    return QuestionType.MULTIPLE_CHOICE;
  }

  const obj = data as Record<string, unknown>;

  if (obj.type === QuestionType.FLASHCARD) {
    return QuestionType.FLASHCARD;
  }

  if ("options" in obj && "correctAnswer" in obj) {
    return QuestionType.MULTIPLE_CHOICE;
  }

  if ("front" in obj && "back" in obj) {
    return QuestionType.FLASHCARD;
  }

  return QuestionType.MULTIPLE_CHOICE;
}

export function validateFlashCard(data: unknown): data is FlashCardQuestion {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    obj.type === QuestionType.FLASHCARD &&
    typeof obj.front === "string" &&
    typeof obj.back === "string" &&
    obj.front.trim().length > 0 &&
    obj.back.trim().length > 0
  );
}

export function normalizeQuestion(data: unknown): Question {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid question format: not an object");
  }

  const obj = data as Record<string, unknown>;

  if ("type" in obj && typeof obj.type === "string") {
    if (obj.type === QuestionType.FLASHCARD && validateFlashCard(obj)) {
      return obj as unknown as FlashCardQuestion;
    }
    return obj as unknown as Question;
  }

  const detectedType = detectQuestionType(obj);

  if (detectedType === QuestionType.MULTIPLE_CHOICE) {
    return {
      id: `q-${Math.random().toString(36).substr(2, 9)}`,
      type: QuestionType.MULTIPLE_CHOICE,
      question: typeof obj.question === "string" ? obj.question : "",
      options: Array.isArray(obj.options) ? obj.options as string[] : [],
      correctAnswer: typeof obj.correctAnswer === "string" ? obj.correctAnswer : "",
      explanation: typeof obj.explanation === "string" ? obj.explanation : undefined,
    } as MultipleChoiceQuestion;
  }

  if (detectedType === QuestionType.FLASHCARD && validateFlashCard(obj)) {
    return {
      id: `f-${Math.random().toString(36).substr(2, 9)}`,
      type: QuestionType.FLASHCARD,
      question: typeof obj.question === "string" ? obj.question : "",
      front: typeof obj.front === "string" ? obj.front : "",
      back: typeof obj.back === "string" ? obj.back : "",
      category: typeof obj.category === "string" ? obj.category : undefined,
      difficulty: typeof obj.difficulty === "number" ? obj.difficulty as 1 | 2 | 3 : undefined,
    } as FlashCardQuestion;
  }

  throw new Error("Invalid question format");
}
