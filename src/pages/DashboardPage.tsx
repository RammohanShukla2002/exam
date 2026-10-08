import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/examsData';
import { ExamCard } from '../components/ExamCard';
import { getUserResults } from '../utils/storage';
import { ExamResult } from '../types';
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  BarChart3,
  Calendar,
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  FileQuestion
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [results, setResults] = useState<ExamResult[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.id) {
      const userPastResults = getUserResults(user.id);
      setResults(userPastResults);
    }
  }, [user?.id]);

  // Unique subjects
  const subjects = ['All', ...new Set(SAMPLE_EXAMS.map((e) => e.subject))];

  // Filter exams
  const filteredExams = SAMPLE_EXAMS.filter((exam) => {
    const matchesSubject = selectedSubject === 'All' || exam.subject === selectedSubject;
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Calculate overview metrics
  const totalCompleted = results.length;
  const passedCount = results.filter((r) => r.passed).length;
  const passRate = totalCompleted > 0 ? Math.round((passedCount / totalCompleted) * 100) : 0;
  const avgScore =
    totalCompleted > 0
      ? Math.round(results.reduce((acc, curr) => acc + curr.percentage, 0) / totalCompleted)
      : 0;

  // Map latest result by examId for display on cards
  const latestResultByExamId: Record<string, ExamResult> = {};
  results.forEach((r) => {
    if (!latestResultByExamId[r.examId]) {
      latestResultByExamId[r.examId] = r;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Welcome Banner */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                <span>Candidate Portal</span>
                <span>·</span>
                <span>Online Examination Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {user?.fullName}! 👋
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Choose an assessment below to challenge your domain expertise, or review past performance results.
              </p>
            </div>

            {/* Quick stats cards */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 text-center">
                <p className="text-xs text-slate-500 font-medium">Tests Taken</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {totalCompleted}
                </p>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 sm:p-4 text-center">
                <p className="text-xs text-emerald-700 font-medium">Pass Rate</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-800 mt-0.5">
                  {passRate}%
                </p>
              </div>
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 text-center">
                <p className="text-xs text-blue-700 font-medium">Avg Score</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-800 mt-0.5">
                  {avgScore}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Section 1: Available Exams */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Available Examinations
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Select a subject to read test instructions and commence your examination.
              </p>
            </div>

            {/* Search & Subject Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-44 sm:w-56"
                />
              </div>

              {/* Subject pill buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(sub)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                      selectedSubject === sub
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exam Cards Grid */}
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  lastResult={latestResultByExamId[exam.id]}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <FileQuestion className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No matching exams found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try clearing your search query or subject filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubject('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Section 2: "My Results" (Past attempts) */}
        <div id="my-results" className="pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>My Results & Exam History</span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {results.length} Attempts
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Past examination attempts, percentages, and question analysis.
              </p>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Examination</th>
                      <th className="px-6 py-4">Date Completed</th>
                      <th className="px-6 py-4">Score</th>
                      <th className="px-6 py-4">Percentage</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((result) => {
                      const completedDate = new Date(result.completedAt).toLocaleDateString(
                        undefined,
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }
                      );

                      return (
                        <tr
                          key={result.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900">{result.examTitle}</div>
                            <div className="text-xs text-slate-500">{result.examSubject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{completedDate}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-bold text-slate-900">
                              {result.score} / {result.totalQuestions}
                            </span>
                            <span className="text-xs text-slate-500 block">
                              {result.correctAnswersCount} correct, {result.wrongAnswersCount} wrong
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    result.passed ? 'bg-emerald-500' : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${result.percentage}%` }}
                                />
                              </div>
                              <span className="font-bold text-slate-900 text-xs">
                                {result.percentage}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {result.passed ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Passed</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                <span>Failed (&lt;40%)</span>
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Link
                              to={`/result/${result.id}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <span>Review Result</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No examination attempts yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                You haven't completed any exams yet. Start any of the exams above to test your skills and see your detailed score breakdown here!
              </p>
              <button
                onClick={() => {
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
              >
                <span>Take Your First Exam</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
