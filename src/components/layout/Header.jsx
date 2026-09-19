import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { useDarkMode } from '../../hooks/useDarkMode';
import { UserProfileBadge } from '../ui/UserProfile3D';
import { Refresh3DButton } from '../ui/Refresh3DButton';
import {
  CheckSquare,
  Plus,
  Moon,
  Sun,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export function Header() {
  const { openCreateModal, openExportModal, resetToDemoData, userProfile } = useTasks();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3 sm:gap-4">
          
          {/* Left: Logo & Brand with 3D depth */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 ring-2 ring-brand-500/20 group hover:rotate-6 transition-transform">
              <CheckSquare className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  To-Do List <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-indigo-400 to-cyan-400">Pro</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                  <Sparkles className="w-2.5 h-2.5" /> 3D Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
                Espace personnel de {userProfile.name} • {userProfile.statusText}
              </p>
            </div>
          </div>

          {/* Right: Actions, 3D Refresh, Profile & New Task */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* 3D Actualiser Button */}
            <Refresh3DButton />

            {/* 3D User Profile Badge */}
            <UserProfileBadge />

            {/* Reset Demo Data */}
            <button
              onClick={resetToDemoData}
              title="Réinitialiser avec les données d'exemple"
              className="p-2 sm:p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hidden xs:block"
              aria-label="Réinitialiser les données"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Export Multi-Formats (PDF, Excel, CSV, JSON) */}
            <button
              onClick={openExportModal}
              title="Exporter les tâches (PDF, Excel, CSV, JSON)"
              className="p-2 sm:p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer group"
              aria-label="Exporter les données en PDF, Excel, CSV ou JSON"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-0.5 transition-transform text-slate-600 dark:text-slate-300" />
              <span className="hidden lg:inline text-xs font-semibold text-slate-700 dark:text-slate-300">Exporter</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
              className="p-2 sm:p-2.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              aria-label="Basculer le thème"
            >
              {isDark ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Primary Action Button: Add Task */}
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Nouvelle Tâche</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
