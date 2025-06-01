// ================= Menü & Sidebar ==================
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}

// ================= Chart Daten ==================
const daten = {
  umsatz: {
    label: "Umsatz (€)",
    daten: [10000, 11500, 11000, 13000, 12500],
    benchmark: [9500, 10800, 10500, 11800, 12000]
  },
  conversion: {
    label: "Conversion Rate (%)",
    daten: [3.2, 3.5, 3.4, 3.9, 4.1],
    benchmark: [3.0, 3.3, 3.2, 3.5, 3.8]
  },
  besucher: {
    label: "Besucher",
    daten: [800, 950, 1000, 1200, 1100],
    benchmark: [750, 900, 920, 1100, 1080]
  }
};

const kiHinweise = {
  umsatz: [
    "📈 Die Umsätze haben sich im Vergleich zum letzten Monat um 18 % erhöht.",
    "🛒 Die Region Süd zeigt einen signifikanten Anstieg im Produktverkauf."
  ],
  conversion: [
    "🔄 Die Conversion Rate ist bei Mobilgeräten höher als bei Desktop-Besuchern.",
    "💡 Nutzer mit Gutscheinen konvertieren doppelt so häufig."
  ],
  besucher: [
    "👥 Die Besucherzahlen steigen an Wochenenden besonders stark.",
    "📱 Mobile Zugriffe machen 65 % aller Besucher aus."
  ]
};

let chart;

function updateDetailChart() {
  const kpi = document.getElementById("kpi-select").value;
  const showBenchmark = document.getElementById("benchmark-toggle").checked;

  const labels = ["Jan", "Feb", "Mär", "Apr", "Mai"];
  const kpiDaten = daten[kpi];

  const datasets = [
    {
      label: kpiDaten.label,
      data: kpiDaten.daten,
      borderColor: "#3d1562",
      backgroundColor: "rgba(61, 21, 98, 0.1)",
      fill: false,
      tension: 0.4
    }
  ];

  if (showBenchmark) {
    datasets.push({
      label: "Benchmark",
      data: kpiDaten.benchmark,
      borderColor: "#aaa",
      backgroundColor: "rgba(160,160,160,0.1)",
      borderDash: [5, 5],
      fill: false,
      tension: 0.4
    });
  }

  if (chart) chart.destroy();

  const ctx = document.getElementById("chart1").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  renderKIHinweise(kpi);
}

function renderKIHinweise(kpi) {
  const hinweisContainer = document.getElementById("ki-hinweise");
  hinweisContainer.innerHTML = "";

  const hide = document.querySelector("input[type='checkbox'][onchange*='toggleHinweise']").checked;
  if (hide) return;

  kiHinweise[kpi].forEach(text => {
    const bubble = document.createElement("div");
    bubble.className = "ki-bubble";
    bubble.innerHTML = `<span class="ai-icon">🤖</span> ${text}`;
    hinweisContainer.appendChild(bubble);
  });
}

function toggleHinweise(checkbox) {
  if (checkbox.checked) {
    document.getElementById("ki-hinweise").innerHTML = "";
  } else {
    updateDetailChart();
  }
}

// ================= Init ==================
document.addEventListener("DOMContentLoaded", () => {
  updateDetailChart();
});
