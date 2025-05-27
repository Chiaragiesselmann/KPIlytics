// === dashboard.js ===

document.addEventListener("DOMContentLoaded", function () {
  const moduleSelect = document.getElementById("module-select");
  const kpiSelect = document.getElementById("kpi-select");
  const benchmarkToggle = document.getElementById("benchmark-toggle");
  const userIcon = document.getElementById("user-icon");
  const settingsIcon = document.getElementById("settings-icon");
  const logoutMenu = document.getElementById("logout-menu");
  const settingsMenu = document.getElementById("settings-menu");
  const logoutSwitch = document.getElementById("logout-switch");

  const kpiOptions = {
    Rezeption: ["ADR", "Umsatz pro Zimmer"],
    Restaurant: ["Umsatz pro Tisch", "Deckungsbeitrag"],
    Bar: ["Durchschn. Gästeanzahl", "Wareneinsatzquote"]
  };

  const chartCtx = document.getElementById("kpiChart").getContext("2d");
  let kpiChart = null;

  function updateKPIOptions() {
    const selectedModule = moduleSelect.value;
    const options = kpiOptions[selectedModule] || [];
    kpiSelect.innerHTML = "";
    options.forEach(kpi => {
      const option = document.createElement("option");
      option.textContent = kpi;
      kpiSelect.appendChild(option);
    });
    updateChart();
  }

  function getSampleData(kpi) {
    const samples = {
      "ADR": [120, 130, 125, 123, 140, 135],
      "Umsatz pro Zimmer": [200, 190, 210, 205, 215, 220],
      "Umsatz pro Tisch": [50, 55, 53, 60, 58, 65],
      "Deckungsbeitrag": [70, 75, 80, 78, 85, 90],
      "Durchschn. Gästeanzahl": [320, 410, 500, 400, 395, 450],
      "Wareneinsatzquote": [30, 32, 28, 35, 34, 36]
    };
    return samples[kpi] || [0, 0, 0, 0, 0, 0];
  }

  function getBenchmarkData(kpi) {
    const variation = getSampleData(kpi).map(val => val * (0.9 + Math.random() * 0.2));
    return variation;
  }

  function updateChart() {
    const selectedKPI = kpiSelect.value;
    const data = getSampleData(selectedKPI);
    const labels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"];

    const datasets = [
      {
        label: selectedKPI,
        data,
        borderColor: "#3d1562",
        backgroundColor: "#3d1562",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#3d1562"
      }
    ];

    if (benchmarkToggle.checked) {
      datasets.push({
        label: "Benchmark",
        data: getBenchmarkData(selectedKPI),
        borderColor: "#c4b3e0",
        backgroundColor: "#c4b3e0",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#c4b3e0"
      });
    }

    if (kpiChart) {
      kpiChart.data.labels = labels;
      kpiChart.data.datasets = datasets;
      kpiChart.update();
    } else {
      kpiChart = new Chart(chartCtx, {
        type: "line",
        data: {
          labels,
          datasets
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            }
          }
        }
      });
    }
  }

  function toggleMenu(menuElement) {
    menuElement.classList.toggle("show");
  }

  // Event Listeners
  moduleSelect.addEventListener("change", updateKPIOptions);
  kpiSelect.addEventListener("change", updateChart);
  benchmarkToggle.addEventListener("change", updateChart);

  userIcon.addEventListener("click", () => toggleMenu(logoutMenu));
  settingsIcon.addEventListener("click", () => toggleMenu(settingsMenu));

  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", () => {
      if (logoutSwitch.checked) {
        window.location.href = "index.html";
      }
    });
  }

  // Initial Setup
  updateKPIOptions();
});
