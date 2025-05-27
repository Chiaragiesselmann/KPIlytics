// dashboard.js

const chartCanvas = document.getElementById('kpiChart');
let chartInstance;

const kpiData = {
  Rezeption: {
    ADR: [120, 130, 125, 140, 135],
    'Umsatz pro Zimmer': [200, 220, 210, 230, 225]
  },
  Restaurant: {
    'Umsatz pro Tisch': [300, 320, 310, 330, 340],
    Deckungsbeitrag: [150, 160, 155, 170, 165]
  },
  Bar: {
    'Durchschn. Gästeanzahl': [320, 400, 500, 400, 450],
    Wareneinsatzquote: [60, 58, 59, 57, 56]
  }
};

const benchmarkData = {
  Rezeption: {
    ADR: [125, 128, 122, 138, 130],
    'Umsatz pro Zimmer': [190, 210, 205, 225, 215]
  },
  Restaurant: {
    'Umsatz pro Tisch': [290, 310, 300, 320, 330],
    Deckungsbeitrag: [145, 155, 150, 165, 160]
  },
  Bar: {
    'Durchschn. Gästeanzahl': [310, 390, 480, 390, 440],
    Wareneinsatzquote: [62, 60, 61, 59, 58]
  }
};

const kpiSelect = document.getElementById('kpi-select');
const moduleSelect = document.getElementById('module-select');
const benchmarkToggle = document.getElementById('benchmark-toggle');

function updateKPIOptions() {
  const selectedModule = moduleSelect.value;
  const kpis = Object.keys(kpiData[selectedModule]);

  kpiSelect.innerHTML = '';
  kpis.forEach(kpi => {
    const option = document.createElement('option');
    option.value = kpi;
    option.textContent = kpi;
    kpiSelect.appendChild(option);
  });
}

function updateChart() {
  const selectedModule = moduleSelect.value;
  const selectedKPI = kpiSelect.value;
  const showBenchmark = benchmarkToggle.checked;

  const labels = ['Januar', 'Februar', 'März', 'April', 'Mai'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: selectedKPI,
        data: kpiData[selectedModule][selectedKPI],
        fill: false,
        borderColor: '#3d1562',
        backgroundColor: '#3d1562',
        tension: 0.4
      }
    ]
  };

  if (showBenchmark) {
    data.datasets.push({
      label: `Benchmark: ${selectedKPI}`,
      data: benchmarkData[selectedModule][selectedKPI],
      fill: false,
      borderColor: '#b18bd3',
      backgroundColor: '#b18bd3',
      borderDash: [5, 5],
      tension: 0.4
    });
  }

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#3d1562'
          }
        }
      },
      scales: {
        y: {
          ticks: {
            color: '#3d1562'
          }
        },
        x: {
          ticks: {
            color: '#3d1562'
          }
        }
      }
    }
  };

  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(chartCanvas, config);
}

moduleSelect.addEventListener('change', () => {
  updateKPIOptions();
  updateChart();
});

kpiSelect.addEventListener('change', updateChart);
benchmarkToggle.addEventListener('change', updateChart);

// Initial setup
updateKPIOptions();
updateChart();

// Sidebar & Toggle Menu
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('hidden');
}

function toggleUserMenu() {
  document.getElementById('user-menu').classList.toggle('hidden');
}

function toggleSettings() {
  document.getElementById('settings-menu').classList.toggle('hidden');
}

const logoutSwitch = document.getElementById("logout-switch");
if (logoutSwitch) {
  logoutSwitch.addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });
}
