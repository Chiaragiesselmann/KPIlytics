document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("detailChart").getContext("2d");
  let currentChart = null;

  function createChart(label, data) {
    if (currentChart) currentChart.destroy();

    currentChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Januar", "Februar", "März", "April", "Mai", "Juni"],
        datasets: [
          {
            label: label,
            data: data,
            borderColor: "#3d1562",
            backgroundColor: "rgba(61, 21, 98, 0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#3d1562",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "#3d1562",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#3d1562",
            },
          },
          y: {
            ticks: {
              color: "#3d1562",
            },
          },
        },
      },
    });
  }

  function getDataSet(kpi) {
    switch (kpi) {
      case "umsatz":
        return [12000, 15000, 13000, 17000, 21000, 28000];
      case "buchungen":
        return [80, 95, 70, 110, 150, 200];
      case "conversion":
        return [2.5, 2.8, 3.0, 3.3, 3.8, 4.1];
      default:
        return [];
    }
  }

  window.updateChart = function () {
    const selectedKpi = document.getElementById("kpi-select").value;
    const labelMap = {
      umsatz: "Umsatz (in €)",
      buchungen: "Buchungen",
      conversion: "Conversion Rate (%)",
    };
    const data = getDataSet(selectedKpi);
    createChart(labelMap[selectedKpi], data);
  };

  // Initiale Anzeige
  updateChart();

  // KI-Hinweise umschalten
  window.toggleAiHints = function () {
    const aiSection = document.getElementById("ai-hints");
    aiSection.style.display = aiSection.style.display === "none" ? "block" : "none";
  };

  // Menüfunktionen
  window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("hidden");
  };

  window.toggleSettings = function () {
    document.getElementById("settings-menu").classList.toggle("hidden");
  };

  window.toggleUserMenu = function () {
    document.getElementById("user-menu").classList.toggle("hidden");
  };

  // Logout-Switch
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", function () {
      if (this.checked) {
        window.location.href = "index.html";
      }
    });
  }
});
