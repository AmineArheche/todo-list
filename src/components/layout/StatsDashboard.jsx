import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  Sparkles,
  Calendar,
  Zap,
} from 'lucide-react';

export function StatsDashboard() {
  const { stats, setStatusFilter, userProfile, openProfileModal } = useTasks();

  const todayFormatted = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getProgressMessage = (rate) => {
    if (stats.total === 0) return 'Commencez par ajouter votre première tâche ! 🚀';
    if (rate === 100) return `Impressionnant ${userProfile.name} ! Toutes vos tâches sont accomplies ! 🏆`;
    if (rate >= 75) return `Presque terminé ${userProfile.name}, continuez sur cette lancée ! 💪`;
    if (rate >= 50) return 'À mi-chemin, excellent rythme de travail ! ⚡';
    if (rate > 0) return 'Le premier pas est franchi, gardez le cap ! 🎯';
    return `Prêt à attaquer votre liste du jour, ${userProfile.name} ? 🚀`;
  };

  return (
    <div className="space-y-4">
      
      {/* Personalized Welcome Banner with 3D Depth */}
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-brand-900/40 via-slate-900/60 to-indigo-950/40 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-brand-500/20 shadow-md backdrop-blur-md overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{userProfile.statusEmoji || '🎯'}</span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Espace de travail de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyan-400">{userProfile.name}</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                {userProfile.statusText}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic">
              « {userProfile.motto || 'Chaque petite étape compte vers le succès.'} »
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-brand-500" />
              <span className="capitalize">{todayFormatted}</span>
            </div>

            <button
              onClick={openProfileModal}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800/80 hover:bg-brand-100 transition-colors"
            >
              Modifier profil
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards Grid with 3D Tilt */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Tasks */}
        <Tilt3DCard maxTilt={6}>
          <button
            onClick={() => setStatusFilter('all')}
            className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700/50 transition-all cursor-pointer relative overflow-hidden group h-full"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Tâches
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                <ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stats.total}
              </span>
              <span className="text-xs text-slate-400">tâches</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              Vue d'ensemble globale
            </div>
          </button>
        </Tilt3DCard>

        {/* Active Tasks */}
        <Tilt3DCard maxTilt={6}>
          <button
            onClick={() => setStatusFilter('active')}
            className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700/50 transition-all cursor-pointer relative overflow-hidden group h-full"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                En cours
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
                {stats.active}
              </span>
              {stats.dueToday > 0 && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                  {stats.dueToday} auj.
                </span>
              )}
            </div>
            <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              {stats.active > 0 ? 'Tâches à réaliser' : 'Rien en attente !'}
            </div>
          </button>
        </Tilt3DCard>

        {/* Completed Tasks */}
        <Tilt3DCard maxTilt={6}>
          <button
            onClick={() => setStatusFilter('completed')}
            className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700/50 transition-all cursor-pointer relative overflow-hidden group h-full"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                Terminées
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {stats.completed}
              </span>
              <span className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400/80">
                ({stats.completionRate}%)
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              Objectifs atteints
            </div>
          </button>
        </Tilt3DCard>

        {/* Overdue Tasks */}
        <Tilt3DCard maxTilt={6}>
          <div
            className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all relative overflow-hidden h-full ${
              stats.overdue > 0
                ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                En retard
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  stats.overdue > 0
                    ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <AlertOctagon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  stats.overdue > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
                }`}
              >
                {stats.overdue}
              </span>
              <span className="text-xs text-slate-400">
                {stats.overdue > 0 ? 'action requise' : 'à jour'}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
              {stats.overdue > 0 ? 'Date d’échéance dépassée' : 'Aucun retard constaté'}
            </div>
          </div>
        </Tilt3DCard>

      </div>

      {/* Progress Bar & Motivation Panel with 3D Depth */}
      <Tilt3DCard maxTilt={4}>
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white shadow-xl shadow-indigo-950/30 border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-brand-500/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-300 shadow-inner">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-1.5">
                  <span>Progression Globale</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-300">
                  {getProgressMessage(stats.completionRate)}
                </p>
              </div>
            </div>
            <div className="flex items-baseline sm:items-end gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-cyan-300">
                {stats.completionRate}%
              </span>
              <span className="text-xs text-slate-400 font-medium">
                ({stats.completed}/{stats.total})
              </span>
            </div>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full bg-slate-800/90 rounded-full h-3.5 p-0.5 border border-slate-700/60 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-400 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>
      </Tilt3DCard>

    </div>
  );
}
