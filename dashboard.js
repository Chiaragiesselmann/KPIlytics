document.addEventListener("DOMContentLoaded", () => {
  const moduleSelect = document.getElementById("module-select");
  const kpiSelect = document.getElementById("kpi-select");
  const benchmarkToggle = document.getElementById("benchmark-toggle");
  const logoutSwitch = document.getElementById("logout-switch");
  const userMenu = document.getElementById("user-menu");
  const settingsMenu = document.getElementById("settings-menu");

  document.getElementById("user-icon").addEventListener("click", () => {
    userMenu.classList.toggle("hidden");
    settingsMenu.classList.add("hidden");
  });

  document.getElementById("settings-icon").addEventListener("click", () => {
    settingsMenu.classList.toggle("hidden");
    userMenu.classList.add("hidden");
  });

  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", () => {
      if (logoutSwitch.checked) {
        window.location.href = "index.html";
      }
    });
  }

  const kpiOptions = {
    Rezeption: ["ADR"],
    Restaurant: ["Umsatz pro Tisch", "Wareneinsatzquote"],
    Bar: ["Durchschn. Gästeanzahl", "Deckungsbeitrag"]
  };

  function updateKpiOptions() {
    const selectedModule = moduleSelect.value;
    const options = kpiOptions[selectedModule] || [];

    kpiSelect.innerHTML = "";
    options.forEach(option => {
      const opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      kpiSelect.appendChild(opt);
    });
    updateChart();
  }

  function getChartData(module, kpi, withBenchmark = false) {
    const labels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"];
    let data, benchmarkData;

    switch (kpi) {
      case "ADR":
        data = [120, 130, 125, 123, 140, 135];
        benchmarkData = [125, 128, 122, 126, 138, 130];
        break;
      case "Umsatz pro Tisch":
        data = [450, 460, 430, 410, 480, 460];
        benchmarkData = [470, 455, 440, 425, 470, 450];
        break;
      case "Wareneinsatzquote":
        data = [30, 32, 31, 33, 34, 35];
        benchmarkData = [28, 31, 30, 32, 33, 34];
        break;
      case "Durchschn. Gästeanzahl":
        data = [320, 400, 500, 420, 410, 450];
        benchmarkData = [310, 390, 490, 415, 405, 445];
        break;
      case "Deckungsbeitrag":
        data = [80, 90, 85, 88, 92, 95];
        benchmarkData = [75, 88, 82, 85, 90, 92];
        break;
      default:
        data = [0, 0, 0, 0, 0, 0];
        benchmarkData = [0, 0, 0, 0, 0, 0];
    }

    return {
      labels,
      datasets: [
        {
          label: kpi,
          data: data,
          borderColor: "#3d1562",
          backgroundColor: "#3d1562",
          fill: false,
          tension: 0.4
        },
        ...(withBenchmark
          ? [
              {
                label: `${kpi} Benchmark`,
                data: benchmarkData,
                borderColor: "#9e77cf",
                backgroundColor: "#9e77cf",
                borderDash: [5, 5],
                fill: false,
                tension: 0.4
              }
            ]
          : [])
      ]
    };
  }

  const ctx = document.getElementById("kpiChart").getContext("2d");
  let kpiChart = new Chart(ctx, {
    type: "line",
    data: getChartData(moduleSelect.value, kpiSelect.value),
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });

  function updateChart() {
    const newData = getChartData(moduleSelect.value, kpiSelect.value, benchmarkToggle.checked);
    kpiChart.data = newData;
    kpiChart.update();
  }

  moduleSelect.addEventListener("change", updateKpiOptions);
  kpiSelect.addEventListener("change", updateChart);
  benchmarkToggle.addEventListener("change", updateChart);

  updateKpiOptions();
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}
