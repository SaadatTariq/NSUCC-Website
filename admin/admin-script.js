// NSUCC Website Admin Panel JavaScript
// Enhanced image upload and content management system

document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    setupNavigation();
    setupImageUpload();
    loadExistingImages();
    setupDragAndDrop();
}

// Navigation Functions
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const activeNav = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Update page title
    const titles = {
        'upload': 'Image Upload Center',
        'executives': 'Executive Team Manager',
        'events': 'Events Manager', 
        'partners': 'Partners Manager',
        'gallery': 'Gallery Manager',
        'content': 'Content Editor',
        'instructions': 'Instructions & Help'
    };
    
    document.getElementById('page-title').textContent = titles[tabName] || 'Admin Panel';
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.getAttribute('onclick').match(/showTab\('(.+)'\)/)[1];
            showTab(tab);
        });
    });
}

// Image Upload Functions
function setupImageUpload() {
    const uploadTypes = ['exec', 'event', 'partner', 'gallery'];
    
    uploadTypes.forEach(type => {
        const fileInput = document.getElementById(`${type}-files`);
        const uploadZone = document.getElementById(`${type}-upload-zone`);
        
        if (fileInput && uploadZone) {
            // File input change handler
            fileInput.addEventListener('change', function(e) {
                handleFiles(e.target.files, type);
            });
            
            // Click to upload
            uploadZone.addEventListener('click', function() {
                fileInput.click();
            });
        }
    });
}

function setupDragAndDrop() {
    const uploadTypes = ['exec', 'event', 'partner', 'gallery'];
    
    uploadTypes.forEach(type => {
        const uploadZone = document.getElementById(`${type}-upload-zone`);
        
        if (uploadZone) {
            uploadZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            
            uploadZone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
            });
            
            uploadZone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                const files = e.dataTransfer.files;
                handleFiles(files, type);
            });
        }
    });
}

function handleFiles(files, type) {
    if (files.length === 0) return;
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    
    const validFiles = Array.from(files).filter(file => {
        if (!allowedTypes.includes(file.type)) {
            showError(`${file.name} is not a supported image format.`, type);
            return false;
        }
        if (file.size > maxSize) {
            showError(`${file.name} is too large. Maximum size is 5MB.`, type);
            return false;
        }
        return true;
    });
    
    if (validFiles.length > 0) {
        uploadFiles(validFiles, type);
    }
}

function uploadFiles(files, type) {
    const progressBar = document.getElementById(`${type}-progress`);
    const progressBarFill = document.getElementById(`${type}-progress-bar`);
    
    // Show progress bar
    if (progressBar) {
        progressBar.style.display = 'block';
        progressBarFill.style.width = '0%';
    }
    
    let uploadedCount = 0;
    const totalFiles = files.length;
    
    files.forEach((file, index) => {
        // Simulate file upload (in real implementation, you'd upload to server)
        simulateFileUpload(file, type, (progress) => {
            // Update progress bar
            if (progressBarFill) {
                const totalProgress = ((uploadedCount / totalFiles) + (progress / totalFiles)) * 100;
                progressBarFill.style.width = `${totalProgress}%`;
            }
        }, () => {
            // File upload complete
            uploadedCount++;
            addFilePreview(file, type);
            
            if (uploadedCount === totalFiles) {
                // All files uploaded
                setTimeout(() => {
                    if (progressBar) progressBar.style.display = 'none';
                    showSuccess('Files uploaded successfully!', type);
                }, 500);
            }
        });
    });
}

function simulateFileUpload(file, type, onProgress, onComplete) {
    // This simulates file upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Copy file to appropriate directory (browser simulation)
            copyFileToDirectory(file, type);
            onComplete();
        }
        onProgress(progress);
    }, 100);
}

function copyFileToDirectory(file, type) {
    // In a real implementation, this would handle server-side file operations
    // For now, we'll store file information in localStorage for demonstration
    
    const directories = {
        'exec': 'assets/images/executives/',
        'event': 'assets/images/event_logo/',
        'partner': 'assets/images/partners/',
        'gallery': 'assets/images/gallery/'
    };
    
    const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        directory: directories[type],
        uploadDate: new Date().toISOString()
    };
    
    // Store in localStorage
    const storageKey = `uploaded-${type}-files`;
    const existingFiles = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existingFiles.push(fileInfo);
    localStorage.setItem(storageKey, JSON.stringify(existingFiles));
    
    console.log(`File ${file.name} would be copied to ${directories[type]}`);
}

function addFilePreview(file, type) {
    const previewContainer = document.getElementById(`${type}-preview`);
    if (!previewContainer) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'file-preview';
        previewDiv.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}">
            <div class="file-info">${file.name}</div>
            <button class="delete-btn" onclick="removeFilePreview(this, '${type}', '${file.name}')">
                <i class="fas fa-trash"></i>
            </button>
        `;
        previewContainer.appendChild(previewDiv);
    };
    reader.readAsDataURL(file);
}

function removeFilePreview(button, type, fileName) {
    const previewDiv = button.parentElement;
    previewDiv.remove();
    
    // Remove from localStorage
    const storageKey = `uploaded-${type}-files`;
    const existingFiles = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedFiles = existingFiles.filter(file => file.name !== fileName);
    localStorage.setItem(storageKey, JSON.stringify(updatedFiles));
    
    showSuccess('File removed successfully!', type);
}

function loadExistingImages() {
    const uploadTypes = ['exec', 'event', 'partner', 'gallery'];
    
    uploadTypes.forEach(type => {
        const storageKey = `uploaded-${type}-files`;
        const existingFiles = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        existingFiles.forEach(fileInfo => {
            // Create preview for existing files
            // Note: In real implementation, you'd load actual images from server
            const previewContainer = document.getElementById(`${type}-preview`);
            if (previewContainer) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'file-preview';
                previewDiv.innerHTML = `
                    <div style="width: 100%; height: 120px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #64748b;">
                        <i class="fas fa-image" style="font-size: 2rem;"></i>
                    </div>
                    <div class="file-info">${fileInfo.name}</div>
                    <button class="delete-btn" onclick="removeFilePreview(this, '${type}', '${fileInfo.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                previewContainer.appendChild(previewDiv);
            }
        });
    });
}

function showSuccess(message, type) {
    const successElement = document.getElementById(`${type}-success`);
    if (successElement) {
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }
}

function showError(message, type) {
    const errorElement = document.getElementById(`${type}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

function saveAllChanges() {
    // Simulate saving changes
    const saveBtn = document.querySelector('[onclick="saveAllChanges()"]');
    const originalText = saveBtn.innerHTML;
    
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;
    
    setTimeout(() => {
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 2000);
    }, 1500);
}

// Utility Functions
function generateImageCode(type) {
    const uploadTypes = {
        'exec': {
            title: 'Executive Photos',
            description: 'Add these images to assets/images/executives/ folder',
            codeTemplate: '<img src="assets/images/executives/[FILENAME]" alt="[ALT_TEXT]">'
        },
        'event': {
            title: 'Event Logos',
            description: 'Add these images to assets/images/event_logo/ folder',
            codeTemplate: '<img src="assets/images/event_logo/[FILENAME]" alt="[ALT_TEXT]">'
        },
        'partner': {
            title: 'Partner Logos',
            description: 'Add these images to assets/images/partners/ folder',
            codeTemplate: '<img src="assets/images/partners/[FILENAME]" alt="[ALT_TEXT]">'
        },
        'gallery': {
            title: 'Gallery Images',
            description: 'Add these images to assets/images/gallery/ folder',
            codeTemplate: '<img src="assets/images/gallery/[FILENAME]" alt="[ALT_TEXT]">'
        }
    };
    
    return uploadTypes[type];
}

// Download Instructions Function
function downloadInstructions() {
    const instructions = `
NSUCC Website Management Instructions
====================================

1. UPLOADING IMAGES:
   - Use the Image Upload Center in the admin panel
   - Drag and drop images or click to browse
   - Images will be automatically categorized
   - Supported formats: JPG, PNG, WebP, SVG
   - Maximum file size: 5MB

2. EXECUTIVE TEAM UPDATES:
   - Go to Executive Team tab
   - Upload new executive photos to assets/images/executives/
   - Update executive information in executives.html
   - Use the provided templates for consistency

3. EVENT MANAGEMENT:
   - Use Events Manager to add new events
   - Upload event logos to assets/images/event_logo/
   - Follow the event card template in events.html

4. PARTNER MANAGEMENT:
   - Upload partner logos to assets/images/partners/
   - Update partners.html with new partner information
   - Use transparent background logos when possible

5. GALLERY UPDATES:
   - Upload photos to assets/images/gallery/
   - Update gallery section in index.html
   - Optimize images for web before uploading

For detailed instructions, visit the Instructions tab in the admin panel.
    `;
    
    const blob = new Blob([instructions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NSUCC-Website-Instructions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Export functions for global use
window.showTab = showTab;
window.saveAllChanges = saveAllChanges;
window.removeFilePreview = removeFilePreview;
window.downloadInstructions = downloadInstructions;