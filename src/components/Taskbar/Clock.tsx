import { useState, useEffect } from 'react';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${h}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col items-end shrink-0 px-2 select-none">
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 leading-tight">
        {formatTime(time)}
      </span>
      <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
        {formatDate(time)}
      </span>
    </div>
  );
}
