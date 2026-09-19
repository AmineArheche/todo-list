// Initial demo dataset for To-Do List Pro

export const CATEGORIES = [
  { id: 'all', name: 'Toutes', color: 'slate', icon: 'Layers' },
  { id: 'Travail', name: 'Travail', color: 'blue', icon: 'Briefcase' },
  { id: 'Personnel', name: 'Personnel', color: 'emerald', icon: 'User' },
  { id: 'Urgent', name: 'Urgent', color: 'rose', icon: 'Flame' },
  { id: 'Courses', name: 'Courses', color: 'amber', icon: 'ShoppingCart' },
  { id: 'Santé', name: 'Santé', color: 'cyan', icon: 'Heart' },
  { id: 'Projet', name: 'Projet', color: 'purple', icon: 'FolderKanban' },
];

export const PRIORITIES = {
  Haute: {
    label: 'Haute',
    color: 'rose',
    bgLight: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900',
    dot: 'bg-rose-500',
    order: 3,
  },
  Moyenne: {
    label: 'Moyenne',
    color: 'amber',
    bgLight: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
    dot: 'bg-amber-500',
    order: 2,
  },
  Basse: {
    label: 'Basse',
    color: 'emerald',
    bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
    dot: 'bg-emerald-500',
    order: 1,
  },
};

const today = new Date();
const formatDate = (date) => date.toISOString().split('T')[0];

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const in3Days = new Date(today);
in3Days.setDate(in3Days.getDate() + 3);

const in5Days = new Date(today);
in5Days.setDate(in5Days.getDate() + 5);

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Finaliser la présentation pour le client Alpha',
    description: 'Relire les slides de proposition commerciale, vérifier les métriques financières et exporter en PDF.',
    category: 'Travail',
    priority: 'Haute',
    dueDate: formatDate(today),
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Régler la facture d’électricité et Internet',
    description: 'Télécharger la facture EDF et vérifier le prélèvement automatique sur le compte bancaire.',
    category: 'Urgent',
    priority: 'Haute',
    dueDate: formatDate(yesterday), // Overdue for demo
    completed: false,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Acheter les ingrédients pour le dîner de samedi',
    description: 'Saumon frais, légumes de saison, huile d\'olive bio, pain complet et fruits.',
    category: 'Courses',
    priority: 'Moyenne',
    dueDate: formatDate(tomorrow),
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Séance de cardio & étirements (45 min)',
    description: 'Entraînement fractionné au parc suivi d\'une session de stretching musculaire.',
    category: 'Santé',
    priority: 'Basse',
    dueDate: formatDate(today),
    completed: true,
    completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Revue de code & tests unitaires du module Auth',
    description: 'Vérifier la conformité OWASP, les tokens JWT et la couverture des tests Jest.',
    category: 'Projet',
    priority: 'Moyenne',
    dueDate: formatDate(in3Days),
    completed: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-6',
    title: 'Prendre rendez-vous chez le dentiste (Contrôle annuel)',
    description: 'Prendre RDV via Doctolib pour le mois prochain.',
    category: 'Personnel',
    priority: 'Basse',
    dueDate: formatDate(in5Days),
    completed: true,
    completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];
