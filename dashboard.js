document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const settingsMenu = document.getElementById("settings-menu");
  const userMenu = document.getElementById("user-menu");
  const logoutSwitch = document.getElementById("logout-switch");
  const userIcon = document.getElementById("user-icon");
  const settingsIcon = document.getElementById("settings-icon");

  document.getElementById("menu-toggle").addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

  if (userIcon) {
    userIcon.addEventListener("click", () => {
      userMenu.classList.toggle("hidden");
      settingsMenu.classList.add("hidden");
    });
  }

  if (settingsIcon) {
    settingsIcon.addEventListener("click", () => {
      settingsMenu.classList.toggle("hidden");
      userMenu.classList.add("hidden");
    });
  }

  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", () => {
      if (logoutSwitch.checked) {
        window.location.href = "index.html";
      }
    });
  }

  const moduleSelect = document.getElementById("module-select");
  const kpiSelect = document.getElementById("kpi-select");
  const benchmarkToggle = document.getElementById("benchmark-toggle");
  const ctx = document.getElementById("kpiChart").getContext("2d");

  const kpiOptions = {
    Rezeption: ["ADR"],
    Restaurant: ["Umsatz pro Tisch", "Wareneinsatzquote"],
    Bar: ["Deckungsbeitrag", "Durchschn. Gästeanzahl"],
  };

  const kpiData = {
    "ADR": [120, 130, 125, 140, 135, 132],
    "Umsatz pro Tisch": [80, 85, 90, 100, 105, 110],
    "Wareneinsatzquote": [30, 32, 31, 33, 34, 35],
    "Deckungsbeitrag": [60, 65, 63, 68, 70, 72],
    "Durchschn. Gästeanzahl": [300, 350, 400, 380, 420, 450]
  };

  const benchmarkData = {
    "ADR": [118, 128, 123, 138, 133, 130],
    "Umsatz pro Tisch": [75, 80, 85, 95, 100, 105],
    "Wareneinsatzquote": [28, 31, 30, 32, 33, 34],
    "Deckungsbeitrag": [58, 63, 61, 66, 68, 70],
    "Durchschn. Gästeanzahl": [290, 340, 390, 370, 410, 440]
  };

  const labels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"];

  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: []
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' }
      }
    }
  });

  function updateKPIOptions() {
    const selectedModule = moduleSelect.value;
    const options = kpiOptions[selectedModule];
    kpiSelect.innerHTML = "";
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      kpiSelect.appendChild(option);
    });
    updateChart();
  }

  function updateChart() {
    const selectedKPI = kpiSelect.value;
    const showBenchmark = benchmarkToggle.checked;

    const datasets = [
      {
        label: selectedKPI,
        data: kpiData[selectedKPI],
        borderColor: "#3d1562",
        backgroundColor: "#3d1562",
        tension: 0.3,
        fill: false,
        pointRadius: 4
      }
    ];

    if (showBenchmark && benchmarkData[selectedKPI]) {
      datasets.push({
        label: `${selectedKPI} Benchmark`,
        data: benchmarkData[selectedKPI],
        borderColor: "#a678dd",
        backgroundColor: "#a678dd",
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
        pointRadius: 4
      });
    }

    chart.data.datasets = datasets;
    chart.update();
  }

  moduleSelect.addEventListener("change", updateKPIOptions);
  kpiSelect.addEventListener("change", updateChart);
  benchmarkToggle.addEventListener("change", updateChart);

  updateKPIOptions();
});
