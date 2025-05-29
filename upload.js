// upload.js

document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("fileElem");
  const fileList = document.getElementById("upload-info");

  uploadArea.addEventListener("click", () => fileInput.click());

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
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  });

  fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);
    handleFiles(files);
  });

  function handleFiles(files) {
    fileList.innerHTML = ""; // Reset list
    files.forEach((file) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${file.name}</span>
        <svg class="status-icon processing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clip-rule="evenodd" />
        </svg>
        <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5Z" clip-rule="evenodd" />
        </svg>
      `;
      fileList.appendChild(listItem);

      // Simulate upload processing
      setTimeout(() => {
        const statusIcon = listItem.querySelector(".status-icon");
        statusIcon.classList.remove("processing");
        statusIcon.classList.add("valid");
        statusIcon.innerHTML = `
          <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        `;
      }, 1500);

      listItem.querySelector(".delete-icon").addEventListener("click", () => {
        listItem.remove();
      });
    });
  }
});

// Menüfunktionen
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}
