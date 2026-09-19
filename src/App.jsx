import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
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
import { ToastContainer } from './components/ui/Toast';

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

      {/* Enhanced Footer */}
      <Footer />

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
