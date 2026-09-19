import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Format date to French locale string
 */
export function formatDateFr(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format date & time to French locale string
 */
export function formatDateTimeFr(dateStr = new Date()) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return String(dateStr);
  }
}

/**
 * Helper to download a file blob
 */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export tasks as a beautifully styled PDF document
 */
export function exportToPDF({ tasks, userProfile, stats, filterName = 'Toutes les tâches' }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const dateFormatted = formatDateTimeFr();
  const userName = userProfile?.name || 'Utilisateur';

  // --- Header Banner ---
  doc.setFillColor(79, 70, 229); // #4f46e5 (Brand Indigo)
  doc.rect(0, 0, 210, 32, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('To-Do List Pro', 14, 15);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(224, 231, 255);
  doc.text(`Rapport d'activité & Gestion des tâches • ${filterName}`, 14, 23);

  // Date on right
  doc.setFontSize(9);
  doc.setTextColor(199, 210, 254);
  doc.text(`Généré le : ${dateFormatted}`, 196, 15, { align: 'right' });
  doc.text(`Espace de : ${userName}`, 196, 23, { align: 'right' });

  // --- KPI Summary Cards ---
  const currentTotal = tasks.length;
  const currentCompleted = tasks.filter((t) => t.completed).length;
  const currentActive = currentTotal - currentCompleted;
  const currentOverdue = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < todayStr).length;
  const completionRate = currentTotal > 0 ? Math.round((currentCompleted / currentTotal) * 100) : 0;

  let startY = 40;

  // Box 1: Total
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(14, startY, 42, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text(`${currentTotal}`, 35, startY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Total Tâches', 35, startY + 14, { align: 'center' });

  // Box 2: Accomplies
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.roundedRect(60, startY, 42, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(5, 150, 105);
  doc.text(`${currentCompleted}`, 81, startY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129);
  doc.text(`Accomplies (${completionRate}%)`, 81, startY + 14, { align: 'center' });

  // Box 3: En cours
  doc.setFillColor(238, 242, 255); // indigo-50
  doc.roundedRect(106, startY, 42, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(79, 70, 229);
  doc.text(`${currentActive}`, 127, startY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(99, 102, 241);
  doc.text('En Cours', 127, startY + 14, { align: 'center' });

  // Box 4: En retard
  doc.setFillColor(255, 241, 242); // rose-50
  doc.roundedRect(152, startY, 44, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(225, 29, 72);
  doc.text(`${currentOverdue}`, 174, startY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(244, 63, 94);
  doc.text('En Retard', 174, startY + 14, { align: 'center' });

  // --- Table Content ---
  const tableData = tasks.map((task, index) => {
    const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
    const statusText = task.completed ? 'Terminée' : isOverdue ? 'En retard' : 'En cours';

    return [
      index + 1,
      task.title || '-',
      task.category || 'Général',
      task.priority || 'Moyenne',
      formatDateFr(task.dueDate),
      statusText,
      formatDateFr(task.createdAt),
    ];
  });

  autoTable(doc, {
    startY: 65,
    head: [['#', 'Titre de la tâche', 'Catégorie', 'Priorité', 'Échéance', 'Statut', 'Créée le']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
      cellPadding: 3.5,
    },
    styles: {
      fontSize: 8.5,
      textColor: [51, 65, 85],
      cellPadding: 3,
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
      valign: 'middle',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 62 },
      2: { cellWidth: 26 },
      3: { cellWidth: 22, halign: 'center' },
      4: { cellWidth: 24, halign: 'center' },
      5: { cellWidth: 24, halign: 'center' },
      6: { cellWidth: 22, halign: 'center' },
    },
    didParseCell: function (data) {
      if (data.section === 'body') {
        // Priority styling
        if (data.column.index === 3) {
          const val = data.cell.raw;
          if (val === 'Haute') {
            data.cell.styles.textColor = [225, 29, 72];
            data.cell.styles.fontStyle = 'bold';
          } else if (val === 'Moyenne') {
            data.cell.styles.textColor = [217, 119, 6];
          } else if (val === 'Basse') {
            data.cell.styles.textColor = [16, 185, 129];
          }
        }
        // Status styling
        if (data.column.index === 5) {
          const val = data.cell.raw;
          if (val === 'Terminée') {
            data.cell.styles.textColor = [5, 150, 105];
            data.cell.styles.fontStyle = 'bold';
          } else if (val === 'En retard') {
            data.cell.styles.textColor = [225, 29, 72];
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = [79, 70, 229];
          }
        }
      }
    },
    didDrawPage: function (data) {
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `To-Do List Pro 3D • Document confidentiel • Page ${data.pageNumber} sur ${pageCount}`,
        105,
        290,
        { align: 'center' }
      );
    },
    margin: { left: 14, right: 14, top: 40, bottom: 18 },
  });

  const filename = `todolist-pro-${userName.toLowerCase().replace(/\s+/g, '-')}-${todayStr}.pdf`;
  doc.save(filename);
}

/**
 * Export tasks as an Excel (.xlsx) file with multi-sheets and formatted columns
 */
export function exportToExcel({ tasks, userProfile, stats, filterName = 'Toutes les tâches' }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const userName = userProfile?.name || 'Utilisateur';

  // Sheet 1: Tasks List
  const tasksRows = tasks.map((task, idx) => {
    const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
    const statusText = task.completed ? 'Terminée' : isOverdue ? 'En retard' : 'En cours';

    return {
      'N°': idx + 1,
      'Identifiant': task.id,
      'Titre': task.title,
      'Description': task.description || '',
      'Catégorie': task.category || 'Général',
      'Priorité': task.priority || 'Moyenne',
      "Date d'échéance": formatDateFr(task.dueDate),
      'Statut': statusText,
      'Date de création': formatDateTimeFr(task.createdAt),
      "Date d'accomplissement": task.completedAt ? formatDateTimeFr(task.completedAt) : '-',
    };
  });

  const wb = XLSX.utils.book_new();

  // Create Tasks worksheet
  const wsTasks = XLSX.utils.json_to_sheet(tasksRows);

  // Set column widths
  wsTasks['!cols'] = [
    { wch: 6 },  // N°
    { wch: 18 }, // ID
    { wch: 35 }, // Titre
    { wch: 40 }, // Description
    { wch: 16 }, // Catégorie
    { wch: 12 }, // Priorité
    { wch: 16 }, // Échéance
    { wch: 14 }, // Statut
    { wch: 20 }, // Date création
    { wch: 22 }, // Date accomplissement
  ];

  XLSX.utils.book_append_sheet(wb, wsTasks, 'Tâches');

  // Sheet 2: Summary and Statistics
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;
  const overdue = tasks.filter((t) => !t.completed && t.dueDate && t.dueDate < todayStr).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const summaryData = [
    { Indicateur: 'Espace / Propriétaire', Valeur: userName },
    { Indicateur: 'Filtre appliqué', Valeur: filterName },
    { Indicateur: 'Date de génération', Valeur: formatDateTimeFr() },
    { Indicateur: '', Valeur: '' },
    { Indicateur: 'Total des tâches', Valeur: total },
    { Indicateur: 'Tâches accomplies', Valeur: completed },
    { Indicateur: 'Tâches en cours', Valeur: active },
    { Indicateur: 'Tâches en retard', Valeur: overdue },
    { Indicateur: "Taux d'accomplissement", Valeur: `${completionRate}%` },
  ];

  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  wsSummary['!cols'] = [{ wch: 28 }, { wch: 28 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Synthèse & KPIs');

  // Write file
  const filename = `todolist-pro-${userName.toLowerCase().replace(/\s+/g, '-')}-${todayStr}.xlsx`;
  XLSX.writeFile(wb, filename);
}

/**
 * Export tasks as a CSV file (UTF-8 BOM with semicolon separator for French Excel compatibility)
 */
export function exportToCSV({ tasks, userProfile, filterName = 'Toutes les tâches' }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const userName = userProfile?.name || 'Utilisateur';

  const headers = [
    'N°',
    'Identifiant',
    'Titre',
    'Description',
    'Catégorie',
    'Priorité',
    "Date d'échéance",
    'Statut',
    'Date de création',
    "Date d'accomplissement",
  ];

  const escapeCSV = (str) => {
    if (str === null || str === undefined) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = tasks.map((task, idx) => {
    const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
    const statusText = task.completed ? 'Terminée' : isOverdue ? 'En retard' : 'En cours';

    return [
      idx + 1,
      escapeCSV(task.id),
      escapeCSV(task.title),
      escapeCSV(task.description || ''),
      escapeCSV(task.category || 'Général'),
      escapeCSV(task.priority || 'Moyenne'),
      escapeCSV(formatDateFr(task.dueDate)),
      escapeCSV(statusText),
      escapeCSV(formatDateTimeFr(task.createdAt)),
      escapeCSV(task.completedAt ? formatDateTimeFr(task.completedAt) : '-'),
    ].join(';');
  });

  // Prepend UTF-8 BOM (\uFEFF) so Excel opens UTF-8 characters without corruption
  const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const filename = `todolist-pro-${userName.toLowerCase().replace(/\s+/g, '-')}-${todayStr}.csv`;

  downloadBlob(blob, filename);
}

/**
 * Export JSON backup
 */
export function exportToJSON({ tasks, userProfile, categories }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const userName = userProfile?.name || 'Utilisateur';

  const exportPayload = {
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    user: userProfile,
    categories: categories,
    tasks: tasks,
    summary: {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
    },
  };

  const dataStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const filename = `todolist-pro-${userName.toLowerCase().replace(/\s+/g, '-')}-${todayStr}.json`;

  downloadBlob(blob, filename);
}
