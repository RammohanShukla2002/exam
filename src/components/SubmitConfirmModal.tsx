import React from 'react';
import { AlertCircle, CheckCircle, HelpCircle, Bookmark, X } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  markedCount,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Submit Examination?</h3>
              <p className="text-xs text-slate-500">Please review your submission summary</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body & Summary stats */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Total Questions</p>
              <p className="text-xl font-bold text-slate-800">{totalQuestions}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-emerald-700 font-medium">Answered</p>
              <p className="text-xl font-bold text-emerald-700">{answeredCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
              <p className="text-xs text-rose-700 font-medium">Unanswered</p>
              <p className="text-xl font-bold text-rose-700">{unansweredCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-700 font-medium">Marked for Review</p>
              <p className="text-xl font-bold text-amber-700">{markedCount}</p>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                You still have <strong>{unansweredCount} unanswered</strong>{' '}
                {unansweredCount === 1 ? 'question' : 'questions'}. Unanswered questions will receive
                zero marks upon final submission.
              </p>
            </div>
          )}

          <p className="text-xs text-slate-500 text-center">
            Once submitted, your answers will be finalized and evaluated instantly.
          </p>
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            Return to Exam
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-colors"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};
