document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");

  function createStatusIcon(type) {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("class", "status-icon");

    if (type === "valid") {
      icon.classList.add("valid");
      icon.innerHTML = `<path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />`;
    } else if (type === "error") {
      icon.classList.add("error");
      icon.innerHTML = `<path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd" />`;
    } else if (type === "processing") {
      icon.classList.add("processing");
      icon.innerHTML = `<path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd" />`;
    }

    return icon;
  }

  function handleFiles(files) {
    fileList.innerHTML = "";

    Array.from(files).forEach(file => {
      const li = document.createElement("li");
      const fileName = document.createElement("span");
      fileName.textContent = file.name;

      const ext = file.name.split(".").pop().toLowerCase();
      const validExtensions = ["pdf", "xlsx", "xls"];

      let iconType = validExtensions.includes(ext) ? "valid" : "error";
      const statusIcon = createStatusIcon(iconType);
      li.appendChild(statusIcon);
      li.appendChild(fileName);

      if (iconType === "valid") {
        const analysisButton = document.createElement("button");
        analysisButton.textContent = "Zur Analyse";
        analysisButton.className = "analysis-button";
        analysisButton.onclick = () => {
          window.location.href = "detail.html";
        };
        li.appendChild(analysisButton);
      }

      fileList.appendChild(li);
    });
  }

  uploadArea.addEventListener("dragover", e => {
    e.preventDefault();
    uploadArea.classList.add("highlight");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("highlight");
  });

  uploadArea.addEventListener("drop", e => {
    e.preventDefault();
    uploadArea.classList.remove("highlight");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });
});

// Sidebar toggles
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}
