export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3 corresponding to option index
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  description: string;
  iconName: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScorePercent: number; // usually 40%
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
}

export interface UserAnswerRecord {
  questionId: number;
  selectedOption: number | null; // null if unanswered
  isMarkedForReview: boolean;
}

export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  examSubject: string;
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  unansweredCount: number;
  percentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  answers: {
    questionId: number;
    questionText: string;
    options: string[];
    userAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}
