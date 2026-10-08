import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  FileCheck2,
  LayoutDashboard,
  Award
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/signin');
  };

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to={isAuthenticated ? '/dashboard' : '/'}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 tracking-tight flex items-center gap-1">
                Exam<span className="text-blue-600">Pulse</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider -mt-1 hidden sm:block">
                Online Examination Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    isCurrent('/dashboard')
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <div className="h-5 w-px bg-slate-200" />

                {/* User Info & Profile */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-slate-800 leading-tight">
                        {user?.fullName}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-tight truncate max-w-[130px]">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                    title="Log out from session"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors ${
                    isCurrent('/') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Home
                </Link>
                <a
                  href="/#how-it-works"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="/#available-subjects"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Subjects
                </a>

                <div className="h-5 w-px bg-slate-200" />

                <div className="flex items-center gap-3">
                  <Link
                    to="/signin"
                    className="text-sm font-semibold text-slate-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50/60 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-blue-50/60 rounded-xl mb-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                  {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{user?.fullName}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 text-slate-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard & Exams
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 text-rose-600 font-medium px-3 py-2 rounded-lg hover:bg-rose-50 text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg"
              >
                Home
              </Link>
              <a
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg"
              >
                How It Works
              </a>
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-blue-600 text-white rounded-lg font-medium shadow-xs"
                >
                  Sign Up Free
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
