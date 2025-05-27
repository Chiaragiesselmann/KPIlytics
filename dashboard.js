// dashboard.js

// Dummy-Daten pro Modul und KPI
const kpiData = {
  Rezeption: {
    ADR: [95, 100, 102, 97, 105, 110],
    "Umsatz pro Zimmer": [120, 130, 125, 140, 135, 145],
  },
  Restaurant: {
    "Umsatz pro Tisch": [45, 48, 50, 47, 53, 56],
    "Deckungsbeitrag": [18, 20, 19, 21, 22, 23],
  },
  Bar: {
    "Wareneinsatzquote": [25, 27, 24, 26, 28, 30],
    "Ø Gästeanzahl": [60, 65, 58, 63, 67, 70],
  }
};

let currentChart;

function updateKPIOptions(module) {
  const kpiSelect = document.getElementById("kpi-select");
  kpiSelect.innerHTML = ""; // Reset

  const options = Object.keys(kpiData[module]);
  options.forEach(kpi => {
    const opt = document.createElement("option");
    opt.value = kpi;
    opt.textContent = kpi;
    kpiSelect.appendChild(opt);
  });

  // Lade das erste KPI standardmäßig
  updateChart(module, options[0]);
}

function updateChart(module, kpi) {
  const ctx = document.getElementById("kpiChart").getContext("2d");
  if (currentChart) currentChart.destroy();

  currentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"],
      datasets: [{
        label: kpi,
        data: kpiData[module][kpi],
        borderColor: "#3d1562",
        backgroundColor: "#e6ddf4",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}

// Seitenfunktionen
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("userMenu").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settingsMenu").classList.toggle("hidden");
}

function logout() {
  window.location.href = "index.html";
}

// Event Listener Setup nach DOM-Load
window.addEventListener("DOMContentLoaded", () => {
  const moduleSelect = document.getElementById("module-select");
  const kpiSelect = document.getElementById("kpi-select");

  updateKPIOptions(moduleSelect.value);

  moduleSelect.addEventListener("change", (e) => {
    updateKPIOptions(e.target.value);
  });

  kpiSelect.addEventListener("change", (e) => {
    updateChart(moduleSelect.value, e.target.value);
  });

  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) logout();
  });
});

