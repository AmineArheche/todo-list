import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export function TaskDeleteModal() {
  const { deleteModal, closeDeleteModal, confirmDeleteTask } = useTasks();
  const { isOpen, taskToDelete } = deleteModal;

  if (!isOpen || !taskToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-scale-up">
        
        {/* Warning Icon & Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Supprimer cette tâche ?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Êtes-vous sûr de vouloir supprimer définitivement la tâche :
            </p>
            <div className="mt-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
              "{taskToDelete.title}"
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={confirmDeleteTask}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Supprimer définitivement</span>
          </button>
        </div>

      </div>
    </div>
  );
}
