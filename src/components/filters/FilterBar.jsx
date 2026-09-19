import React from 'react';
import { useTasks } from '../../context/TaskContext';
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  Trash2,
  Filter,
} from 'lucide-react';

export function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    clearCompletedTasks,
    stats,
  } = useTasks();

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      
      {/* Top row: Search Bar & Status Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Rechercher une tâche par titre ou description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              aria-label="Effacer la recherche"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0 self-start md:self-auto w-full md:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Toutes ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'active'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            En cours ({stats.active})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'completed'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Terminées ({stats.completed})
          </button>
        </div>

      </div>

      {/* Bottom row: Priority dropdown, Sorting options, and Clear Completed */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Priority filter */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500 dark:text-slate-400">Priorité :</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="all">Toutes</option>
              <option value="Haute">🔴 Haute</option>
              <option value="Moyenne">🟡 Moyenne</option>
              <option value="Basse">🟢 Basse</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500 dark:text-slate-400">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="dueDate">Date d'échéance</option>
              <option value="priority">Niveau de priorité</option>
              <option value="title">Titre alphabétique</option>
              <option value="createdAt">Date de création</option>
            </select>
            
            {/* Sort Order button */}
            <button
              onClick={toggleSortOrder}
              title={`Ordre ${sortOrder === 'asc' ? 'Croissant' : 'Décroissant'}`}
              className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <ArrowUpDown className={`w-3.5 h-3.5 ${sortOrder === 'desc' ? 'rotate-180 transition-transform' : 'transition-transform'}`} />
            </button>
          </div>
        </div>

        {/* Clear Completed Action */}
        {stats.completed > 0 && (
          <button
            onClick={clearCompletedTasks}
            className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline font-medium ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Nettoyer terminées ({stats.completed})</span>
          </button>
        )}

      </div>

    </div>
  );
}
