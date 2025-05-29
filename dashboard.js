// dashboard.js

// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

// Toggle User Menu
function toggleUserMenu() {
  const userMenu = document.getElementById("user-menu");
  userMenu.classList.toggle("hidden");
}

// Toggle Settings Menu
function toggleSettings() {
  const settingsMenu = document.getElementById("settings-menu");
  settingsMenu.classList.toggle("hidden");
}

// Handle Logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", () => {
      if (logoutSwitch.checked) {
        window.location.href = "index.html"; // Back to login page
      }
    });
  }
});

// KPI Datenstruktur
const kpiData = {
  Rezeption: {
    ADR: [120, 130, 125, 140, 150, 145],
    benchmark: [118, 128, 123, 138, 148, 143]
  },
  Restaurant: {
    "Umsatz pro Tisch": [300, 400, 350, 500, 450, 470],
    "Wareneinsatzquote": [30, 32, 31, 33, 34, 35],
    benchmark: [280, 390, 340, 480, 430, 445]
  },
  Bar: {
    Deckungsbeitrag: [50, 60, 55, 70, 75, 80],
    "Durchschn. Gästeanzahl": [200, 250, 230, 300, 280, 290],
    benchmark: [48, 58, 53, 68, 73, 78]
  }
};

const moduleSelect = document.getElementById("module-select");
const kpiSelect = document.getElementById("kpi-select");
const benchmarkToggle = document.getElementById("benchmark-toggle");
const chartCanvas = document.getElementById("kpiChart");

let chart;

function populateModules() {
  const modules = Object.keys(kpiData);
  modules.forEach(module => {
    const option = document.createElement("option");
    option.value = module;
    option.textContent = module;
    moduleSelect.appendChild(option);
  });
}

function updateKPIs() {
  const selectedModule = moduleSelect.value;
  kpiSelect.innerHTML = "";

  const moduleKPIs = Object.keys(kpiData[selectedModule]).filter(kpi => kpi !== "benchmark");
  moduleKPIs.forEach(kpi => {
    const option = document.createElement("option");
    option.value = kpi;
    option.textContent = kpi;
    kpiSelect.appendChild(option);
  });
  updateChart();
}

function updateChart() {
  const module = moduleSelect.value;
  const kpi = kpiSelect.value;
  const data = kpiData[module][kpi];
  const benchmark = benchmarkToggle.checked ? kpiData[module].benchmark : null;

  const config = {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"],
      datasets: [
        {
          label: kpi,
          data,
          borderColor: "#3d1562",
          backgroundColor: "#3d1562",
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#3d1562"
        },
        benchmark && {
          label: `${kpi} Benchmark`,
          data: benchmark,
          borderColor: "#a86adf",
          backgroundColor: "#a86adf",
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#a86adf"
        }
      ].filter(Boolean)
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartCanvas, config);
}

populateModules();
moduleSelect.addEventListener("change", updateKPIs);
kpiSelect.addEventListener("change", updateChart);
benchmarkToggle.addEventListener("change", updateChart);

// Init
document.addEventListener("DOMContentLoaded", () => {
  updateKPIs();
});
