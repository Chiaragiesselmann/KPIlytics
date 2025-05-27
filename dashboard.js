// dashboard.js

// Beispiel-Daten für KPIs pro Modul
const kpiOptions = {
  rezeption: ["ADR", "Umsatz pro Zimmer"],
  restaurant: ["Umsatz pro Tisch", "Deckungsbeitrag"],
  bar: ["Durchschn. Gästeanzahl", "Wareneinsatzquote"]
};

// Initialer Chart (Liniendiagramm)
let chart;
function renderChart(label, data) {
  const ctx = document.getElementById("kpiChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Januar", "Februar", "März", "April"],
      datasets: [{
        label,
        data,
        borderColor: "#3d1562",
        backgroundColor: "#e6ddf4",
        tension: 0.3,
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: "#3d1562"
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

function updateKpiOptions() {
  const module = document.getElementById("module-select").value;
  const kpiSelect = document.getElementById("kpi-select");
  kpiSelect.innerHTML = "";
  kpiOptions[module].forEach(kpi => {
    const option = document.createElement("option");
    option.value = kpi;
    option.textContent = kpi;
    kpiSelect.appendChild(option);
  });
  renderChart(kpiSelect.value, [300, 500, 400, 450]);
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.querySelector(".user-menu").classList.toggle("hidden");
}

function toggleSettings() {
  document.querySelector(".settings-menu").classList.toggle("hidden");
}

window.onload = () => {
  // Init Filter-Optionen
  updateKpiOptions();

  // Modulwechsel – Filter aktualisieren
  document.getElementById("module-select").addEventListener("change", updateKpiOptions);

  // KPI-Auswahl – Chart neu zeichnen
  document.getElementById("kpi-select").addEventListener("change", () => {
    renderChart(document.getElementById("kpi-select").value, [100, 200, 250, 300]);
  });

  // Logout-Switch (wenn vorhanden)
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", () => {
      if (logoutSwitch.checked) window.location.href = "index.html";
    });
  }
};
