const ctx = document.getElementById('kpiChart');
const kpiChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    datasets: [{
      label: 'Umsatz pro Tisch (€)',
      data: [150, 180, 120, 160, 210, 250, 190],
      backgroundColor: 'rgba(102, 51, 153, 0.2)',
      borderColor: 'rgba(102, 51, 153, 1)',
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Menü-Logik
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('hidden');
}

function toggleSettings() {
  alert('Einstellungen öffnen'); // später durch echtes Modal ersetzen
}

function toggleUserMenu() {
  alert('Usermenü anzeigen'); // später durch echtes Menü ersetzen
}
