import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { PRIORITIES } from '../../data/initialTasks';
import { X, Calendar, Tag, AlertCircle, Plus, Check } from 'lucide-react';

export function TaskFormModal() {
  const { formModal, closeFormModal, addTask, updateTask, categories } = useTasks();
  const { isOpen, taskToEdit } = formModal;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Travail');
  const [priority, setPriority] = useState('Moyenne');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setCategory(taskToEdit.category || 'Travail');
      setPriority(taskToEdit.priority || 'Moyenne');
      setDueDate(taskToEdit.dueDate || todayStr);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Travail');
      setPriority('Moyenne');
      setDueDate(todayStr);
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Veuillez entrer un titre pour la tâche.');
      return;
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        title,
        description,
        category,
        priority,
        dueDate,
      });
    } else {
      addTask({
        title,
        description,
        category,
        priority,
        dueDate,
      });
    }

    closeFormModal();
  };

  const setDateShortcut = (daysToAdd) => {
    const d = new Date();
    d.setDate(d.getDate() + daysToAdd);
    setDueDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      
      {/* Modal Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {taskToEdit ? 'Modifier la tâche' : 'Nouvelle Tâche'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {taskToEdit ? 'Mettez à jour les informations de votre tâche' : 'Remplissez les détails pour planifier cette tâche'}
            </p>
          </div>
          <button
            onClick={closeFormModal}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* Title Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Titre de la tâche <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="ex: Préparer le rapport financier du T3..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              autoFocus
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                error
                  ? 'border-rose-500 focus:ring-rose-500/40'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/40 focus:border-brand-500'
              }`}
            />
            {error && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description <span className="text-slate-400 font-normal">(optionnelle)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Ajouter des notes, sous-tâches ou liens utiles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all resize-none"
            />
          </div>

          {/* Category & Due Date row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
              >
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date d'échéance
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
              />
            </div>
          </div>

          {/* Quick Date Shortcuts */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="text-[11px] font-medium">Raccourcis :</span>
            <button
              type="button"
              onClick={() => setDateShortcut(0)}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Aujourd'hui
            </button>
            <button
              type="button"
              onClick={() => setDateShortcut(1)}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Demain
            </button>
            <button
              type="button"
              onClick={() => setDateShortcut(7)}
              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Dans 7j
            </button>
          </div>

          {/* Priority Level Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Niveau de Priorité
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Basse', 'Moyenne', 'Haute'].map((p) => {
                const isSelected = priority === p;
                let activeStyle = '';
                if (p === 'Haute') {
                  activeStyle = isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                    : 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-slate-200 dark:border-slate-700';
                } else if (p === 'Moyenne') {
                  activeStyle = isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                    : 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 border-slate-200 dark:border-slate-700';
                } else {
                  activeStyle = isSelected
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-slate-200 dark:border-slate-700';
                }

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeStyle}`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={closeFormModal}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all"
            >
              {taskToEdit ? 'Enregistrer les modifications' : 'Ajouter la tâche'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
