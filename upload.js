// upload.js

document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const logoutSwitch = document.getElementById("logout-switch");

  // Drag & Drop Verhalten
  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  // Klick-Auswahl
  fileInput.addEventListener("change", function () {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      const listItem = document.createElement("li");
      listItem.textContent = file.name;

      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 1 * 1024 * 1024; // 1 MB

      const icon = document.createElement("span");
      icon.classList.add("status-icon");

      if (!validTypes.includes(file.type) || file.size > maxSize) {
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="icon error">
            <path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd"/>
          </svg>`;
        listItem.classList.add("invalid");
      } else {
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="icon valid">
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"/>
          </svg>`;
      }

      listItem.prepend(icon);
      fileList.appendChild(listItem);
    });
  }

  logoutSwitch.addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });
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
