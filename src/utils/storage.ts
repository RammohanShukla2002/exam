import { User, ExamResult } from '../types';

const USERS_STORAGE_KEY = 'exampulse_users';
const CURRENT_USER_KEY = 'exampulse_current_user';
const RESULTS_STORAGE_KEY = 'exampulse_results';

// Initial seed user for instant test drive if requested
const INITIAL_DEMO_USER: User = {
  id: 'user-demo-1',
  fullName: 'Alex Morgan',
  email: 'alex@example.com',
  password: 'password123',
  createdAt: new Date().toISOString()
};

export function getStoredUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      // Seed initial demo user
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([INITIAL_DEMO_USER]));
      return [INITIAL_DEMO_USER];
    }
    return JSON.parse(raw) as User[];
  } catch (error) {
    console.error('Failed to get stored users:', error);
    return [INITIAL_DEMO_USER];
  }
}

export function saveUser(user: User): void {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string): User | undefined {
  const users = getStoredUsers();
  return users.find((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase());
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch (error) {
    console.error('Failed to get current user session:', error);
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  try {
    if (user) {
      // Don't keep raw password in active session object
      const safeUser = { ...user };
      delete safeUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Failed to set current user:', error);
  }
}

export function getAllResults(): ExamResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ExamResult[]) : [];
  } catch (error) {
    console.error('Failed to get exam results:', error);
    return [];
  }
}

export function getUserResults(userId: string): ExamResult[] {
  const allResults = getAllResults();
  return allResults
    .filter((r) => r.userId === userId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
}

export function saveExamResult(result: ExamResult): void {
  try {
    const allResults = getAllResults();
    allResults.unshift(result);
    localStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(allResults));
  } catch (error) {
    console.error('Failed to save exam result:', error);
  }
}

export function getExamResultById(resultId: string): ExamResult | null {
  const allResults = getAllResults();
  return allResults.find((r) => r.id === resultId) || null;
}
