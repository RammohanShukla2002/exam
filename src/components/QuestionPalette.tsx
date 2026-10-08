import React from 'react';
import { Bookmark, CheckCircle2, CircleDot, HelpCircle } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, number | null>;
  markedForReview: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  markedForReview,
  onSelectQuestion
}) => {
  const getQuestionStatus = (index: number) => {
    const isCurrent = currentIndex === index;
    const isAnswered = answers[index] !== null && answers[index] !== undefined;
    const isMarked = !!markedForReview[index];

    let baseClass = 'relative flex items-center justify-center font-bold text-sm rounded-xl transition-all duration-150 h-10 w-10 sm:h-11 sm:w-11 ';

    if (isCurrent) {
      baseClass += ' ring-2 ring-blue-600 ring-offset-2 scale-105 z-10 shadow-sm ';
    }

    if (isMarked) {
      if (isAnswered) {
        // Answered and marked for review
        return (
          baseClass +
          ' bg-amber-500 text-white hover:bg-amber-600 border border-amber-600 '
        );
      }
      // Marked but not answered
      return (
        baseClass +
        ' bg-amber-100 text-amber-800 hover:bg-amber-200 border-2 border-dashed border-amber-500 '
      );
    }

    if (isAnswered) {
      return (
        baseClass +
        ' bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs border border-emerald-700 '
      );
    }

    // Unanswered / Visited
    return (
      baseClass +
      ' bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 '
    );
  };

  // Count summaries
  let answeredCount = 0;
  let markedCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    if (answers[i] !== null && answers[i] !== undefined) answeredCount++;
    if (markedForReview[i]) markedCount++;
  }

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <span>Question Navigator</span>
          <span className="text-xs font-normal text-slate-500">
            ({answeredCount}/{totalQuestions} answered)
          </span>
        </h4>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 gap-2.5 mb-6">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isMarked = !!markedForReview[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectQuestion(i)}
              className={getQuestionStatus(i)}
              title={`Question ${i + 1}`}
            >
              <span>{i + 1}</span>
              {isMarked && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white" />
              )}
            </button>
          );
        })}
      </div>

      {/* Status Legend */}
      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 shrink-0" />
            <span>Answered</span>
          </div>
          <span className="font-semibold text-slate-900">{answeredCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-200 shrink-0" />
            <span>Unanswered</span>
          </div>
          <span className="font-semibold text-slate-900">{unansweredCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border border-amber-500 shrink-0" />
            <span>Marked for Review</span>
          </div>
          <span className="font-semibold text-slate-900">{markedCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-white border-2 border-blue-600 shrink-0" />
            <span>Current Question</span>
          </div>
          <span className="font-semibold text-slate-900">{currentIndex + 1}</span>
        </div>
      </div>
    </div>
  );
};
