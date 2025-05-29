// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  const moduleSelect = document.getElementById("module-select");
  const kpiSelect = document.getElementById("kpi-select");
  const benchmarkToggle = document.getElementById("benchmark-toggle");

  const kpiChartCtx = document.getElementById("kpiChart").getContext("2d");
  let chart;

  const moduleKPIOptions = {
    Rezeption: ["ADR"],
    Restaurant: ["Umsatz pro Tisch", "Wareneinsatzquote"],
    Bar: ["Deckungsbeitrag", "Durchschn. Gästeanzahl"]
  };

  const sampleData = {
    ADR: [120, 130, 125, 140, 135],
    "Umsatz pro Tisch": [200, 250, 240, 260, 255],
    "Wareneinsatzquote": [30, 32, 31, 33, 34],
    Deckungsbeitrag: [70, 72, 74, 76, 78],
    "Durchschn. Gästeanzahl": [320, 500, 400, 410, 450]
  };

  const sampleBenchmark = {
    ADR: [115, 125, 120, 130, 128],
    "Umsatz pro Tisch": [180, 220, 210, 230, 225],
    "Wareneinsatzquote": [28, 31, 30, 32, 33],
    Deckungsbeitrag: [65, 68, 70, 72, 75],
    "Durchschn. Gästeanzahl": [300, 480, 390, 400, 430]
  };

  function populateModuleOptions() {
    for (const module in moduleKPIOptions) {
      const option = document.createElement("option");
      option.value = module;
      option.textContent = module;
      moduleSelect.appendChild(option);
    }
  }

  function populateKPIOptions(module) {
    kpiSelect.innerHTML = "";
    moduleKPIOptions[module].forEach((kpi) => {
      const option = document.createElement("option");
      option.value = kpi;
      option.textContent = kpi;
      kpiSelect.appendChild(option);
    });
  }

  function updateChart() {
    const kpi = kpiSelect.value;
    const showBenchmark = benchmarkToggle.checked;
    const labels = ["Jan", "Feb", "Mär", "Apr", "Mai"];

    const datasets = [
      {
        label: kpi,
        data: sampleData[kpi],
        borderColor: "#3d1562",
        backgroundColor: "#3d1562",
        fill: false,
        tension: 0.4,
        pointRadius: 5
      }
    ];

    if (showBenchmark) {
      datasets.push({
        label: `${kpi} Benchmark`,
        data: sampleBenchmark[kpi],
        borderColor: "#c4b3e0",
        borderDash: [5, 5],
        backgroundColor: "#c4b3e0",
        fill: false,
        tension: 0.4,
        pointRadius: 5
      });
    }

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(kpiChartCtx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" }
        },
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  }

  moduleSelect.addEventListener("change", () => {
    populateKPIOptions(moduleSelect.value);
    updateChart();
  });

  kpiSelect.addEventListener("change", updateChart);
  benchmarkToggle.addEventListener("change", updateChart);

  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });

  // Initialize
  populateModuleOptions();
  populateKPIOptions(moduleSelect.value);
  updateChart();
});

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}
