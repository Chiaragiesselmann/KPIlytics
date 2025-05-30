document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const uploadStatus = document.getElementById("uploadStatus");
  const analyzeButton = document.getElementById("analyzeButton");

  function showStatus(message, isSuccess) {
    uploadStatus.textContent = message;
    uploadStatus.className = isSuccess ? "upload-status success" : "upload-status error";
    if (isSuccess) {
      analyzeButton.classList.remove("hidden");
    } else {
      analyzeButton.classList.add("hidden");
    }
  }

  function handleFiles(files) {
    fileList.innerHTML = "";
    uploadStatus.textContent = "";
    analyzeButton.classList.add("hidden");

    Array.from(files).forEach(file => {
      const li = document.createElement("li");
      li.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;

      if (file.size > 1024 * 1024) {
        showStatus("Upload fehlgeschlagen: Datei ist größer als 1 MB.", false);
        li.classList.add("error");
      } else if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
        showStatus("Upload fehlgeschlagen: Ungültiges Dateiformat.", false);
        li.classList.add("error");
      } else {
        li.classList.add("success");
        showStatus("Upload erfolgreich!", true);
      }

      fileList.appendChild(li);
    });
  }

  // Drag & Drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("highlight");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("highlight");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("highlight");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  // Datei-Auswahl
  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  // Logout-Switch
  const logoutSwitch = document.getElementById("logout-switch");
  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", function () {
      if (this.checked) {
        window.location.href = "index.html";
      }
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
