// upload.js

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("file-input");
  const uploadBox = document.getElementById("upload-box");
  const fileList = document.getElementById("file-list");
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxSize = 1 * 1024 * 1024; // 1MB

  const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" fill="#3d1562" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" fill="#3d1562" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd"/></svg>',
    progress: '<svg xmlns="http://www.w3.org/2000/svg" fill="#3d1562" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd"/></svg>'
  };

  function showFiles(files) {
    fileList.innerHTML = "";
    [...files].forEach(file => {
      const li = document.createElement("li");

      if (!allowedTypes.includes(file.type)) {
        li.innerHTML = icons.error + " " + file.name + " – ungültiger Typ";
      } else if (file.size > maxSize) {
        li.innerHTML = icons.error + " " + file.name + " – zu groß";
      } else {
        li.innerHTML = icons.success + " " + file.name + " – bereit";
      }

      fileList.appendChild(li);
    });
  }

  uploadBox.addEventListener("click", () => fileInput.click());

  uploadBox.addEventListener("dragover", e => {
    e.preventDefault();
    uploadBox.classList.add("drag-over");
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("drag-over");
  });

  uploadBox.addEventListener("drop", e => {
    e.preventDefault();
    uploadBox.classList.remove("drag-over");
    showFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", () => {
    showFiles(fileInput.files);
  });

  // Logout
  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) window.location.href = "index.html";
  });
});

// Menü-Funktionen
function toggleSidebar() {
  document.getElementById("sidebar")?.classList.toggle("hidden");
}
function toggleUserMenu() {
  document.getElementById("user-menu")?.classList.toggle("hidden");
}
function toggleSettings() {
  document.getElementById("settings-menu")?.classList.toggle("hidden");
}
