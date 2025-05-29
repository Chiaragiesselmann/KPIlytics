// upload.js

document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("upload-box");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");

  // Menüaktionen
  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });

  // Drag & Drop
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
    handleFiles(e.dataTransfer.files);
  });

  // Datei auswählen über Button
  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    [...files].forEach((file) => {
      const li = document.createElement("li");

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "icon status-icon processing");
      icon.setAttribute("viewBox", "0 0 16 16");
      icon.innerHTML = `<path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd"/>`;

      const fileName = document.createElement("span");
      fileName.textContent = file.name;

      const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      deleteIcon.setAttribute("class", "icon delete-icon");
      deleteIcon.setAttribute("viewBox", "0 0 16 16");
      deleteIcon.innerHTML = `<path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd"/>`;

      deleteIcon.addEventListener("click", () => li.remove());

      li.appendChild(icon);
      li.appendChild(fileName);
      li.appendChild(deleteIcon);
      fileList.appendChild(li);

      // Simulation eines Uploads
      setTimeout(() => {
        icon.classList.remove("processing");
        if (file.size < 1000000 && ["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
          icon.classList.add("valid");
          icon.innerHTML = `<path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />`;
        } else {
          icon.classList.add("error");
          icon.innerHTML = `<path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd" />`;
        }
      }, 1000);
    });
  }
});

// Menüsteuerung
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}
