document.addEventListener("DOMContentLoaded", function () {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");

  function handleFiles(files) {
    fileList.innerHTML = "";
    Array.from(files).forEach((file) => {
      const li = document.createElement("li");
      li.textContent = file.name;
      fileList.appendChild(li);
    });
  }

  uploadArea.addEventListener("click", () => fileInput.click());

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

  document.getElementById("logout-switch").addEventListener("change", function () {
    if (this.checked) window.location.href = "index.html";
  });
});

function toggleSidebar() {
  document.querySelector(".sidebar")?.classList.toggle("hidden");
}

function toggleSettings() {
  document.getElementById("settings-menu").classList.toggle("hidden");
}

function toggleUserMenu() {
  document.getElementById("user-menu").classList.toggle("hidden");
}
