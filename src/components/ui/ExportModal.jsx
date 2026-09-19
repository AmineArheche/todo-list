import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import {
  exportToPDF,
  exportToExcel,
  exportToCSV,
  exportToJSON,
} from '../../utils/exportUtils';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Table,
  Database,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  Filter,
} from 'lucide-react';

export function ExportModal() {
  const {
    isExportModalOpen,
    closeExportModal,
    tasks,
    filteredTasks,
    userProfile,
    categories,
    stats,
    showToast,
  } = useTasks();

  const [selectedFormat, setSelectedFormat] = useState('pdf'); // 'pdf' | 'excel' | 'csv' | 'json'
  const [exportScope, setExportScope] = useState('all'); // 'all' | 'filtered' | 'completed' | 'active'
  const [isExporting, setIsExporting] = useState(false);

  if (!isExportModalOpen) return null;

  // Compute tasks to export based on scope
  const getTasksToExport = () => {
    switch (exportScope) {
      case 'filtered':
        return { list: filteredTasks, label: 'Tâches filtrées' };
      case 'completed':
        return { list: tasks.filter((t) => t.completed), label: 'Tâches terminées' };
      case 'active':
        return { list: tasks.filter((t) => !t.completed), label: 'Tâches en cours' };
      case 'all':
      default:
        return { list: tasks, label: 'Toutes les tâches' };
    }
  };

  const { list: tasksToExport, label: scopeLabel } = getTasksToExport();

  const handleExecuteExport = async () => {
    if (tasksToExport.length === 0) {
      showToast('Aucune tâche à exporter pour cette sélection.', 'info');
      return;
    }

    setIsExporting(true);
    try {
      if (selectedFormat === 'pdf') {
        exportToPDF({
          tasks: tasksToExport,
          userProfile,
          stats,
          filterName: scopeLabel,
        });
        showToast('Document PDF généré avec succès ! 📄', 'success');
      } else if (selectedFormat === 'excel') {
        exportToExcel({
          tasks: tasksToExport,
          userProfile,
          stats,
          filterName: scopeLabel,
        });
        showToast('Fichier Excel (.xlsx) téléchargé ! 📊', 'success');
      } else if (selectedFormat === 'csv') {
        exportToCSV({
          tasks: tasksToExport,
          userProfile,
          filterName: scopeLabel,
        });
        showToast('Fichier CSV UTF-8 exporté ! 📑', 'success');
      } else if (selectedFormat === 'json') {
        exportToJSON({
          tasks: tasksToExport,
          userProfile,
          categories,
        });
        showToast('Sauvegarde JSON générée ! 💾', 'success');
      }

      closeExportModal();
    } catch (error) {
      console.error('Erreur export:', error);
      showToast("Une erreur est survenue lors de l'exportation.", 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const formats = [
    {
      id: 'pdf',
      name: 'PDF Document',
      extension: '.pdf',
      icon: FileText,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      activeBorder: 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-500/5',
      badge: 'Idéal Impression',
      description: 'Mise en page soignée, tableau stylisé, badges de priorité et synthèse des KPIs.',
    },
    {
      id: 'excel',
      name: 'Tableur Excel',
      extension: '.xlsx',
      icon: FileSpreadsheet,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-500/5',
      badge: 'Multi-Feuilles',
      description: 'Feuille complète des tâches + feuille de synthèse avec statistiques et indicateurs.',
    },
    {
      id: 'csv',
      name: 'Fichier CSV',
      extension: '.csv',
      icon: Table,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/20 bg-cyan-500/5',
      badge: 'Universel & Léger',
      description: 'Encodage UTF-8 (avec BOM) et séparateur point-virgule pour Excel / LibreOffice.',
    },
    {
      id: 'json',
      name: 'Sauvegarde JSON',
      extension: '.json',
      icon: Database,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-500/5',
      badge: 'Backup Intégral',
      description: 'Export complet incluant profil, tâches détaillées et catégories personnalisées.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Exporter vos Tâches
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Téléchargez vos données en PDF, Excel (.xlsx), CSV ou JSON
              </p>
            </div>
          </div>

          <button
            onClick={closeExportModal}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: Choose Format */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>1. Choisissez le format d'export</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formats.map((fmt) => {
                const Icon = fmt.icon;
                const isSelected = selectedFormat === fmt.id;

                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? fmt.activeBorder
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${fmt.bgColor} ${fmt.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">
                            {fmt.name}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400">
                            {fmt.extension}
                          </span>
                        </div>
                      </div>

                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {fmt.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {fmt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Choose Scope */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>2. Périmètre des données à exporter</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'Toutes', count: tasks.length },
                { id: 'filtered', label: 'Filtre actif', count: filteredTasks.length },
                { id: 'completed', label: 'Terminées', count: stats.completed },
                { id: 'active', label: 'En cours', count: stats.active },
              ].map((scope) => {
                const isSelected = exportScope === scope.id;

                return (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setExportScope(scope.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 font-bold ring-1 ring-brand-500'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs">{scope.label}</p>
                    <span className="text-[11px] opacity-80">({scope.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-500" />
              <span>
                Prêt à exporter <strong>{tasksToExport.length}</strong> tâche(s) au format{' '}
                <strong className="uppercase text-brand-600 dark:text-brand-400">
                  {selectedFormat}
                </strong>
              </span>
            </div>
            <span className="text-[11px] font-mono opacity-70">
              Espace {userProfile.name}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            onClick={closeExportModal}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={handleExecuteExport}
            disabled={isExporting || tasksToExport.length === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-600 hover:from-brand-500 hover:to-cyan-500 shadow-lg shadow-brand-500/25 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Génération...' : `Télécharger (${selectedFormat.toUpperCase()})`}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
