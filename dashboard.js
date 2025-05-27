// dashboard.js

// Toggle Sidebar Menu
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

// Toggle Settings Dropdown
function toggleSettings() {
  const settingsMenu = document.getElementById("settings-menu");
  settingsMenu.classList.toggle("hidden");
}

// Toggle User Dropdown
function toggleUserMenu() {
  const userMenu = document.getElementById("user-menu");
  userMenu.classList.toggle("hidden");
}

// Handle Logout Switch
function toggleLogout(switchElement) {
  if (switchElement.checked) {
    alert("Erfolgreich ausgeloggt!");
    window.location.href = "index.html";
  }
}

// Dynamically Update KPI Options based on Module
const kpiOptions = {
  Rezeption: ["ADR", "Umsatz pro Zimmer"],
  Restaurant: ["Umsatz pro Tisch", "Deckungsbeitrag"],
  Bar: ["Durchschnittliche Gästeanzahl", "Wareneinsatzquote"]
};

const moduleSelect = document.getElementById("module-select");
const kpiSelect = document.getElementById("kpi-select");

function updateKPIOptions() {
  const selectedModule = moduleSelect.value;
  const options = kpiOptions[selectedModule] || [];
  
  // Clear and repopulate KPI dropdown
  kpiSelect.innerHTML = "";
  options.forEach(kpi => {
    const option = document.createElement("option");
    option.value = kpi;
    option.textContent = kpi;
    kpiSelect.appendChild(option);
  });

  updateChart();
}

moduleSelect.addEventListener("change", updateKPIOptions);
kpiSelect.addEventListener("change", updateChart);

document.getElementById("benchmark-toggle").addEventListener("change", updateChart);

// Initialize Chart.js
const ctx = document.getElementById("kpiChart").getContext("2d");
let chart;

function updateChart() {
  const kpi = kpiSelect.value;
  const benchmark = document.getElementById("benchmark-toggle").checked;

  const exampleData = {
    labels: ["Jan", "Feb", "März", "Apr", "Mai"],
    datasets: [
      {
        label: kpi,
        data: [120, 140, 135, 160, 150],
        backgroundColor: "#a892dc"
      }
    ]
  };

  if (benchmark) {
    exampleData.datasets.push({
      label: "Benchmark",
      data: [100, 120, 125, 130, 140],
      backgroundColor: "#c4b3e0"
    });
  }

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: exampleData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Initial setup
updateKPIOptions();
