<div align="center">

# ⚡ To-Do List Pro 3D

**Plateforme Moderne de Productivité & Gestionnaire de Tâches Haute Performance**

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  Une application web ultra-fluide combinant une interface utilisateur <strong>3D immersive</strong>, un moteur d'exportation professionnel multi-formats (<strong>PDF, Excel, CSV, JSON</strong>) et un système de récompenses visuelles dynamique lors de la complétion des objectifs.
</p>

[Explorer les fonctionnalités](#-fonctionnalités-phares) • [Installation](#-installation--démarrage-rapide) • [Architecture](#-architecture-du-projet) • [Export Multi-Formats](#-suite-dexportation-avancée)

---

</div>

## 🌟 Points Forts

- 🎨 **Esthétique 3D & Glassmorphism** : Effets de profondeur *Tilt 3D* réactifs aux mouvements de souris, cube isométrique animé en CSS3D, et flous d'arrière-plan modernes.
- 📊 **Tableau de Bord & Métriques Clés** : Taux d'achèvement en direct, suivi des retards, tâches du jour et messages d'encouragement personnalisés.
- 📄 **Exportation Multi-Formats Professionnelle** : Génération instantanée de rapports PDF haute fidélité, classeurs Excel multi-feuilles (`.xlsx`), fichiers CSV avec BOM UTF-8 et sauvegardes JSON.
- 🎉 **Popup de Célébration & Accumulation** : Déclenchement automatique d'un modal 3D avec confettis multi-angles (`canvas-confetti`) à chaque objectif accompli.
- ⚡ **Performance & Réactivité** : Construit avec React 19 et Vite pour un chargement instantané sans latence.
- 🌓 **Mode Sombre / Mode Clair Natif** : Palette de couleurs HSL soignée avec transition douce et mémorisation automatique.
- 🔒 **100% Privé & Persistant** : Toutes les données restent stockées localement sur votre navigateur via `localStorage`.

---

## 🚀 Fonctionnalités Phares

### 1. 📋 Gestion Complète des Tâches (CRUD)
- **Création & Édition Rapide** : Formulaire modal avec validation, sélection de priorité (Haute, Moyenne, Basse) et date d'échéance.
- **Filtres Avancés & Recherche Instantanée** : Filtrez par état (*Toutes, En cours, Terminées*), par catégorie personnalisée ou par priorité.
- **Tri Intelligent** : Classement par date d'échéance, priorité, titre alphabétique ou date de création.
- **Badges Intelligents** : Détection automatique des tâches en retard avec alertes visuelles.

### 2. 📊 Suite d'Exportation Avancée

| Format | Extension | Caractéristiques & Usages |
| :--- | :---: | :--- |
| **Document PDF** | `.pdf` | Rapport stylisé avec en-tête d'entreprise, cartes KPIs, tableau formaté (`jspdf-autotable`), pagination et codes couleur de priorité. |
| **Tableur Excel** | `.xlsx` | Classeur multi-feuilles généré par `xlsx` (Feuille 1 : *Tâches détaillées* ; Feuille 2 : *Synthèse & KPIs d'avancement*). |
| **Fichier CSV** | `.csv` | Séparateur point-virgule (`;`) et encodage UTF-8 avec BOM (`\uFEFF`) pour une compatibilité native sous Microsoft Excel et LibreOffice. |
| **Sauvegarde JSON** | `.json` | Exportation complète des métadonnées (profil utilisateur, catégories personnalisées, historique des tâches). |

> 💡 **Périmètre personnalisable** : Exportez au choix la totalité des tâches, les tâches filtrées, uniquement les tâches terminées ou les tâches actives.

### 3. 🎉 Célébration de la Réussite
- Dès qu'une tâche est validée, un **popup 3D de félicitations** s'affiche.
- Animation festive avec jet de confettis.
- Récapitulatif du titre de la tâche et affichage de la jauge de progression globale.
- Bouton de désactivation rapide disponible si vous préférez un flux de travail silencieux.

---

## 🛠️ Technologies & Bibliothèques

- **Moteur & Framework** : [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling & Design System** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Animations Festives** : [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Génération PDF** : [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- **Génération Excel** : [SheetJS (xlsx)](https://sheetjs.com/)

---

## 📂 Architecture du Projet

```text
todo-list-pro/
├── public/                     # Assets statiques & icônes SVG
├── src/
│   ├── assets/                 # Images et logos
│   ├── components/
│   │   ├── filters/            # Composants de filtrage & recherche
│   │   │   ├── CategoryPills.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── layout/             # En-tête & Dashboard de statistiques
│   │   │   ├── Header.jsx
│   │   │   └── StatsDashboard.jsx
│   │   ├── tasks/              # Gestion des cartes & modals de tâches
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskDeleteModal.jsx
│   │   │   ├── TaskFormModal.jsx
│   │   │   └── TaskList.jsx
│   │   └── ui/                 # Composants d'interface & effets 3D
│   │       ├── Badge.jsx
│   │       ├── ExportModal.jsx          # Modal d'export PDF/Excel/CSV/JSON
│   │       ├── Refresh3DButton.jsx
│   │       ├── TaskAccumulatedModal.jsx # Popup de célébration & accumulation
│   │       ├── Tilt3DCard.jsx           # Effet de profondeur 3D
│   │       ├── Toast.jsx
│   │       ├── UserProfile3D.jsx
│   │       └── WelcomeSplash3D.jsx
│   ├── context/
│   │   └── TaskContext.jsx     # Gestion centralisée de l'état (State Management)
│   ├── data/
│   │   └── initialTasks.js     # Données initiales & configuration par défaut
│   ├── hooks/
│   │   ├── useDarkMode.js      # Hook de gestion du thème sombre/clair
│   │   └── useLocalStorage.js # Hook de synchronisation avec le stockage local
│   ├── utils/
│   │   └── exportUtils.js      # Fonctions de génération PDF, Excel, CSV et JSON
│   ├── App.jsx                 # Point d'entrée des vues principales
│   ├── index.css               # Styles globaux & animations 3D
│   └── main.jsx                # Point de montage React
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 💻 Installation & Démarrage Rapide

### 1. Cloner le projet
```bash
git clone https://github.com/AmineArheche/todo-list.git
cd todo-list
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer le serveur de développement
```bash
npm run dev
```
Ouvrez votre navigateur à l'adresse [http://localhost:5173/](http://localhost:5173/).

### 4. Compiler pour la production
```bash
npm run build
```
Les fichiers prêts pour le déploiement seront générés dans le répertoire `dist/`.

---

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le distribuer. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
  Fait avec passion par <strong>Amine Arheche</strong> 🚀
</div>
