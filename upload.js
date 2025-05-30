document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const analyzeButton = document.getElementById("analyzeButton");

  function resetUI() {
    fileList.innerHTML = "";
    if (analyzeButton) analyzeButton.classList.add("hidden");
  }

  function getSVG(icon) {
    switch (icon) {
      case "success":
        return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="status-icon valid">
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
          </svg>`;
      case "error":
        return `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="status-icon error">
            <path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd" />
          </svg>`;
      default:
        return "";
    }
  }

  function displayFileInfo(file, success) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${getSVG(success ? "success" : "error")}
      <span>${file.name} (${Math.round(file.size / 1024)} KB) – ${
      success ? "Upload erfolgreich" : "Upload fehlgeschlagen"
    }</span>
    `;
    fileList.appendChild(listItem);
  }

  function handleFile(file) {
    resetUI();
    if (file.size > 1 * 1024 * 1024) {
      displayFileInfo(file, false);
    } else {
      displayFileInfo(file, true);
      if (analyzeButton) analyzeButton.classList.remove("hidden");
    }
  }

  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("hover");
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("hover");
  });

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("hover");
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) handleFile(file);
  });

  // Logout
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", function () {
      if (this.checked) window.location.href = "index.html";
    });
  }

  // Analyse-Button
  if (analyzeButton) {
    analyzeButton.addEventListener("click", function () {
      window.location.href = "detailansicht.html";
    });
  }
});

// Menüfunktionen
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}
