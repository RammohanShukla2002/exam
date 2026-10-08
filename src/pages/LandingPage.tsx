import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/examsData';
import {
  GraduationCap,
  ArrowRight,
  UserPlus,
  BookOpenCheck,
  Timer,
  Award,
  CheckCircle2,
  ShieldCheck,
  BrainCircuit,
  BarChart3,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-6 shadow-2xs border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Standardized Testing Reimagined</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none mb-6">
              Precision Online Testing with{' '}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">
                ExamPulse
              </span>
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Empower your intellect with timed assessments, intuitive question navigation, auto-submission safety, and in-depth question-by-question analytics.
            </p>

            {/* CTA Buttons */}
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Continue to Dashboard ({user?.fullName})</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Get Started — Sign Up</span>
                </Link>
                <Link
                  to="/signin"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <span>Sign In to Account</span>
                </Link>
              </div>
            )}

            {/* Trust highlights */}
            <div className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>6 Standard Domains</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live Countdown Timer</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Auto-Submit Safety</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Score Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "How It Works" Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              How ExamPulse Works
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              A frictionless examination workflow engineered for students, candidates, and lifelong learners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Sign Up</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Create your student profile in seconds with email and password validation. Your credentials remain securely stored in your browser.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-xs">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Choose an Exam</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select from our curated subjects—Mathematics, Science, Computer Basics, General Knowledge, English, or Logical Reasoning.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-xs">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Take the Test</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Navigate questions with keyboard or click, flag tricky questions for review, and race against the live synchronized timer.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-5 shadow-xs">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">See Your Result</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get an instant Pass/Fail grade breakdown, review every question with full explanations, and track your progress in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Overview */}
      <section id="available-subjects" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Available Test Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Explore Our Assessment Subjects
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Each exam features 10 comprehensive multiple-choice questions with 4 distinct options and immediate scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_EXAMS.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {exam.subject}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {exam.durationMinutes} mins
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">
                    {exam.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {exam.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>10 Questions</span>
                  <span className="font-semibold text-slate-700">Pass Mark: 40%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action card */}
          <div className="mt-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Ready to evaluate your knowledge?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl">
                Create a free account right now. No external setup required; all your progress is stored directly in your browser.
              </p>
            </div>
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              className="px-7 py-3.5 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition-colors shadow-sm shrink-0"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Create Free Account'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
