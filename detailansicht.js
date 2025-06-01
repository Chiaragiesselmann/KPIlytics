# Creating the adjusted JavaScript content for the detailansicht.html page

adjusted_js = """
document.addEventListener("DOMContentLoaded", function () {
  // Chart.js initialisieren
  const ctx = document.getElementById("chart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"],
      datasets: [{
        label: "Conversion Rate",
        data: [10, 15, 12, 18, 22, 30],
        borderColor: "#3d1562",
        backgroundColor: "rgba(61, 21, 98, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#3d1562"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#3d1562"
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "#3d1562"
          }
        },
        y: {
          ticks: {
            color: "#3d1562"
          }
        }
      }
    }
  });

  // Filter-Änderung
  document.getElementById("filter").addEventListener("change", function () {
    const value = this.value;

    const datasets = {
      "Conversion Rate": [10, 15, 12, 18, 22, 30],
      "Absprungrate": [30, 25, 22, 20, 18, 16],
      "Verweildauer": [2, 2.5, 3, 3.2, 4, 4.5]
    };

    chart.data.datasets[0].label = value;
    chart.data.datasets[0].data = datasets[value];
    chart.update();
  });

  // Menüleiste ein-/ausblenden
  window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
  };

  // Einstellungen ein-/ausblenden
  document.querySelector(".settings-icon").addEventListener("click", function () {
    document.getElementById("settings-menu").classList.toggle("hidden");
  });

  // Benutzer-Icon Dropdown
  document.querySelector(".user-icon").addEventListener("click", function () {
    document.getElementById("user-menu").classList.toggle("hidden");
  });

  // KI-Hinweise umschalten
  document.getElementById("toggle-ai").addEventListener("change", function () {
    const aiHints = document.querySelectorAll(".ai-hint");
    aiHints.forEach(hint => {
      hint.style.display = this.checked ? "none" : "block";
    });
  });
});
"""

# Save it to a file
script_path = "/mnt/data/script_detailansicht.js"
with open(script_path, "w") as f:
    f.write(adjusted_js)

script_path
