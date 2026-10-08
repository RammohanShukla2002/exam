import React from 'react';
import { GraduationCap, ShieldCheck, Clock, Award, BookCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Exam<span className="text-blue-400">Pulse</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standardized online testing platform built for high-stakes assessments, practice quizzes, and immediate analytical reporting.
            </p>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Synchronized Countdown Timers</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Auto-submission Protection</span>
              </li>
              <li className="flex items-center gap-2">
                <BookCheck className="w-4 h-4 text-blue-400" />
                <span>Review & Flagging Matrix</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Instant Score Analytics</span>
              </li>
            </ul>
          </div>

          {/* Exam Domains */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Available Domains
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              <span>General Knowledge</span>
              <span>Mathematics</span>
              <span>Science</span>
              <span>English Verbal</span>
              <span>Computer Basics</span>
              <span>Logical Reasoning</span>
            </div>
          </div>

          {/* System Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Environment
            </h4>
            <p className="text-xs text-slate-400 mb-2">
              All user accounts, progress sessions, and exam evaluation metrics are securely managed locally using client-side persistent storage.
            </p>
            <div className="text-xs text-slate-500 border-t border-slate-800 pt-3">
              Passing Benchmark: 40% (Minimum Grade standard)
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ExamPulse Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Client-side SPA</span>
            <span>·</span>
            <span>Zero Server Latency</span>
            <span>·</span>
            <span>Instant MCQ Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
