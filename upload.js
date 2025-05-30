document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const uploadArea = document.getElementById("uploadArea");
  const fileList = document.getElementById("fileList");

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    fileList.innerHTML = "";
    Array.from(files).forEach((file) => {
      const listItem = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("class", "status-icon icon");
      icon.setAttribute("viewBox", "0 0 16 16");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

      if (!allowedTypes.includes(file.type) || file.size > 1024 * 1024) {
        icon.classList.add("error");
        path.setAttribute(
          "d",
          "M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z"
        );

        const errorMsg = document.createElement("span");
        errorMsg.textContent = " Upload fehlgeschlagen: Datei ist nicht zulässig oder größer als 1 MB.";
        errorMsg.style.color = "darkred";
        errorMsg.style.fontWeight = "bold";
        errorMsg.style.marginLeft = "1rem";

        listItem.appendChild(icon);
        icon.appendChild(path);
        listItem.appendChild(name);
        listItem.appendChild(errorMsg);
      } else {
        icon.classList.add("valid");
        path.setAttribute(
          "d",
          "M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
        );

        listItem.appendChild(icon);
        icon.appendChild(path);
        listItem.appendChild(name);

        const analyzeBtn = document.createElement("button");
        analyzeBtn.textContent = "Zur Analyse";
        analyzeBtn.className = "analyze-button";
        analyzeBtn.addEventListener("click", () => {
          window.location.href = "detailansicht.html";
        });

        listItem.appendChild(analyzeBtn);
      }

      fileList.appendChild(listItem);
    });
  }

  // Menüfunktionen
  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });
});

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
