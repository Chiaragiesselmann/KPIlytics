// Beispiel-Datenstruktur für jeden KPI und Monat
const mockData = {
  umsatz: {
    "2024-01": 10000,
    "2024-02": 12000,
    "2024-03": 11000,
    "2024-04": 13000,
    "2024-05": 12500,
    "2024-06": 14000
  },
  besucher: {
    "2024-01": 800,
    "2024-02": 950,
    "2024-03": 1000,
    "2024-04": 1200,
    "2024-05": 1150,
    "2024-06": 1300
  },
  conversion: {
    "2024-01": 1.8,
    "2024-02": 2.0,
    "2024-03": 2.5,
    "2024-04": 2.9,
    "2024-05": 2.6,
    "2024-06": 3.0
  }
};

// KI-Hinweise passend zum KPI
const aiHints = {
  umsatz: [
    "📈 Umsatzsteigerung durch gezielte Rabattaktionen möglich.",
    "💰 Achte auf saisonale Schwankungen im Umsatzverlauf."
  ],
  besucher: [
    "🚶‍♂️ Besucherzahlen steigen bei Online-Marketing-Kampagnen.",
    "🌍 Mobile Besucher machen über 60 % aus – Seite mobil optimieren!"
  ],
  conversion: [
    "🎯 Conversion Rate sinkt an Wochenenden – Teste andere Call-to-Actions.",
    "⚠️ Lange Ladezeiten beeinflussen Conversion negativ."
  ]
};

let chart;

function updateDetailChart() {
  const kpi = document.getElementById("kpiSelect").value;
  const start = document.getElementById("startDate").value;
  const end = document.getElementById("endDate").value;
  const showBenchmark = document.getElementById("benchmarkToggle").checked;

  const filteredData = getFilteredData(mockData[kpi], start, end);
  const labels = Object.keys(filteredData);
  const values = Object.values(filteredData);

  const benchmark = values.map(v => (kpi === "conversion" ? 2.5 : v * 0.9));

  // Chart aktualisieren oder neu erzeugen
  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("detailChart"), {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: kpi.charAt(0).toUpperCase() + kpi.slice(1),
          data: values,
          borderWidth: 2
        },
        ...(showBenchmark
          ? [{
              label: "Benchmark",
              data: benchmark,
              borderDash: [5, 5],
              borderWidth: 1
            }]
          : [])
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  updateChartTitle(kpi, start, end);
  updateAIHints(kpi);
}

// Filtere Monatsdaten nach Zeitraum
function getFilteredData(data, start, end) {
  const result = {};
  const startDate = new Date(start + "-01");
  const endDate = new Date(end + "-01");

  for (const [month, value] of Object.entries(data)) {
    const currentDate = new Date(month + "-01");
    if (currentDate >= startDate && currentDate <= endDate) {
      result[month] = value;
    }
  }
  return result;
}

// Charttitel aktualisieren
function updateChartTitle(kpi, start, end) {
  const monthNames = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  const startParts = start.split("-");
  const endParts = end.split("-");
  const title = `${kpi.charAt(0).toUpperCase() + kpi.slice(1)} – ${monthNames[+startParts[1] - 1]} bis ${monthNames[+endParts[1] - 1]} ${startParts[0]}`;
  document.getElementById("chartTitle").textContent = title;
}

// KI-Hinweise anzeigen
function updateAIHints(kpi) {
  const container = document.getElementById("aiHints");
  container.innerHTML = "";
  if (document.getElementById("hideHints").checked) return;

  aiHints[kpi].forEach(hint => {
    const div = document.createElement("div");
    div.classList.add("speech-bubble");
    div.innerHTML = `<span class="ai-icon">🤖</span> ${hint}`;
    container.appendChild(div);
  });
}

// KI-Hinweise ein-/ausblenden
function toggleHints() {
  updateAIHints(document.getElementById("kpiSelect").value);
}

// Menü- und User-Funktionen
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleSettingsMenu() {
  document.getElementById("settings-menu").classList.toggle("hidden");
  document.getElementById("user-menu").classList.add("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
  document.getElementById("settings-menu").classList.add("hidden");
}

// Beim Laden initialisieren
window.addEventListener("DOMContentLoaded", () => {
  updateDetailChart();
});
