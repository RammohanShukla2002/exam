import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  onTimeUp,
  isPaused = false
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (isPaused) return;

    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;

  const isLowTime = secondsLeft <= 60; // Less than 1 minute
  const isWarningTime = secondsLeft <= 180 && !isLowTime; // Less than 3 minutes

  return (
    <div
      className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono text-sm sm:text-base font-bold transition-all ${
        isLowTime
          ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
          : isWarningTime
          ? 'bg-amber-100 text-amber-800 border border-amber-300'
          : 'bg-blue-50 text-blue-700 border border-blue-200'
      }`}
    >
      {isLowTime ? (
        <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
      ) : (
        <Clock className="w-4 h-4 text-blue-600" />
      )}
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase font-sans font-medium text-slate-500">
          Time Remaining
        </span>
        <span className="tracking-widest">{formattedTime}</span>
      </div>
    </div>
  );
};
