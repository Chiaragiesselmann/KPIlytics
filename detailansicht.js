// ==== Menüs ====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('hidden');
}

function toggleSettings() {
  document.getElementById('settings-menu').classList.toggle('hidden');
}

function toggleUserMenu() {
  document.getElementById('user-menu').classList.toggle('hidden');
}

// ==== Beispieldaten ====
const beispielDaten = {
  Umsatz: {
    "2024-01": 10000, "2024-02": 11000, "2024-03": 10500,
    "2024-04": 12000, "2024-05": 11500, "2024-06": 13000
  },
  Besucher: {
    "2024-01": 800, "2024-02": 850, "2024-03": 820,
    "2024-04": 900, "2024-05": 870, "2024-06": 910
  },
  "Conversion Rate": {
    "2024-01": 2.1, "2024-02": 2.4, "2024-03": 2.2,
    "2024-04": 2.7, "2024-05": 2.6, "2024-06": 2.8
  }
};

const benchmarkDaten = {
  Umsatz: 11500,
  Besucher: 850,
  "Conversion Rate": 2.5
};

const kiHinweise = {
  Umsatz: (von, bis) => [
    `Der Umsatz stieg zwischen ${von} und ${bis} um 15 % im Vergleich zum Vorzeitraum.`,
    `Auffällig hoher Umsatz im Mai durch Werbekampagnen.`
  ],
  Besucher: (von, bis) => [
    `Zwischen ${von} und ${bis} erhöhte sich die Besucherzahl kontinuierlich.`,
    `Im April wurde die höchste Besucherzahl im ersten Halbjahr erreicht.`
  ],
  "Conversion Rate": (von, bis) => [
    `Die Conversion Rate lag im gewählten Zeitraum bei durchschnittlich 2.6 %.`,
    `Mobile Nutzer konvertieren besser als Desktop-Nutzer im Zeitraum ${von} bis ${bis}.`
  ]
};

// ==== Hilfsfunktionen ====
function formatMonat(dateStr) {
  const [jahr, monat] = dateStr.split("-");
  const monate = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  return `${monate[parseInt(monat, 10) - 1]} ${jahr}`;
}

function monatsbereich(start, ende) {
  const out = [];
  const startDate = new Date(start + "-01");
  const endDate = new Date(ende + "-01");
  while (startDate <= endDate) {
    const y = startDate.getFullYear();
    const m = (startDate.getMonth() + 1).toString().padStart(2, '0');
    out.push(`${y}-${m}`);
    startDate.setMonth(startDate.getMonth() + 1);
  }
  return out;
}

// ==== Chart initialisieren ====
let chart;

function applyFilter() {
  const kpi = document.getElementById("kpiSelect").value;
  const von = document.getElementById("von").value;
  const bis = document.getElementById("bis").value;
  const benchmark = document.getElementById("benchmarkToggle").checked;

  const labels = monatsbereich(von, bis).map(formatMonat);
  const werte = monatsbereich(von, bis).map(monat => beispielDaten[kpi][monat] || null);
  const benchmarkWerte = benchmark ? monatsbereich(von, bis).map(() => benchmarkDaten[kpi]) : [];

  const title = `${kpi} – ${formatMonat(von)} bis ${formatMonat(bis)}`;
  document.getElementById("chartTitle").innerText = title;

  const datasets = [{
    label: kpi,
    data: werte,
    borderColor: '#3d1562',
    backgroundColor: '#3d1562',
    fill: false,
    tension: 0.3,
    pointRadius: 4,
    pointBackgroundColor: '#3d1562'
  }];

  if (benchmark) {
    datasets.push({
      label: "Benchmark",
      data: benchmarkWerte,
      borderColor: '#c4b3e0',
      borderDash: [5, 5],
      fill: false,
      tension: 0.3
    });
  }

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets = datasets;
    chart.update();
  } else {
    const ctx = document.getElementById("chart1").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#3d1562'
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: '#3d1562'
            }
          },
          x: {
            ticks: {
              color: '#3d1562'
            }
          }
        }
      }
    });
  }

  // ==== KI Hinweise ====
  const hintsContainer = document.getElementById("kiHints");
  hintsContainer.innerHTML = "";

  const hinweise = kiHinweise[kpi](formatMonat(von), formatMonat(bis));
  hinweise.forEach(text => {
    const bubble = document.createElement("div");
    bubble.className = "ki-bubble";
    bubble.innerHTML = `<span class="ki-icon">🤖</span>${text}`;
    hintsContainer.appendChild(bubble);
  });
}

// Beim Laden initial aufrufen
window.onload = applyFilter;
