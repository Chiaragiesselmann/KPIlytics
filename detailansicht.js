// Chart Setup
let chart;

document.addEventListener("DOMContentLoaded", function () {
  initChart();
  toggleHints(); // initialer Zustand
});

// Beispiel-Daten
const kpiData = {
  conversion: {
    label: "Conversion Rate",
    data: [2.4, 2.9, 3.1, 2.7, 3.5],
    benchmark: [2.2, 2.5, 2.8, 2.6, 2.9]
  },
  besucher: {
    label: "Besucher",
    data: [1200, 1350, 1250, 1600, 1550],
    benchmark: [1100, 1300, 1200, 1500, 1500]
  },
  umsatz: {
    label: "Umsatz (€)",
    data: [10000, 12500, 11500, 14000, 13500],
    benchmark: [9500, 12000, 11000, 13500, 13200]
  }
};

function initChart() {
  const ctx = document.getElementById("chart1").getContext("2d");
  const selectedKPI = document.getElementById("kpi-filter").value;
  const showBenchmark = document.getElementById("benchmark-toggle").checked;

  const dataset = getDatasets(selectedKPI, showBenchmark);

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mär", "Apr", "Mai"],
      datasets: dataset
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

function updateDetailChart() {
  const selectedKPI = document.getElementById("kpi-filter").value;
  const showBenchmark = document.getElementById("benchmark-toggle").checked;

  const newDatasets = getDatasets(selectedKPI, showBenchmark);

  chart.data.datasets = newDatasets;
  chart.update();
}

function getDatasets(kpiKey, showBenchmark) {
  const current = kpiData[kpiKey];
  const datasets = [
    {
      label: current.label,
      data: current.data,
      fill: false,
      borderColor: "#3d1562",
      tension: 0.3
    }
  ];

  if (showBenchmark) {
    datasets.push({
      label: "Benchmark",
      data: current.benchmark,
      fill: false,
      borderColor: "#c4b3e0",
      borderDash: [5, 5],
      tension: 0.3
    });
  }

  return datasets;
}

// KI-Hinweise ein-/ausblenden
function toggleHints() {
  const checkbox = document.getElementById("toggle-hints");
  const hintSection = document.getElementById("ai-hints-section");

  const bubbles = hintSection.querySelectorAll(".hint-bubble");
  bubbles.forEach(bubble => {
    bubble.style.display = checkbox.checked ? "none" : "block";
  });
}

// Menüfunktionen
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}
