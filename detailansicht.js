

  // Settings toggle
  window.toggleSettings = function () {
    document.getElementById("settings-menu").classList.toggle("hidden");
  };

  // User menu toggle
  window.toggleUserMenu = function () {
    document.getElementById("user-menu").classList.toggle("hidden");
  };

  // Logout action
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", function () {
      if (this.checked) {
        window.location.href = "index.html";
      }
    });
  }

  // KI-Hinweis Toggle
  const toggleHintsCheckbox = document.getElementById("toggleHints");
  const aiHintsContainer = document.getElementById("aiHints");

  if (toggleHintsCheckbox && aiHintsContainer) {
    toggleHintsCheckbox.addEventListener("change", function () {
      aiHintsContainer.style.display = this.checked ? "block" : "none";
    });
  }

  // Chart.js - Demo Chart
  const ctx = document.getElementById("detailChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mär", "Apr", "Mai"],
      datasets: [
        {
          label: "ADR",
          data: [120, 130, 125, 140, 135],
          borderColor: "#3d1562",
          backgroundColor: "rgba(61, 21, 98, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: "Benchmark",
          data: [115, 125, 120, 130, 125],
          borderColor: "#a688cc",
          borderDash: [5, 5],
          backgroundColor: "rgba(166, 136, 204, 0.1)",
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Detailanalyse ADR vs. Benchmark",
        },
      },
    },
  });
});
