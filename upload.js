document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const logoutSwitch = document.getElementById("logout-switch");

  function handleFile(file) {
    const listItem = document.createElement("li");
    listItem.textContent = file.name + " (" + Math.round(file.size / 1024) + " KB)";
    fileList.appendChild(listItem);
  }

  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadArea.classList.add("highlight");
  });

  uploadArea.addEventListener("dragleave", function () {
    uploadArea.classList.remove("highlight");
  });

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadArea.classList.remove("highlight");
    const files = e.dataTransfer.files;
    for (const file of files) {
      handleFile(file);
    }
  });

  fileInput.addEventListener("change", function () {
    for (const file of fileInput.files) {
      handleFile(file);
    }
  });

  logoutSwitch?.addEventListener("change", function () {
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
