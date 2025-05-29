document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("upload-box");
  const fileInput = document.getElementById("file-input");
  const fileButton = document.getElementById("file-button");
  const fileInfo = document.getElementById("file-info");

  const MAX_SIZE_MB = 1;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "application/pdf"];

  function createStatusIcon(type) {
    let icon = document.createElement("span");
    icon.classList.add("status-icon");

    switch (type) {
      case "success":
        icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#3d1562" width="20" height="20">
          <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        </svg>`;
        break;
      case "error":
        icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="crimson" width="20" height="20">
          <path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd" />
        </svg>`;
        break;
      case "processing":
        icon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#888" width="20" height="20">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd" />
        </svg>`;
        break;
    }

    return icon;
  }

  function showFileInfo(file, status = "success", message = "") {
    fileInfo.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.classList.add("file-info-line");

    const name = document.createElement("span");
    name.textContent = file.name;

    const icon = createStatusIcon(status);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "×";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      fileInfo.innerHTML = "";
      fileInput.value = "";
    };

    wrapper.appendChild(icon);
    wrapper.appendChild(name);
    if (message) {
      const error = document.createElement("span");
      error.textContent = " – " + message;
      error.style.marginLeft = "8px";
      error.style.color = "crimson";
      wrapper.appendChild(error);
    }
    wrapper.appendChild(removeBtn);

    fileInfo.appendChild(wrapper);
  }

  function validateAndShow(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      showFileInfo(file, "error", "Ungültiger Dateityp");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      showFileInfo(file, "error", "Datei zu groß");
      return;
    }

    showFileInfo(file, "success");
  }

  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("highlight");
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("highlight");
  });

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("highlight");

    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndShow(file);
    }
  });

  fileButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      validateAndShow(file);
    }
  });

  // Menüfunktionen (User / Einstellungen)
  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });

  window.toggleUserMenu = function () {
    document.getElementById("user-menu").classList.toggle("hidden");
  };

  window.toggleSettings = function () {
    document.getElementById("settings-menu").classList.toggle("hidden");
  };

  window.toggleSidebar = function () {
    // Optional: Sidebar später implementieren
    alert("Sidebar wurde angeklickt");
  };
});
