import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/examsData';
import { Timer } from '../components/Timer';
import { QuestionView } from '../components/QuestionView';
import { QuestionPalette } from '../components/QuestionPalette';
import { SubmitConfirmModal } from '../components/SubmitConfirmModal';
import { saveExamResult } from '../utils/storage';
import { ExamResult } from '../types';
import {
  Clock,
  HelpCircle,
  Award,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Flame,
  FileText
} from 'lucide-react';

export const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const exam = SAMPLE_EXAMS.find((e) => e.id === examId);

  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSubmittedDueToTime, setAutoSubmittedDueToTime] = useState(false);

  const startTimeRef = useRef<number>(0);

  // If exam doesn't exist, redirect to dashboard
  useEffect(() => {
    if (!exam) {
      navigate('/dashboard', { replace: true });
    }
  }, [exam, navigate]);

  // Handle start
  const handleBeginExam = () => {
    startTimeRef.current = Date.now();
    // Initialize answers
    const initialAnswers: Record<number, number | null> = {};
    const initialMarked: Record<number, boolean> = {};
    if (exam) {
      exam.questions.forEach((_, idx) => {
        initialAnswers[idx] = null;
        initialMarked[idx] = false;
      });
    }
    setAnswers(initialAnswers);
    setMarkedForReview(initialMarked);
    setHasStarted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Option selection
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Clear option
  const handleClearOption = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: null
    }));
  };

  // Toggle mark for review
  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (exam && currentIndex < exam.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelectQuestionFromPalette = (index: number) => {
    setCurrentIndex(index);
  };

  // Core Submission logic (used for both manual submit and automatic timer expiry)
  const processFinalSubmission = useCallback(
    (isAutoSubmit = false) => {
      if (!exam || !user || isSubmitting) return;

      setIsSubmitting(true);
      const totalTimeSpentSeconds = Math.max(
        1,
        Math.floor((Date.now() - (startTimeRef.current || Date.now())) / 1000)
      );

      let correctCount = 0;
      let wrongCount = 0;
      let unansweredCount = 0;

      const detailedAnswers = exam.questions.map((q, idx) => {
        const userAnswer = answers[idx] ?? null;
        const isAnswered = userAnswer !== null && userAnswer !== undefined;
        const isCorrect = isAnswered && userAnswer === q.correctAnswer;

        if (!isAnswered) {
          unansweredCount++;
        } else if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }

        return {
          questionId: q.id,
          questionText: q.question,
          options: q.options,
          userAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation
        };
      });

      const totalQuestions = exam.questions.length;
      const score = correctCount;
      const percentage = Math.round((score / totalQuestions) * 100);
      const passed = percentage >= exam.passingScorePercent;

      const resultRecord: ExamResult = {
        id: 'result-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
        userId: user.id,
        examId: exam.id,
        examTitle: exam.title,
        examSubject: exam.subject,
        score,
        totalQuestions,
        correctAnswersCount: correctCount,
        wrongAnswersCount: wrongCount,
        unansweredCount,
        percentage,
        passed,
        timeSpentSeconds: totalTimeSpentSeconds,
        completedAt: new Date().toISOString(),
        answers: detailedAnswers
      };

      saveExamResult(resultRecord);

      // Navigate to result page
      navigate(`/result/${resultRecord.id}`, {
        state: { autoSubmitted: isAutoSubmit },
        replace: true
      });
    },
    [exam, user, isSubmitting, answers, navigate]
  );

  // Auto submit on time out
  const handleTimeUp = useCallback(() => {
    setAutoSubmittedDueToTime(true);
    setIsConfirmModalOpen(false);
    processFinalSubmission(true);
  }, [processFinalSubmission]);

  if (!exam) return null;

  // Counts for modal and palette
  let answeredCount = 0;
  let markedCount = 0;
  exam.questions.forEach((_, idx) => {
    if (answers[idx] !== null && answers[idx] !== undefined) answeredCount++;
    if (markedForReview[idx]) markedCount++;
  });
  const unansweredCount = exam.questions.length - answeredCount;

  // -------------------------------------------------------------
  // SCREEN 1: PRE-EXAM INSTRUCTIONS SCREEN
  // -------------------------------------------------------------
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                {exam.subject} Examination
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{exam.title}</h1>
              <p className="text-blue-100 text-sm mt-2 leading-relaxed">{exam.description}</p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-100 text-center">
              <div>
                <p className="text-xs text-slate-500 font-medium">Questions</p>
                <p className="text-lg font-bold text-slate-900">{exam.totalQuestions} MCQs</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Duration</p>
                <p className="text-lg font-bold text-slate-900">{exam.durationMinutes} Minutes</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Pass Mark</p>
                <p className="text-lg font-bold text-emerald-600">{exam.passingScorePercent}% (4 / 10)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Marking Scheme</p>
                <p className="text-lg font-bold text-blue-600">+1 / 0 Marks</p>
              </div>
            </div>

            {/* Detailed Instructions */}
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Instructions & Examination Guidelines</span>
              </h3>

              <div className="space-y-3.5 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <p>
                    <strong>One Question per Screen:</strong> The examination presents one question at a time with 4 choices. Select the single best answer.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <p>
                    <strong>Automated Countdown Timer:</strong> A countdown clock is displayed at the top. When the timer reaches zero, the examination will <strong>automatically submit</strong> and evaluate your responses immediately.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <p>
                    <strong>Question Palette & Review:</strong> You can jump to any question using the navigator panel. Use the <em>"Mark for Review"</em> flag to bookmark questions you wish to revisit before final submission.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <p>
                    <strong>Scoring & Results:</strong> Each correct response awards 1 mark. There is no negative marking for incorrect or unanswered questions. Upon submission, an instant analytical scorecard with question explanations is provided.
                  </p>
                </div>
              </div>

              {/* Integrity advice */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Proctored Environment Simulation:</strong> Maintain focus on this window. Once started, the timer cannot be paused. Ensure you have a stable device before proceeding.
                </div>
              </div>

              {/* Begin Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <Link
                  to="/dashboard"
                  className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel & Exit
                </Link>
                <button
                  type="button"
                  onClick={handleBeginExam}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Begin Examination</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 2: ACTIVE EXAMINATION SCREEN
  // -------------------------------------------------------------
  const currentQuestion = exam.questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Sticky Exam Top Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
              MCQ
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 line-clamp-1">{exam.title}</h2>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Candidate: {user?.fullName} ({user?.email})
              </p>
            </div>
          </div>

          {/* Right: Timer & Submit trigger */}
          <div className="flex items-center gap-3">
            <Timer
              initialSeconds={exam.durationMinutes * 60}
              onTimeUp={handleTimeUp}
              isPaused={isSubmitting}
            />

            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-xs transition-all disabled:opacity-50 whitespace-nowrap"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Active Question Card (8 cols) */}
          <div className="lg:col-span-8">
            <QuestionView
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={exam.questions.length}
              selectedOption={answers[currentIndex] ?? null}
              isMarkedForReview={!!markedForReview[currentIndex]}
              onSelectOption={handleSelectOption}
              onClearOption={handleClearOption}
              onToggleMarkForReview={handleToggleMarkForReview}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmitPrompt={() => setIsConfirmModalOpen(true)}
            />
          </div>

          {/* Right: Palette & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <QuestionPalette
              totalQuestions={exam.questions.length}
              currentIndex={currentIndex}
              answers={answers}
              markedForReview={markedForReview}
              onSelectQuestion={handleSelectQuestionFromPalette}
            />

            {/* Quick Helper Box */}
            <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 text-xs text-blue-900">
              <p className="font-semibold mb-1">Navigation Tip:</p>
              <p className="text-blue-800/90 leading-relaxed">
                Click any number in the Question Navigator above to jump directly to that question. You can change your selected answer anytime before submitting.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      <SubmitConfirmModal
        isOpen={isConfirmModalOpen}
        totalQuestions={exam.questions.length}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        markedCount={markedCount}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => {
          setIsConfirmModalOpen(false);
          processFinalSubmission(false);
        }}
      />
    </div>
  );
};
