document.addEventListener("DOMContentLoaded", function () {
  // Sidebar toggle
  window.toggleSidebar = function () {
    document.getElementById("sidebar").classList.toggle("active");
  };

  // Settings toggle
  window.toggleSettings = function () {
    const menu = document.getElementById("settings-menu");
    menu.classList.toggle("hidden");
  };

  // KI-Toggle
  const aiToggle = document.getElementById("disable-ai");
  const bubbles = document.querySelectorAll(".speech-bubble");

  aiToggle.addEventListener("change", function () {
    bubbles.forEach(bubble => {
      bubble.style.display = this.checked ? "none" : "flex";
    });
  });

  // Chart Setup (ähnlich dem Dashboard)
  const ctx = document.getElementById('detailChart').getContext('2d');
  const detailChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni'],
      datasets: [{
        label: 'Umsatz (in €)',
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        fill: true,
        borderColor: '#6A1B9A',
        backgroundColor: 'rgba(106, 27, 154, 0.2)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#333'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#555'
          },
          grid: {
            display: false
          }
        },
        y: {
          ticks: {
            color: '#555'
          },
          grid: {
            color: '#eee'
          }
        }
      }
    }
  });
});
