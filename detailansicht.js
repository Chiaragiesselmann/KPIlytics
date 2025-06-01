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
    const m = (startDate.getMonth() + 1).toString().
