import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import {
  Layers,
  Briefcase,
  User,
  Flame,
  ShoppingCart,
  Heart,
  FolderKanban,
  Tag,
  Plus,
} from 'lucide-react';

const ICON_MAP = {
  Layers,
  Briefcase,
  User,
  Flame,
  ShoppingCart,
  Heart,
  FolderKanban,
  Tag,
};

export function CategoryPills() {
  const { categories, categoryFilter, setCategoryFilter, tasks, addCategory } = useTasks();
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory(newCatName);
      setNewCatName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {/* Category Pills */}
      {categories.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || Tag;
        const isSelected = categoryFilter === cat.id;

        // Count tasks in this category
        const count =
          cat.id === 'all'
            ? tasks.length
            : tasks.filter((t) => t.category === cat.name).length;

        return (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              isSelected
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
            <span>{cat.name}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                isSelected
                  ? 'bg-brand-500/80 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}

      {/* Add Custom Category Chip */}
      {isAdding ? (
        <form onSubmit={handleAddSubmit} className="flex items-center gap-1.5">
          <input
            type="text"
            placeholder="Nom catégorie..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            autoFocus
            className="px-3 py-1 text-xs rounded-full border border-brand-400 dark:border-brand-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 w-32"
          />
          <button
            type="submit"
            className="px-2 py-1 text-xs font-semibold bg-brand-600 text-white rounded-full hover:bg-brand-500"
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Annuler
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-200 transition-colors whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter</span>
        </button>
      )}
    </div>
  );
}
