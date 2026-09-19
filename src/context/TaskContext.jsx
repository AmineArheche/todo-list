import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { INITIAL_TASKS, CATEGORIES, PRIORITIES } from '../data/initialTasks';
import confetti from 'canvas-confetti';

const TaskContext = createContext(null);

const DEFAULT_PROFILE = {
  name: 'Amine',
  statusText: 'Mode Focus',
  statusEmoji: '🎯',
  motto: 'Chaque petite étape compte vers le succès.',
  avatarColor: 'indigo',
};

export function TaskProvider({ children }) {
  // Persistent storage for tasks and custom categories
  const [tasks, setTasks] = useLocalStorage('todolist_pro_tasks_v1', INITIAL_TASKS);
  const [categories, setCategories] = useLocalStorage('todolist_pro_categories_v1', CATEGORIES);
  const [userProfile, setUserProfile] = useLocalStorage('todolist_pro_user_profile_v1', DEFAULT_PROFILE);

  // Filters and Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'title' | 'createdAt'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Modals state
  const [formModal, setFormModal] = useState({ isOpen: false, taskToEdit: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskToDelete: null });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [celebrationModal, setCelebrationModal] = useState({ isOpen: false, task: null });
  const [autoPopupOnAccumulation, setAutoPopupOnAccumulation] = useLocalStorage('todolist_pro_auto_popup_v1', true);

  // 3D Refresh State
  const [is3DRefreshing, setIs3DRefreshing] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 3D Refresh Trigger
  const trigger3DRefresh = useCallback(() => {
    setIs3DRefreshing(true);
    showToast('✨ Synchronisation 3D de votre espace...', 'info');
  }, [showToast]);

  const stop3DRefresh = useCallback(() => {
    setIs3DRefreshing(false);
  }, []);

  // Profile management
  const openProfileModal = useCallback(() => {
    setIsProfileModalOpen(true);
  }, []);

  const closeProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
  }, []);

  const updateUserProfile = useCallback((newProfile) => {
    setUserProfile((prev) => ({ ...prev, ...newProfile }));
    showToast('Profil personnel mis à jour ! 🌟', 'success');
  }, [setUserProfile, showToast]);

  // Task Actions
  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      category: taskData.category || 'Travail',
      priority: taskData.priority || 'Moyenne',
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast('Tâche créée avec succès !', 'success');
  }, [setTasks, showToast]);

  const updateTask = useCallback((id, updatedData) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            ...updatedData,
            title: updatedData.title !== undefined ? updatedData.title.trim() : task.title,
            description: updatedData.description !== undefined ? updatedData.description.trim() : task.description,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
    showToast('Tâche mise à jour !', 'info');
  }, [setTasks, showToast]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showToast('Tâche supprimée.', 'info');
  }, [setTasks, showToast]);

  const openExportModal = useCallback(() => {
    setIsExportModalOpen(true);
  }, []);

  const closeExportModal = useCallback(() => {
    setIsExportModalOpen(false);
  }, []);

  const openCelebrationModal = useCallback((task) => {
    setCelebrationModal({ isOpen: true, task });
  }, []);

  const closeCelebrationModal = useCallback(() => {
    setCelebrationModal({ isOpen: false, task: null });
  }, []);

  const toggleTaskStatus = useCallback((id) => {
    setTasks((prev) => {
      let nowCompleted = false;
      let targetTask = null;
      const updated = prev.map((task) => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          nowCompleted = nextCompleted;
          targetTask = {
            ...task,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : null,
          };
          return targetTask;
        }
        return task;
      });

      if (nowCompleted && targetTask) {
        showToast('Tâche marquée comme terminée ! 🎯', 'success');
        if (autoPopupOnAccumulation) {
          setCelebrationModal({ isOpen: true, task: targetTask });
        }
        // Check if all tasks are now complete!
        const remaining = updated.filter((t) => !t.completed).length;
        if (remaining === 0 && updated.length > 0) {
          try {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore if confetti fails
          }
          showToast(`🎉 Félicitations ${userProfile.name} ! Toutes les tâches sont accomplies !`, 'success');
        }
      } else {
        showToast('Tâche remise en cours', 'info');
      }

      return updated;
    });
  }, [setTasks, showToast, autoPopupOnAccumulation, userProfile.name]);

  const clearCompletedTasks = useCallback(() => {
    const completedCount = tasks.filter((t) => t.completed).length;
    if (completedCount === 0) {
      showToast('Aucune tâche complétée à supprimer.', 'info');
      return;
    }
    setTasks((prev) => prev.filter((task) => !task.completed));
    showToast(`${completedCount} tâche(s) terminée(s) supprimée(s).`, 'info');
  }, [tasks, setTasks, showToast]);

  const resetToDemoData = useCallback(() => {
    setTasks(INITIAL_TASKS);
    setCategories(CATEGORIES);
    setUserProfile(DEFAULT_PROFILE);
    showToast('Données et profil réinitialisés.', 'info');
  }, [setTasks, setCategories, setUserProfile, showToast]);

  const addCategory = useCallback((categoryName) => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;
    const exists = categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      showToast('Cette catégorie existe déjà.', 'error');
      return;
    }
    const newCategory = {
      id: trimmed,
      name: trimmed,
      color: 'indigo',
      icon: 'Tag',
    };
    setCategories((prev) => [...prev, newCategory]);
    showToast(`Catégorie "${trimmed}" ajoutée !`, 'success');
  }, [categories, setCategories, showToast]);

  // Export Modal trigger
  const exportTasks = useCallback(() => {
    setIsExportModalOpen(true);
  }, []);

  // Modals management
  const openCreateModal = useCallback(() => {
    setFormModal({ isOpen: true, taskToEdit: null });
  }, []);

  const openEditModal = useCallback((task) => {
    setFormModal({ isOpen: true, taskToEdit: task });
  }, []);

  const closeFormModal = useCallback(() => {
    setFormModal({ isOpen: false, taskToEdit: null });
  }, []);

  const openDeleteModal = useCallback((task) => {
    setDeleteModal({ isOpen: true, taskToDelete: task });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, taskToDelete: null });
  }, []);

  const confirmDeleteTask = useCallback(() => {
    if (deleteModal.taskToDelete) {
      deleteTask(deleteModal.taskToDelete.id);
      closeDeleteModal();
    }
  }, [deleteModal, deleteTask, closeDeleteModal]);

  // Computed Statistics
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;

    // Overdue: not completed and dueDate is strictly before today
    const overdue = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < todayStr).length;

    // Due today
    const dueToday = tasks.filter((t) => !t.completed && t.dueDate === todayStr).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      active,
      overdue,
      dueToday,
      completionRate,
    };
  }, [tasks]);

  // Filtered and Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (statusFilter === 'active' && task.completed) return false;
        if (statusFilter === 'completed' && !task.completed) return false;
        if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description ? task.description.toLowerCase().includes(q) : false;
          const matchCat = task.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'dueDate') {
          const dateA = a.dueDate || '9999-99-99';
          const dateB = b.dueDate || '9999-99-99';
          comparison = dateA.localeCompare(dateB);
        } else if (sortBy === 'priority') {
          const priorityScoreA = PRIORITIES[a.priority]?.order || 0;
          const priorityScoreB = PRIORITIES[b.priority]?.order || 0;
          comparison = priorityScoreB - priorityScoreA;
        } else if (sortBy === 'title') {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'createdAt') {
          comparison = (b.createdAt || '').localeCompare(a.createdAt || '');
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [tasks, statusFilter, categoryFilter, priorityFilter, searchQuery, sortBy, sortOrder]);

  const value = {
    tasks,
    filteredTasks,
    categories,
    userProfile,
    isProfileModalOpen,
    openProfileModal,
    closeProfileModal,
    updateUserProfile,
    is3DRefreshing,
    trigger3DRefresh,
    stop3DRefresh,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    toasts,
    showToast,
    removeToast,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    clearCompletedTasks,
    resetToDemoData,
    addCategory,
    exportTasks,
    isExportModalOpen,
    openExportModal,
    closeExportModal,
    celebrationModal,
    openCelebrationModal,
    closeCelebrationModal,
    autoPopupOnAccumulation,
    setAutoPopupOnAccumulation,
    formModal,
    openCreateModal,
    openEditModal,
    closeFormModal,
    deleteModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
