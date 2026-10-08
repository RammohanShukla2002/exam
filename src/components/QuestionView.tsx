import React from 'react';
import { Question } from '../types';
import { Bookmark, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface QuestionViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  isMarkedForReview: boolean;
  onSelectOption: (optionIndex: number) => void;
  onClearOption: () => void;
  onToggleMarkForReview: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmitPrompt: () => void;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  isMarkedForReview,
  onSelectOption,
  onClearOption,
  onToggleMarkForReview,
  onPrevious,
  onNext,
  onSubmitPrompt
}) => {
  const optionLetters = ['A', 'B', 'C', 'D'];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
      <div>
        {/* Top bar of question card */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-medium text-slate-400">
              · 1 Mark
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mark for review toggle button */}
            <button
              type="button"
              onClick={onToggleMarkForReview}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                isMarkedForReview
                  ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${
                  isMarkedForReview ? 'fill-amber-600 text-amber-600' : 'text-slate-400'
                }`}
              />
              <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>

            {/* Clear selection button */}
            {selectedOption !== null && (
              <button
                type="button"
                onClick={onClearOption}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded hover:bg-slate-100 transition-colors"
                title="Clear selected option"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-6">
          {question.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <div
                key={idx}
                onClick={() => onSelectOption(idx)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-150 flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                }`}
              >
                {/* Radio button circle with option letter */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {optionLetters[idx]}
                </div>

                {/* Option text */}
                <div className="flex-1 text-sm sm:text-base font-medium text-slate-800 pt-0.5">
                  {option}
                </div>

                {/* Radio input for accessibility */}
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={isSelected}
                  onChange={() => onSelectOption(idx)}
                  className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500 sr-only"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation and Submission Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            isFirstQuestion
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {isLastQuestion ? (
            <button
              type="button"
              onClick={onSubmitPrompt}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow transition-all"
            >
              <span>Submit Exam</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
