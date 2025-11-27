// Admin Dashboard JavaScript with Enhanced File Upload
let uploadedFiles = {
  executives: [],
  events: [],
  partners: [],
  gallery: [],
  faculty: [],
  recruitment: []
};

// Authentication check on page load
document.addEventListener('DOMContentLoaded', function() {
  checkAuthentication();
  initializeAdminPanel();
});

// Check if user is authenticated
function checkAuthentication() {
  const sessionToken = localStorage.getItem('nsucc_admin_session');
  const sessionExpiry = localStorage.getItem('nsucc_admin_expiry');
  
  if (!sessionToken || !sessionExpiry || new Date().getTime() > parseInt(sessionExpiry)) {
    // Session expired or doesn't exist
    localStorage.removeItem('nsucc_admin_session');
    localStorage.removeItem('nsucc_admin_expiry');
    showUnauthorized();
    return;
  }
  
  // Valid session found
  showAdminDashboard();
  updateLastLoginTime();
}

// Show unauthorized access message
function showUnauthorized() {
  document.getElementById('loadingScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('unauthorizedAccess').style.display = 'flex';
}

// Show admin dashboard
function showAdminDashboard() {
  document.getElementById('loadingScreen').style.display = 'none';
  document.getElementById('unauthorizedAccess').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'flex';
}

// Update last login time
function updateLastLoginTime() {
  const lastLogin = localStorage.getItem('nsucc_admin_last_login');
  if (lastLogin) {
    const loginDate = new Date(parseInt(lastLogin));
    document.getElementById('lastLoginTime').textContent = formatDateTime(loginDate);
  }
}

// Format date and time
function formatDateTime(date) {
  return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Initialize admin panel
function initializeAdminPanel() {
  setupFileUploadListeners();
  loadExistingFiles();
  setupDragAndDrop();
}

// Setup file upload listeners
function setupFileUploadListeners() {
  const categories = ['executives', 'events', 'partners', 'gallery', 'faculty', 'recruitment'];
  
  categories.forEach(category => {
    const fileInput = document.getElementById(`${category}-upload`);
    if (fileInput) {
      fileInput.addEventListener('change', function(e) {
        handleFileUpload(e.target.files, category);
      });
    }
  });
}

// Setup drag and drop functionality
function setupDragAndDrop() {
  const categories = ['executives', 'events', 'partners', 'gallery', 'faculty', 'recruitment'];
  
  categories.forEach(category => {
    const uploadZone = document.querySelector(`#${category} .upload-zone`);
    if (uploadZone) {
      uploadZone.addEventListener('dragover', handleDragOver);
      uploadZone.addEventListener('dragleave', handleDragLeave);
      uploadZone.addEventListener('drop', (e) => handleDrop(e, category));
    }
  });
}

// Handle drag over
function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
}

// Handle file drop
function handleDrop(e, category) {
  e.preventDefault();
  e.currentTarget.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  handleFileUpload(files, category);
}

// Trigger file upload dialog
function triggerUpload(inputId) {
  document.getElementById(inputId).click();
}

// Handle file upload
function handleFileUpload(files, category) {
  if (!files || files.length === 0) return;
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const validFiles = [];
  
  // Validate files
  for (let file of files) {
    if (!allowedTypes.includes(file.type)) {
      showMessage(`${file.name} is not a valid image type.`, 'error', category);
      continue;
    }
    
    if (file.size > maxFileSize) {
      showMessage(`${file.name} is too large. Maximum size is 10MB.`, 'error', category);
      continue;
    }
    
    validFiles.push(file);
  }
  
  if (validFiles.length === 0) return;
  
  // Process valid files
  processFiles(validFiles, category);
}

// Process uploaded files
function processFiles(files, category) {
  const progressContainer = document.getElementById(`${category}-progress-container`);
  const progressBar = document.getElementById(`${category}-progress`);
  
  // Show progress bar
  progressContainer.style.display = 'block';
  
  let processedFiles = 0;
  const totalFiles = files.length;
  
  Array.from(files).forEach((file, index) => {
    // Simulate file processing with FileReader
    const reader = new FileReader();
    
    reader.onload = function(e) {
      // Create file object for storage
      const fileData = {
        id: Date.now() + '_' + index,
        name: file.name,
        size: file.size,
        type: file.type,
        data: e.target.result,
        uploadDate: new Date().toISOString(),
        category: category
      };
      
      // Add to uploaded files
      uploadedFiles[category].push(fileData);
      
      // Save to localStorage for persistence
      saveFilesToStorage();
      
      // Update progress
      processedFiles++;
      const progress = (processedFiles / totalFiles) * 100;
      progressBar.style.width = progress + '%';
      
      // Create preview
      addFilePreview(fileData, category);
      
      // Hide progress bar when complete
      if (processedFiles === totalFiles) {
        setTimeout(() => {
          progressContainer.style.display = 'none';
          progressBar.style.width = '0%';
          showMessage(`${totalFiles} file(s) uploaded successfully!`, 'success', category);
          updateUploadStats();
          addToRecentActivity(files.length, category);
        }, 500);
      }
    };
    
    reader.readAsDataURL(file);
  });
}

// Add file preview to the UI
function addFilePreview(fileData, category) {
  const previewContainer = document.getElementById(`${category}-files`);
  
  const previewElement = document.createElement('div');
  previewElement.className = 'file-preview';
  previewElement.setAttribute('data-file-id', fileData.id);
  
  previewElement.innerHTML = `
    <img src="${fileData.data}" alt="${fileData.name}" loading="lazy">
    <div class="file-info">
      <div class="file-name">${fileData.name}</div>
      <div class="file-size">${formatFileSize(fileData.size)}</div>
    </div>
    <button class="delete-file-btn" onclick="deleteFile('${fileData.id}', '${category}')" title="Delete file">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  previewContainer.appendChild(previewElement);
}

// Delete uploaded file
function deleteFile(fileId, category) {
  // Remove from array
  uploadedFiles[category] = uploadedFiles[category].filter(file => file.id !== fileId);
  
  // Remove from UI
  const previewElement = document.querySelector(`[data-file-id="${fileId}"]`);
  if (previewElement) {
    previewElement.remove();
  }
  
  // Save updated files to storage
  saveFilesToStorage();
  
  // Update stats
  updateUploadStats();
  
  showMessage('File deleted successfully.', 'success', category);
}

// Save files to localStorage
function saveFilesToStorage() {
  try {
    // Only save file metadata, not the actual data to avoid storage limits
    const metadata = {};
    Object.keys(uploadedFiles).forEach(category => {
      metadata[category] = uploadedFiles[category].map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: file.uploadDate,
        category: file.category
      }));
    });
    
    localStorage.setItem('nsucc_uploaded_files', JSON.stringify(metadata));
  } catch (error) {
    console.warn('Could not save files to localStorage:', error);
  }
}

// Load existing files from localStorage
function loadExistingFiles() {
  try {
    const savedFiles = localStorage.getItem('nsucc_uploaded_files');
    if (savedFiles) {
      const metadata = JSON.parse(savedFiles);
      
      Object.keys(metadata).forEach(category => {
        if (metadata[category] && Array.isArray(metadata[category])) {
          // For demo purposes, we'll just show placeholders
          // In a real implementation, you'd load the actual image data
          metadata[category].forEach(fileMetadata => {
            addFilePreviewFromMetadata(fileMetadata, category);
          });
        }
      });
      
      updateUploadStats();
    }
  } catch (error) {
    console.warn('Could not load files from localStorage:', error);
  }
}

// Add file preview from metadata
function addFilePreviewFromMetadata(fileMetadata, category) {
  const previewContainer = document.getElementById(`${category}-files`);
  
  const previewElement = document.createElement('div');
  previewElement.className = 'file-preview';
  previewElement.setAttribute('data-file-id', fileMetadata.id);
  
  // Create placeholder image since we don't store actual image data
  previewElement.innerHTML = `
    <div style="width: 100%; height: 150px; background: var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted-color);">
      <i class="fas fa-image" style="font-size: 2rem;"></i>
    </div>
    <div class="file-info">
      <div class="file-name">${fileMetadata.name}</div>
      <div class="file-size">${formatFileSize(fileMetadata.size)}</div>
    </div>
    <button class="delete-file-btn" onclick="deleteFileMetadata('${fileMetadata.id}', '${category}')" title="Delete file">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  previewContainer.appendChild(previewElement);
}

// Delete file metadata
function deleteFileMetadata(fileId, category) {
  // Remove from UI
  const previewElement = document.querySelector(`[data-file-id="${fileId}"]`);
  if (previewElement) {
    previewElement.remove();
  }
  
  // Update localStorage
  try {
    const savedFiles = localStorage.getItem('nsucc_uploaded_files');
    if (savedFiles) {
      const metadata = JSON.parse(savedFiles);
      if (metadata[category]) {
        metadata[category] = metadata[category].filter(file => file.id !== fileId);
        localStorage.setItem('nsucc_uploaded_files', JSON.stringify(metadata));
      }
    }
  } catch (error) {
    console.warn('Could not update localStorage:', error);
  }
  
  updateUploadStats();
  showMessage('File deleted successfully.', 'success', category);
}

// Update upload statistics
function updateUploadStats() {
  try {
    const savedFiles = localStorage.getItem('nsucc_uploaded_files');
    let totalFiles = 0;
    let recentFiles = 0;
    
    if (savedFiles) {
      const metadata = JSON.parse(savedFiles);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      Object.keys(metadata).forEach(category => {
        if (metadata[category]) {
          totalFiles += metadata[category].length;
          
          metadata[category].forEach(file => {
            if (new Date(file.uploadDate) > oneDayAgo) {
              recentFiles++;
            }
          });
        }
      });
    }
    
    // Update dashboard stats
    const totalStatsElement = document.querySelector('[style*="Total Images"] div:first-child');
    const recentStatsElement = document.querySelector('[style*="Recent Uploads"] div:first-child');
    
    if (totalStatsElement) totalStatsElement.textContent = totalFiles;
    if (recentStatsElement) recentStatsElement.textContent = recentFiles;
    
  } catch (error) {
    console.warn('Could not update upload stats:', error);
  }
}

// Add to recent activity
function addToRecentActivity(fileCount, category) {
  const activityContainer = document.getElementById('recentActivity');
  const now = new Date();
  
  const activityItem = document.createElement('div');
  activityItem.style.cssText = 'padding: 0.75rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;';
  
  activityItem.innerHTML = `
    <div>
      <strong>${fileCount} file(s)</strong> uploaded to <strong>${category}</strong>
    </div>
    <div style="font-size: 0.8rem; color: var(--text-muted-color);">
      ${formatDateTime(now)}
    </div>
  `;
  
  // Remove "No recent uploads" message
  const noUploadsMsg = activityContainer.querySelector('p');
  if (noUploadsMsg) {
    noUploadsMsg.remove();
  }
  
  // Add new activity to top
  activityContainer.insertBefore(activityItem, activityContainer.firstChild);
  
  // Keep only last 5 activities
  const activities = activityContainer.querySelectorAll('div[style*="padding"]');
  if (activities.length > 5) {
    activities[activities.length - 1].remove();
  }
}

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Show success/error messages
function showMessage(message, type, category) {
  const messageElement = document.getElementById(`${category}-${type}`);
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }
}

// Show tab content
function showTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => tab.classList.remove('active'));
  
  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  // Show selected tab
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to clicked nav item
  event.target.closest('.nav-item').classList.add('active');
  
  // Update page title
  const titles = {
    dashboard: 'Dashboard Overview',
    executives: 'Executive Team Photos',
    events: 'Event Gallery Photos',
    partners: 'Partner Logos',
    gallery: 'General Gallery Photos',
    faculty: 'Faculty Photos',
    recruitment: 'Recruitment Materials'
  };
  
  const titleElement = document.getElementById('contentTitle');
  if (titleElement && titles[tabName]) {
    titleElement.textContent = titles[tabName];
  }
}

// Refresh files list
function refreshFilesList() {
  // Clear all preview containers
  const categories = ['executives', 'events', 'partners', 'gallery', 'faculty', 'recruitment'];
  
  categories.forEach(category => {
    const previewContainer = document.getElementById(`${category}-files`);
    if (previewContainer) {
      previewContainer.innerHTML = '';
    }
  });
  
  // Reload files from storage
  loadExistingFiles();
  
  // Show refresh message
  showMessage('Files list refreshed.', 'success', 'executives');
}

// Logout function
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('nsucc_admin_session');
    localStorage.removeItem('nsucc_admin_expiry');
    window.location.href = 'login.html';
  }
}

// Global error handler
window.addEventListener('error', function(e) {
  console.warn('Admin Panel Error:', e.error);
});

// Prevent form submission on file inputs
document.addEventListener('submit', function(e) {
  e.preventDefault();
});