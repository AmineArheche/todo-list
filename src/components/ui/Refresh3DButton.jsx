import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { RefreshCw, Sparkles } from 'lucide-react';

export function Refresh3DButton() {
  const { trigger3DRefresh, is3DRefreshing } = useTasks();

  return (
    <button
      onClick={trigger3DRefresh}
      disabled={is3DRefreshing}
      className="relative group p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-brand-600/10 via-indigo-500/10 to-cyan-500/10 hover:from-brand-600/20 hover:via-indigo-500/20 hover:to-cyan-500/20 border border-brand-500/30 text-brand-600 dark:text-brand-300 text-xs font-bold transition-all shadow-xs hover:shadow-md hover:shadow-brand-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
      title="Actualiser l'espace avec animation 3D"
      aria-label="Actualiser 3D"
    >
      <RefreshCw
        className={`w-4 h-4 text-brand-500 dark:text-brand-300 ${
          is3DRefreshing ? 'animate-spin text-brand-600' : 'group-hover:rotate-180 transition-transform duration-500'
        }`}
      />
      <span className="hidden md:inline-flex items-center gap-1">
        <span>Actualiser 3D</span>
        <Sparkles className="w-3 h-3 text-cyan-400 group-hover:scale-125 transition-transform" />
      </span>
    </button>
  );
}
