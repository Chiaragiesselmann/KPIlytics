document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const logoutSwitch = document.getElementById("logout-switch");

  if (logoutSwitch) {
    logoutSwitch.addEventListener("change", function () {
      if (this.checked) {
        window.location.href = "index.html";
      }
    });
  }

  if (uploadArea && fileInput && fileList) {
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
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener("change", function () {
      handleFiles(fileInput.files);
    });

    function handleFiles(files) {
      fileList.innerHTML = ""; // vorherige Liste leeren
      [...files].forEach((file) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;

        const icon = document.createElement("span");
        icon.className = "status-icon processing";
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd"/>
          </svg>
        `;

        listItem.prepend(icon);
        fileList.appendChild(listItem);

        // Validierung simulieren
        setTimeout(() => {
          const valid = file.size <= 1048576 && /\.(jpg|jpeg|png|pdf)$/i.test(file.name);
          icon.className = "status-icon " + (valid ? "valid" : "error");
          icon.innerHTML = valid
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"/>
               </svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z" clip-rule="evenodd"/>
               </svg>`;
        }, 1000);
      });
    }
  }
});

// Menüfunktionen
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("hidden");
}

function toggleSettings() {
  const settingsMenu = document.getElementById("settings-menu");
  if (settingsMenu) settingsMenu.classList.toggle("hidden");
}

function toggleUserMenu() {
  const userMenu = document.getElementById("user-menu");
  if (userMenu) userMenu.classList.toggle("hidden");
}
