import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Exam, ExamResult } from '../types';
import {
  Clock,
  HelpCircle,
  Award,
  ChevronRight,
  Globe,
  Calculator,
  FlaskConical,
  BookOpen,
  Cpu,
  BrainCircuit,
  CheckCircle2
} from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  lastResult?: ExamResult;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, lastResult }) => {
  const navigate = useNavigate();

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-600" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-indigo-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-cyan-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-violet-600" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-blue-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  const getDifficultyBadge = (difficulty: Exam['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Header with Icon & Subject */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
            {getSubjectIcon(exam.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(
                exam.difficulty
              )}`}
            >
              {exam.difficulty}
            </span>
          </div>
        </div>

        {/* Title & Subject */}
        <div className="mb-3">
          <span className="text-xs font-bold text-blue-600 tracking-wide uppercase">
            {exam.subject}
          </span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5 line-clamp-1">
            {exam.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-5">
          {exam.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              <strong className="text-slate-800">{exam.totalQuestions}</strong> Questions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              <strong className="text-slate-800">{exam.durationMinutes}</strong> Minutes
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              Passing: <strong className="text-slate-800">{exam.passingScorePercent}%</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-700">Multiple Choice</span>
          </div>
        </div>

        {/* Previous Attempt Note if available */}
        {lastResult && (
          <div className="mt-3.5 bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Previous Attempt:</span>
            </div>
            <span
              className={`font-semibold ${
                lastResult.passed ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {lastResult.percentage}% ({lastResult.passed ? 'Passed' : 'Failed'})
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="px-6 pb-6 pt-2">
        <button
          onClick={() => navigate(`/exam/${exam.id}`)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs hover:shadow transition-all group-hover:bg-blue-600"
        >
          <span>{lastResult ? 'Retake Exam' : 'Start Exam'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
