import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { Logo3D } from '../ui/Logo3D';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Plus,
  RotateCcw,
  User,
  ArrowUp,
  Zap,
  TrendingUp,
  Layers,
} from 'lucide-react';

export function Footer() {
  const {
    userProfile,
    stats,
    openCreateModal,
    openExportModal,
    openProfileModal,
    resetToDemoData,
    trigger3DRefresh,
  } = useTasks();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-200/60 dark:border-slate-800/60">
          
          {/* Column 1: Brand & Tagline (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo3D size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    To-Do List <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-indigo-400 to-cyan-400">Pro</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-100 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                    3D Edition
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Espace de haute productivité pour {userProfile.name}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              L'application de productivité moderne conçue pour organiser, accomplir et célébrer vos objectifs quotidiens avec une interface 3D fluide et des exports instantanés.
            </p>

            {/* Privacy & Status badge */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Persistance Locale Active</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Privé & Sécurisé</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Productivity Actions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Actions Rapides</span>
            </h4>
            
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={openCreateModal}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer group"
                >
                  <Plus className="w-3.5 h-3.5 text-brand-500 group-hover:scale-125 transition-transform" />
                  <span>Nouvelle Tâche Rapide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openExportModal}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer group"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-500 group-hover:scale-125 transition-transform" />
                  <span>Exporter en PDF / Excel</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openProfileModal}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer group"
                >
                  <User className="w-3.5 h-3.5 text-cyan-500 group-hover:scale-125 transition-transform" />
                  <span>Personnaliser mon Profil</span>
                </button>
              </li>
              <li>
                <button
                  onClick={trigger3DRefresh}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-125 transition-transform" />
                  <span>Synchronisation 3D</span>
                </button>
              </li>
              <li>
                <button
                  onClick={resetToDemoData}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer group"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                  <span>Réinitialiser les Données</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Live Progress Widget (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Bilan en Direct</span>
              </span>
              <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">
                {stats.completionRate}%
              </span>
            </div>

            {/* Mini Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(stats.completionRate, 4)}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
                <p className="text-slate-400">Accomplies</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {stats.completed} / {stats.total}
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
                <p className="text-slate-400">En cours</p>
                <p className="font-bold text-brand-600 dark:text-brand-400 text-sm">
                  {stats.active} tâches
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic text-center pt-1">
              "{userProfile.motto || 'Chaque petite étape compte vers le succès.'}"
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Tech Stack & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} <strong>To-Do List Pro 3D</strong></span>
            <span>•</span>
            <span>Conçu avec <Heart className="inline w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" /> par <strong>Amine Arheche</strong></span>
          </div>

          <div className="flex items-center gap-4">
            {/* GitHub Repo link */}
            <a
              href="https://github.com/AmineArheche/todo-list"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors font-medium cursor-pointer"
              title="Voir le code source sur GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/60 dark:hover:text-brand-400 text-slate-700 dark:text-slate-300 transition-all font-medium cursor-pointer group"
              title="Retourner en haut de page"
              aria-label="Retourner en haut"
            >
              <span>Haut</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
