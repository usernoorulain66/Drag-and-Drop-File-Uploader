
const browseButton = document.getElementById("browseButton");
const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("uploadArea");
const previewContainer = document.getElementById("previewContainer");
const imagePreview = document.getElementById("imagePreview");
const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");
const message = document.getElementById("message");
const progressContainer = document.getElementById("progressContainer");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const successMessage = document.getElementById("successMessage");
let uploadInterval;
previewContainer.style.display = "none";
progressContainer.style.display = "none";
browseButton.addEventListener("click", function() {
    fileInput.click();
});
fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
        uploadFile(file);
    }
});
uploadArea.addEventListener("dragover", function(event) {
    event.preventDefault();
    uploadArea.style.backgroundColor = "lavender";
});
uploadArea.addEventListener("dragleave", function() {
    uploadArea.style.backgroundColor = "ghostwhite";
});
uploadArea.addEventListener("drop", function(event) {
    event.preventDefault();
    uploadArea.style.backgroundColor = "ghostwhite";
    const file = event.dataTransfer.files[0];
    if (file) {
        uploadFile(file);
    }
});
function uploadFile(file) {
    clearInterval(uploadInterval);
    message.textContent = "";
    successMessage.textContent = "";
    previewContainer.style.display = "none";
    progressContainer.style.display = "none";
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
        message.textContent = "Invalid file! Please select JPG, PNG or GIF.";
        fileInput.value = "";
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        message.textContent = "File size should be less than 5 MB.";
        fileInput.value = "";
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        imagePreview.src = event.target.result;
        fileName.textContent = "File Name: " + file.name;
        fileSize.textContent = "File Size: " + (file.size / 1024).toFixed(2) + " KB";
        previewContainer.style.display = "block";
        startUpload();
    };
    reader.readAsDataURL(file);
}
function startUpload() {
    progressContainer.style.display = "block";
    let percentage = 0;
    progress.style.width = "0%";
    progressText.textContent = "0%";
    uploadInterval = setInterval(function() {
        percentage += 10;
        progress.style.width = percentage + "%";
        progressText.textContent = percentage + "%";
        if (percentage >= 100) {
            clearInterval(uploadInterval);
            successMessage.textContent = "Image uploaded successfully!";
        }
    }, 300);
}
