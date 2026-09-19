import React, { useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { PriorityBadge, CategoryBadge, DueDateBadge } from './Badge';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  FileSpreadsheet,
  FileText,
  X,
  Target,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function TaskAccumulatedModal() {
  const {
    celebrationModal,
    closeCelebrationModal,
    stats,
    userProfile,
    openExportModal,
    autoPopupOnAccumulation,
    setAutoPopupOnAccumulation,
  } = useTasks();

  const isOpen = celebrationModal.isOpen;
  const task = celebrationModal.task;

  useEffect(() => {
    if (isOpen) {
      // Fire celebratory multi-angle confetti
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6, x: 0.5 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#ec4899'],
        });

        const timeout = setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 200);

        return () => clearTimeout(timeout);
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen || !task) return null;

  // Motivational quote based on completion rate
  const getMotivationalQuote = () => {
    if (stats.completionRate === 100) {
      return {
        title: 'Perfection Absolue ! 🏆',
        desc: 'Toutes vos tâches enregistrées sont désormais complétées. Vous avez atteint le sommet de la productivité !',
      };
    }
    if (stats.completionRate >= 75) {
      return {
        title: 'Presque au but ! 🚀',
        desc: 'Plus que quelques efforts pour finaliser votre journée en beauté.',
      };
    }
    if (stats.completionRate >= 50) {
      return {
        title: 'À mi-chemin accompli ! ⚡',
        desc: 'Votre dynamique est excellente. Continuez sur ce rythme soutenu.',
      };
    }
    return {
      title: 'Belle avancée ! 🎯',
      desc: 'Chaque tâche terminée libère votre esprit et vous rapproche de vos grands projets.',
    };
  };

  const motivation = getMotivationalQuote();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
    >
      {/* Background ambient glowing spheres */}
      <div className="absolute w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Top Header Gradient Banner */}
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-brand-600 px-6 pt-7 pb-6 text-white text-center">
          
          {/* Close button */}
          <button
            onClick={closeCelebrationModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/15 hover:bg-black/30 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer la notification"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating 3D Trophy Badge */}
          <div className="mx-auto mb-3.5 relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-inner group hover:scale-105 transition-transform">
            <div className="absolute -inset-1 rounded-2xl bg-emerald-400/30 blur-sm animate-pulse pointer-events-none" />
            <Trophy className="w-9 h-9 text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)] animate-bounce" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white border border-white/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tâche Validée & Accumulée</span>
          </div>

          <h2 id="celebration-title" className="text-2xl font-black tracking-tight text-white">
            {motivation.title}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-50 mt-1 max-w-sm mx-auto">
            Félicitations <span className="font-bold underline decoration-amber-300">{userProfile.name}</span>, cette tâche vient d'être ajoutée à vos réussites !
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Completed Task Details Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Détails de la tâche accomplie</span>
            </div>

            <p className="text-base font-bold text-slate-900 dark:text-white break-words line-through decoration-emerald-500/80 decoration-2">
              {task.title}
            </p>

            {task.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <CategoryBadge categoryName={task.category} />
              <PriorityBadge priority={task.priority} />
              {task.dueDate && <DueDateBadge dueDate={task.dueDate} completed={true} />}
            </div>
          </div>

          {/* Current Day / Workspace Progress Bar */}
          <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/50 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Progression Globale</span>
              </span>
              <span className="text-brand-600 dark:text-brand-400 font-bold">
                {stats.completed} / {stats.total} accomplies ({stats.completionRate}%)
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-brand-500 transition-all duration-700 shadow-sm"
                style={{ width: `${Math.max(stats.completionRate, 5)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              "{motivation.desc}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={closeCelebrationModal}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continuer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                closeCelebrationModal();
                openExportModal();
              }}
              className="w-full sm:w-auto py-3 px-4 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
              title="Exporter les tâches en PDF, Excel ou CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Exporter (PDF/Excel)</span>
            </button>
          </div>

          {/* Mute / Automatic popup toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoPopupOnAccumulation}
                onChange={(e) => setAutoPopupOnAccumulation(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500"
              />
              <span>Afficher ce popup à chaque tâche validée</span>
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}
