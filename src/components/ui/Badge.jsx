import React from 'react';
import { PRIORITIES } from '../../data/initialTasks';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export function PriorityBadge({ priority, size = 'sm' }) {
  const config = PRIORITIES[priority] || PRIORITIES.Moyenne;

  const sizeClasses = size === 'xs' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm transition-all ${config.bgLight} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}

export function CategoryBadge({ category }) {
  // Category color mapping
  const categoryColors = {
    Travail: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    Personnel: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    Urgent: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    Courses: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    Santé: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800',
    Projet: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  };

  const styleClass =
    categoryColors[category] ||
    'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${styleClass}`}>
      {category}
    </span>
  );
}

export function DueDateBadge({ dueDate, completed }) {
  if (!dueDate) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !completed && dueDate < todayStr;
  const isToday = !completed && dueDate === todayStr;

  // Format date display (e.g., "19 sept. 2026")
  const dateObj = new Date(dueDate + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  if (completed) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        <span>Échéance : {formattedDate}</span>
      </span>
    );
  }

  if (isOverdue) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900 animate-pulse">
        <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
        <span>En retard ({formattedDate})</span>
      </span>
    );
  }

  if (isToday) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>Aujourd'hui</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
      <Clock className="w-3.5 h-3.5" />
      <span>{formattedDate}</span>
    </span>
  );
}
