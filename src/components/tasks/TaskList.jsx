import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { TaskCard } from './TaskCard';
import {
  Inbox,
  Sparkles,
  Plus,
  LayoutGrid,
  List,
  CheckCircle2,
  SearchX,
} from 'lucide-react';

export function TaskList() {
  const { filteredTasks, tasks, openCreateModal, searchQuery, statusFilter, categoryFilter, priorityFilter } =
    useTasks();

  const [viewLayout, setViewLayout] = useState('grid'); // 'grid' | 'list'

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    categoryFilter !== 'all' ||
    priorityFilter !== 'all';

  // Empty State handling
  if (filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
        {hasActiveFilters ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Aucune tâche ne correspond à vos filtres
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Essayez de modifier vos termes de recherche ou de réinitialiser vos critères de filtrage.
            </p>
          </>
        ) : tasks.length === 0 ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Votre liste de tâches est vide
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Planifiez vos journées avec sérénité en créant votre première tâche dès maintenant.
            </p>
            <button
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-brand-600/20 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Créer une tâche</span>
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Toutes les tâches sont terminées !
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Bravo pour votre efficacité ! Vous pouvez ajouter de nouveaux objectifs quand vous le souhaitez.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with count and Grid/List toggle */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Tâches affichées
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {filteredTasks.length}
          </span>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <button
            onClick={() => setViewLayout('grid')}
            title="Vue Grille"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              viewLayout === 'grid'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewLayout('list')}
            title="Vue Liste"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              viewLayout === 'list'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task Cards Container */}
      <div
        className={
          viewLayout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'
            : 'flex flex-col gap-3'
        }
      >
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
