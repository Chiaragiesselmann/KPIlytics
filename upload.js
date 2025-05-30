document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const logoutSwitch = document.getElementById("logout-switch");

  // Drag and Drop Events
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("hover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("hover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("hover");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    [...files].forEach(file => {
      const listItem = document.createElement("li");
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const sizeOK = file.size <= 1024 * 1024;
      const typeOK = validTypes.includes(file.type);

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("viewBox", "0 0 16 16");
      icon.setAttribute("class", "status-icon");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      if (typeOK && sizeOK) {
        path.setAttribute("d", "M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z");
        icon.classList.add("valid");
      } else {
        path.setAttribute("d", "M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z");
        icon.classList.add("error");
      }

      icon.appendChild(path);
      listItem.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
      listItem.prepend(icon);
      fileList.appendChild(listItem);
    });
  }

  // Logout-Switch
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
  const settings = document.getElementById("settings-menu");
  if (settings) settings.classList.toggle("hidden");
}

function toggleUserMenu() {
  const userMenu = document.getElementById("user-menu");
  if (userMenu) userMenu.classList.toggle("hidden");
}
