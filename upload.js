
document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.getElementById("upload-box");
  const fileInput = document.getElementById("file-input");
  const fileList = document.getElementById("file-list");

  uploadBox.addEventListener("click", () => fileInput.click());

  uploadBox.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadBox.classList.add("drag-over");
  });

  uploadBox.addEventListener("dragleave", function () {
    uploadBox.classList.remove("drag-over");
  });

  uploadBox.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadBox.classList.remove("drag-over");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", () => handleFiles(fileInput.files));

  function handleFiles(files) {
    [...files].forEach((file) => {
      const li = document.createElement("li");
      const statusIcon = document.createElement("span");
      statusIcon.classList.add("status-icon", "processing");

      const name = document.createElement("span");
      name.textContent = file.name;

      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("delete-icon");
      deleteIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5 3.25V4H2.75a.75.75 0 000 1.5h.3l.815 8.15A1.5 1.5 0 005.357 15h5.285a1.5 1.5 0 001.493-1.35l.815-8.15h.3a.75.75 0 000-1.5H11v-.75A2.25 2.25 0 008.75 1h-1.5A2.25 2.25 0 005 3.25zM7.25 2.5a.75.75 0 00-.75.75V4h3v-.75a.75.75 0 00-.75-.75h-1.5z"/>
        </svg>
      `;

      deleteIcon.addEventListener("click", () => li.remove());

      li.appendChild(statusIcon);
      li.appendChild(name);
      li.appendChild(deleteIcon);
      fileList.appendChild(li);

      setTimeout(() => {
        const isValid = file.size < 1 * 1024 * 1024 && /image|pdf/.test(file.type);
        statusIcon.classList.remove("processing");
        statusIcon.classList.add(isValid ? "valid" : "error");
        statusIcon.innerHTML = isValid
          ? `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z"/></svg>`;
      }, 1000);
    });
  }

  document.getElementById("logout-switch")?.addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "index.html";
    }
  });
});
"""

from pathlib import Path
js_path = Path("/mnt/data/upload_final.js")
js_path.write_text(js_code)
js_path.name
