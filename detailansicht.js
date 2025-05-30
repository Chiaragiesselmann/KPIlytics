document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleInsights");
  const bubbles = document.querySelector(".insight-bubbles");

  toggle.addEventListener("change", function () {
    if (this.checked) {
      bubbles.style.display = "block";
    } else {
      bubbles.style.display = "none";
    }
  });

  // Chart.js Beispiel – muss mit Daten ergänzt werden
  const ctx = document.getElementById("analysisChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mrz", "Apr", "Mai"],
      datasets: [{
        label: "ADR",
        data: [120, 130, 125, 140, 135],
        borderColor: "#3d1562",
        backgroundColor: "rgba(61,21,98,0.1)",
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });
});
