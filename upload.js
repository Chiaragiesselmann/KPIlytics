// upload.js

document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("file-upload");
  const fileList = document.getElementById("file-list");

  // Sidebar & User Settings
  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });

  window.toggleSidebar = function () {
    document.getElementById("sidebar").classList.toggle("hidden");
  };

  window.toggleUserMenu = function () {
    document.getElementById("user-menu").classList.toggle("hidden");
  };

  window.toggleSettings = function () {
    document.getElementById("settings-menu").classList.toggle("hidden");
  };

  // Dropzone Events
  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragleave", function () {
    dropzone.classList.remove("dragover");
  });

  dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", function () {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    fileList.classList.remove("hidden");
    [...files].forEach(file => {
      const row = document.createElement("div");
      row.classList.add("file-row");
      row.innerHTML = `
        <span class="file-name">${file.name}</span>
        <span class="file-status"></span>
        <span class="file-action"></span>
      `;

      const statusSpan = row.querySelector(".file-status");
      const actionSpan = row.querySelector(".file-action");

      const validIcon = document.getElementById("icon-valid").content.cloneNode(true);
      const errorIcon = document.getElementById("icon-error").content.cloneNode(true);
      const processIcon = document.getElementById("icon-process").content.cloneNode(true);
      const deleteIcon = document.getElementById("icon-delete").content.cloneNode(true);

      // Show process icon
      statusSpan.appendChild(processIcon);

      setTimeout(() => {
        if (file.size < 1024 * 1024) {
          statusSpan.innerHTML = "";
          statusSpan.appendChild(validIcon);
        } else {
          statusSpan.innerHTML = "";
          statusSpan.appendChild(errorIcon);
        }
        actionSpan.appendChild(deleteIcon);

        const deleteBtn = actionSpan.querySelector("svg");
        deleteBtn.addEventListener("click", () => {
          row.remove();
          if (fileList.children.length === 0) fileList.classList.add("hidden");
        });
      }, 1000);

      fileList.appendChild(row);
    });
  }
});
