const ctx = document.getElementById("detailChart").getContext("2d");

let detailChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mär", "Apr", "Mai"],
    datasets: [],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
});

const kpiData = {
  umsatz: {
    labels: ["Jan", "Feb", "Mär", "Apr", "Mai"],
    values: [10000, 12000, 11000, 13000, 12500],
    benchmark: [9500, 11500, 10800, 12500, 12300],
    hints: [
      "🧠 Die Nutzerzahlen haben sich im Vergleich zum letzten Monat um 18 % erhöht.",
      "🧠 Der Umsatz überstieg im April den Durchschnitt um 12 %.",
    ],
  },
  besucher: {
    labels: ["Jan", "Feb", "Mär", "Apr", "Mai"],
    values: [5000, 6500, 6200, 7000, 6800],
    benchmark: [4800, 6300, 6000, 6800, 6700],
    hints: [
      "🧠 Im März kamen besonders viele Besucher über mobile Geräte.",
      "🧠 Die Besucherzahlen steigen kontinuierlich seit Jahresbeginn.",
    ],
  },
  conversion: {
    labels: ["Jan", "Feb", "Mär", "Apr", "Mai"],
    values: [2.5, 2.8, 2.9, 3.0, 2.95],
    benchmark: [2.4, 2.6, 2.7, 2.9, 2.8],
    hints: [
      "🧠 Die Conversion Rate ist bei Mobilgeräten höher als bei Desktop-Besuchern.",
      "🧠 Höchste Conversion im April erreicht.",
    ],
  },
};

function updateDetailChart() {
  const selectedKPI = document.getElementById("kpiSelect").value;
  const showBenchmark = document.getElementById("benchmarkToggle").checked;
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;

  const data = kpiData[selectedKPI];

  // Zeitraum-Filterung (vereinfachtes Beispiel – alle Monate werden angezeigt)
  const labels = data.labels;
  const values = data.values;
  const benchmark = data.benchmark;

  let datasets = [
    {
      label: selectedKPI.charAt(0).toUpperCase() + selectedKPI.slice(1),
      data: values,
      borderColor: "#3d1562",
      backgroundColor: "#3d1562",
      tension: 0.4,
    },
  ];

  if (showBenchmark) {
    datasets.push({
      label: "Benchmark",
      data: benchmark,
      borderColor: "#c4b3e0",
      borderDash: [5, 5],
      tension: 0.4,
    });
  }

  detailChart.data.labels = labels;
  detailChart.data.datasets = datasets;
  detailChart.update();

  updateHints(selectedKPI);
}

function updateHints(kpiKey) {
  const container = document.getElementById("aiHints");
  container.innerHTML = "";

  if (document.getElementById("hideHints").checked) return;

  kpiData[kpiKey].hints.forEach((hint) => {
    const hintEl = document.createElement("div");
    hintEl.className = "hint-bubble";
    hintEl.innerHTML = `<span class="ai-icon">🤖</span> ${hint}`;
    container.appendChild(hintEl);
  });
}

function toggleHints() {
  const kpiKey = document.getElementById("kpiSelect").value;
  updateHints(kpiKey);
}

// Init auf Seite laden
window.onload = () => {
  updateDetailChart();
};
