// ==== MENU / SIDEBAR LOGIK ====

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('hidden');
}

function toggleSettingsMenu() {
  const settingsMenu = document.getElementById('settings-menu');
  settingsMenu.classList.toggle('hidden');
}

function toggleUserMenu() {
  const userMenu = document.getElementById('user-menu');
  userMenu.classList.toggle('hidden');
}

// ==== CHART (Detailansicht & Dashboard) ====

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('chart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni'],
        datasets: [
          {
            label: 'Umsatz (in €)',
            data: [12000, 14000, 13000, 16000, 19000, 22000],
            borderColor: '#3d1562',
            backgroundColor: 'rgba(61, 21, 98, 0.2)',
            fill: true,
            pointBackgroundColor: '#3d1562',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#3d1562'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#3d1562' }
          },
          y: {
            ticks: { color: '#3d1562' }
          }
        }
      }
    });
  }

  // ==== KI-HINWEISE EIN-/AUSBLENDEN ====
  const toggleCheckbox = document.getElementById('toggle-hints');
  if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', () => {
      document.querySelectorAll('.ai-hint').forEach((hint) => {
        hint.style.display = toggleCheckbox.checked ? 'none' : 'block';
      });
    });
  }
});

// ==== FILE-UPLOAD (optional für Analyse) ====

const uploadArea = document.querySelector('.upload-area');
if (uploadArea) {
  uploadArea.addEventListener('click', () => {
    document.getElementById('file-input')?.click();
  });

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('hover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('hover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('hover');
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0]);
    }
  });
}

function handleFileUpload(file) {
  // Hier kannst du die Logik zur Dateiverarbeitung hinzufügen
  console.log('Datei empfangen:', file.name);
}

// ==== Filter-Logik (optional erweiterbar) ====

const filterSelect = document.getElementById('filter-select');
if (filterSelect) {
  filterSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    console.log('Filter gewählt:', selected);
    // Beispielhafte Umsetzung
    // Chart-Daten dynamisch anpassen oder Analyse-Hinweise aktualisieren
  });
}
