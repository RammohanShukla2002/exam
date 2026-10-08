import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { getExamResultById } from '../utils/storage';
import { ExamResult } from '../types';
import { SAMPLE_EXAMS } from '../data/examsData';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  RotateCcw,
  LayoutDashboard,
  Check,
  X,
  AlertTriangle,
  FileCheck2,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info
} from 'lucide-react';

export const ResultPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState<ExamResult | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');

  const isAutoSubmitted = (location.state as { autoSubmitted?: boolean })?.autoSubmitted;

  useEffect(() => {
    if (resultId) {
      const found = getExamResultById(resultId);
      if (found) {
        setResult(found);

        // Fire celebratory confetti if the user passed!
        if (found.passed) {
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // Ignore if canvas-confetti fails in restricted environments
          }
        }
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [resultId, navigate]);

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <p className="text-sm text-slate-500 font-medium">Loading scorecard details...</p>
      </div>
    );
  }

  // Filter questions
  const filteredQuestions = result.answers.filter((item) => {
    if (filterMode === 'correct') return item.isCorrect;
    if (filterMode === 'wrong') return !item.isCorrect && item.userAnswer !== null;
    if (filterMode === 'unanswered') return item.userAnswer === null;
    return true;
  });

  const minutesSpent = Math.floor(result.timeSpentSeconds / 60);
  const secondsSpent = result.timeSpentSeconds % 60;
  const timeFormatted = `${minutesSpent}m ${secondsSpent}s`;

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen bg-slate-50 py-10 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Auto-submission alert banner if timer ran out */}
        {isAutoSubmitted && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm font-medium">
              Time elapsed! The examination session reached 0:00 and was automatically submitted and scored.
            </p>
          </div>
        )}

        {/* Top Scorecard Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            className={`p-8 text-center text-white relative overflow-hidden ${
              result.passed
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600'
                : 'bg-gradient-to-r from-rose-600 via-rose-700 to-slate-800'
            }`}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold mb-4">
              <span>{result.examSubject} Assessment</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">{result.examTitle}</h1>
            <p className="text-white/80 text-xs sm:text-sm mb-6">
              Completed on{' '}
              {new Date(result.completedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>

            {/* Circular / Large Score Badge */}
            <div className="inline-flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 min-w-[200px] mb-4">
              <span className="text-5xl font-black tracking-tight">{result.percentage}%</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90 mt-1">
                Score: {result.score} / {result.totalQuestions} Marks
              </span>
            </div>

            {/* Pass/Fail Status Banner */}
            <div className="flex items-center justify-center gap-2 mt-2">
              {result.passed ? (
                <div className="inline-flex items-center gap-2 bg-emerald-500/90 text-white px-5 py-2 rounded-full font-bold text-sm shadow-sm border border-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>RESULT: PASSED (Benchmark 40%)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-rose-900/80 text-white px-5 py-2 rounded-full font-bold text-sm shadow-sm border border-rose-400">
                  <XCircle className="w-5 h-5" />
                  <span>RESULT: FAILED (Benchmark 40%)</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Metric Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 bg-slate-50/70 border-t border-slate-100 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-emerald-700">Correct Answers</p>
              <p className="text-2xl font-bold text-emerald-700 mt-0.5">
                {result.correctAnswersCount}
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-rose-700">Wrong Answers</p>
              <p className="text-2xl font-bold text-rose-700 mt-0.5">
                {result.wrongAnswersCount}
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-slate-500">Unanswered</p>
              <p className="text-2xl font-bold text-slate-700 mt-0.5">
                {result.unansweredCount}
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <p className="text-xs font-medium text-blue-700">Time Spent</p>
              <p className="text-2xl font-bold text-blue-700 mt-0.5">{timeFormatted}</p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="p-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Print or Save PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Print Scorecard</span>
              </button>
            </div>

            <button
              onClick={() => navigate(`/exam/${result.examId}`)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Exam</span>
            </button>
          </div>
        </div>

        {/* Section 2: Question-by-Question Review */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                <span>Question Review & Explanations</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review your selections against the correct answer keys with rationales.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filterMode === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({result.totalQuestions})
              </button>
              <button
                onClick={() => setFilterMode('correct')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filterMode === 'correct'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                Correct ({result.correctAnswersCount})
              </button>
              <button
                onClick={() => setFilterMode('wrong')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filterMode === 'wrong'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-600 hover:text-rose-700'
                }`}
              >
                Wrong ({result.wrongAnswersCount})
              </button>
              <button
                onClick={() => setFilterMode('unanswered')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  filterMode === 'unanswered'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Skipped ({result.unansweredCount})
              </button>
            </div>
          </div>

          {/* List of Question Review Cards */}
          <div className="space-y-5">
            {filteredQuestions.map((q, qIndex) => {
              const wasAnswered = q.userAnswer !== null;
              const isCorrect = q.isCorrect;

              return (
                <div
                  key={q.questionId}
                  className={`bg-white rounded-2xl border p-6 transition-all shadow-2xs ${
                    isCorrect
                      ? 'border-emerald-200/80 bg-white'
                      : !wasAnswered
                      ? 'border-slate-200 bg-white'
                      : 'border-rose-200/80 bg-white'
                  }`}
                >
                  {/* Question header badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Question #{qIndex + 1}
                    </span>

                    {/* Status badge */}
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Correct (+1)</span>
                      </span>
                    ) : !wasAnswered ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <span>Not Attempted (0)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <X className="w-3.5 h-3.5" />
                        <span>Incorrect (0)</span>
                      </span>
                    )}
                  </div>

                  {/* Question statement */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-5 leading-snug">
                    {q.questionText}
                  </h3>

                  {/* 4 Options breakdown */}
                  <div className="space-y-2.5 mb-5">
                    {q.options.map((opt, optIndex) => {
                      const isOptionCorrect = optIndex === q.correctAnswer;
                      const isOptionSelected = optIndex === q.userAnswer;

                      let rowClass = 'border-slate-200 bg-slate-50/50 text-slate-700';
                      let badgeIcon = null;

                      if (isOptionCorrect) {
                        rowClass = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                        badgeIcon = (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0 ml-2">
                            <Check className="w-4 h-4" /> Correct Answer
                          </span>
                        );
                      } else if (isOptionSelected && !isCorrect) {
                        rowClass = 'border-rose-400 bg-rose-50/90 text-rose-950 font-medium ring-1 ring-rose-400';
                        badgeIcon = (
                          <span className="text-xs font-bold text-rose-700 flex items-center gap-1 shrink-0 ml-2">
                            <X className="w-4 h-4" /> Your Choice
                          </span>
                        );
                      }

                      return (
                        <div
                          key={optIndex}
                          className={`rounded-xl border p-3.5 flex items-center justify-between text-sm transition-colors ${rowClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                                isOptionCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isOptionSelected && !isCorrect
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-white border border-slate-300 text-slate-600'
                              }`}
                            >
                              {optionLetters[optIndex]}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {badgeIcon}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/90 text-xs sm:text-sm text-blue-900 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Explanation: </strong>
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Retake & Dashboard triggers */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <Link
              to="/dashboard"
              className="text-sm font-bold text-slate-600 hover:text-slate-900"
            >
              ← Return to Candidate Dashboard
            </Link>
            <button
              onClick={() => navigate(`/exam/${result.examId}`)}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
            >
              Retake This Examination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
