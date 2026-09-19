import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { PriorityBadge, CategoryBadge, DueDateBadge } from '../ui/Badge';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import {
  Check,
  Edit3,
  Trash2,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export function TaskCard({ task }) {
  const { toggleTaskStatus, openEditModal, openDeleteModal } = useTasks();
  const [isExpanded, setIsExpanded] = useState(false);

  const isCompleted = task.completed;

  // Priority border accent
  const priorityBorderColors = {
    Haute: 'border-l-rose-500 dark:border-l-rose-500',
    Moyenne: 'border-l-amber-500 dark:border-l-amber-500',
    Basse: 'border-l-emerald-500 dark:border-l-emerald-500',
  };

  const leftBorder = priorityBorderColors[task.priority] || 'border-l-slate-400';

  return (
    <Tilt3DCard maxTilt={4} scale={1.01} className="h-full">
      <div
        className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 border-l-4 ${leftBorder} shadow-sm hover:shadow-lg transition-all duration-200 h-full ${
          isCompleted ? 'bg-slate-50/60 dark:bg-slate-900/40 opacity-75' : ''
        }`}
      >
        <div>
          {/* Header Row: Checkbox, Title, Actions */}
          <div className="flex items-start gap-3 justify-between">
            
            <div className="flex items-start gap-3 min-w-0 flex-1">
              {/* Custom Interactive Checkbox */}
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30 ring-2 ring-emerald-500/20'
                    : 'border-slate-300 dark:border-slate-600 hover:border-brand-500 dark:hover:border-brand-400 bg-white dark:bg-slate-800'
                }`}
                aria-label={isCompleted ? 'Marquer comme en cours' : 'Marquer comme terminée'}
              >
                {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
              </button>

              {/* Task Title & Description */}
              <div className="min-w-0 flex-1">
                <h3
                  className={`text-sm sm:text-base font-semibold leading-snug break-words transition-all ${
                    isCompleted
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {task.title}
                </h3>

                {/* Task Description (Optional) */}
                {task.description && (
                  <div className="mt-1.5">
                    <p
                      className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed break-words ${
                        !isExpanded ? 'line-clamp-2' : ''
                      } ${isCompleted ? 'line-through opacity-70' : ''}`}
                    >
                      {task.description}
                    </p>
                    {task.description.length > 90 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-1 text-[11px] font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <span>Moins de détails</span>
                            <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            <span>Lire la suite</span>
                            <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEditModal(task)}
                className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 rounded-lg transition-colors cursor-pointer"
                title="Modifier la tâche"
                aria-label="Modifier la tâche"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => openDeleteModal(task)}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                title="Supprimer la tâche"
                aria-label="Supprimer la tâche"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta Row: Badges, Date */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={task.category} />
            <PriorityBadge priority={task.priority} />
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <DueDateBadge dueDate={task.dueDate} completed={isCompleted} />
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
}
