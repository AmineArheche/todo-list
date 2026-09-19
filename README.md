# 🌟 To-Do List Pro 3D

Application moderne et immersive de gestion de tâches et de productivité conçue avec **React 19**, **Vite**, **Tailwind CSS**, et dotée d'effets visuels **3D interactifs**, d'un système d'exportation multi-formats (**PDF, Excel, CSV, JSON**) et de célébrations dynamiques.

---

## ✨ Fonctionnalités Clés

- **🎯 Gestion Avancée des Tâches** : Création, modification, catégorisation, priorisation (Haute, Moyenne, Basse) et dates d'échéance.
- **📊 Tableau de Bord & KPIs** : Taux d'achèvement en direct, tâches en retard, tâches du jour et messages dynamiques.
- **📁 Exportation Multi-Formats** :
  - **📄 PDF Document (`.pdf`)** : Rapport structuré avec en-tête, tableau stylisé (`jspdf-autotable`), pagination et indicateurs visuels.
  - **📊 Tableur Excel (`.xlsx`)** : Fichier classeur multi-feuilles (*Tâches détaillées* et *Synthèse & KPIs*) généré via `xlsx` (SheetJS).
  - **📑 Fichier CSV (`.csv`)** : Format avec séparateur point-virgule et BOM UTF-8 (`\uFEFF`) pour une compatibilité parfaite avec Excel / LibreOffice.
  - **💾 Sauvegarde JSON (`.json`)** : Sauvegarde intégrale du profil, des catégories et des tâches.
- **🎉 Popup de Célébration & Accumulation** : Modal 3D avec confettis multi-angles (`canvas-confetti`), détails de la tâche accomplie et barre de progression du jour.
- **🧊 Expérience 3D & Design Glassmorphism** : Cartes à effet de profondeur 3D (*tilt* interactif), cube isométrique animé et splash screen dynamique.
- **🌓 Thème Sombre / Clair** : Basculement instantané avec persistance du thème.
- **💾 Persistance Locale** : Synchronisation continue de vos données dans le navigateur via `localStorage`.

---

## 🚀 Installation et Lancement

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- `npm` ou `yarn`

### 1. Cloner le dépôt
```bash
git clone https://github.com/AmineArheche/todo-list.git
cd todo-list
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173/`.

### 4. Construire pour la production
```bash
npm run build
```

---

## 🛠️ Technologies Utilisées

- **Framework & Outils** : [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styles & UI** : [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (icônes)
- **Animations & Effets** : [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti), CSS 3D Transforms
- **Exportation** : [jsPDF](https://github.com/parallax/jsPDF), [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable), [SheetJS (xlsx)](https://sheetjs.com/)

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
