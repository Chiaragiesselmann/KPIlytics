

// Kontaktformular – einfaches Demo-Verhalten
function submitContactForm(event) {
  event.preventDefault(); // Verhindert Seitenreload beim Absenden

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Bitte fülle alle Pflichtfelder aus.");
    return;
  }

  // Platzhalter-Logik – in echtem Backend an API senden
  alert("Vielen Dank für deine Nachricht! Wir melden uns zeitnah.");

  // Formular zurücksetzen
  document.querySelector(".contact-form").reset();
}

// Menüfunktionen übernehmen (wie auf Dashboard-Seite)
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
  document.getElementById("user-menu").classList.add("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
  document.getElementById("settings-menu").classList.add("hidden");
}

// Logout-Schalter
document.addEventListener("DOMContentLoaded", () => {
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", () => {
      if (logoutSwitch.checked) {
        window.location.href = "index.html"; // Zur Login-Seite
      }
    });
  }
});
