import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { Header } from './components/layout/Header';
import { StatsDashboard } from './components/layout/StatsDashboard';
import { CategoryPills } from './components/filters/CategoryPills';
import { FilterBar } from './components/filters/FilterBar';
import { TaskList } from './components/tasks/TaskList';
import { TaskFormModal } from './components/tasks/TaskFormModal';
import { TaskDeleteModal } from './components/tasks/TaskDeleteModal';
import { UserProfileModal } from './components/ui/UserProfile3D';
import { WelcomeSplash3D } from './components/ui/WelcomeSplash3D';
import { ExportModal } from './components/ui/ExportModal';
import { TaskAccumulatedModal } from './components/ui/TaskAccumulatedModal';
import { Logo3D } from './components/ui/Logo3D';
import { ToastContainer } from './components/ui/Toast';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

function DashboardContent() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* 3D Welcome & Refresh Splash Overlay */}
      <WelcomeSplash3D />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Top KPIs, Personalized Greeting & Progress Bar */}
        <section aria-label="Tableau de bord des statistiques">
          <StatsDashboard />
        </section>

        {/* Category Pills Slider */}
        <section aria-label="Filtres par catégorie">
          <CategoryPills />
        </section>

        {/* Search & Filter Bar */}
        <section aria-label="Recherche et options de tri">
          <FilterBar />
        </section>

        {/* Task Cards Grid */}
        <section aria-label="Liste des tâches">
          <TaskList />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-6 mt-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <Logo3D size="sm" animated={false} />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              To-Do List Pro 3D
            </span>
            <span>• Espace de Productivité Moderne</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Effets 3D & Persistance Locale
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              Fait avec <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> en React
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <TaskFormModal />
      <TaskDeleteModal />
      <UserProfileModal />
      <ExportModal />
      <TaskAccumulatedModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
}
