# NSUCC Website Admin Panel - Complete Setup Guide

## 🔐 Login Credentials
- **Username:** `admin`
- **Password:** `nsucc2025`
- **Session Duration:** 4 hours (automatically logged out after inactivity)

## 🌐 Access URLs
- **Admin Login:** `http://localhost:8000/admin/login.html`
- **Main Website:** `http://localhost:8000/index.html`

## 📁 File Upload System

### Supported File Types
- **Images:** JPG, JPEG, PNG, GIF, WebP
- **Maximum Size:** 10MB per file
- **Multiple Upload:** Yes (drag & drop or browse)

### Upload Categories

#### 1. 📋 Dashboard
- Overview of upload statistics
- Recent activity tracking
- Quick upload guide
- Total images counter

#### 2. 👥 Executives
- **Purpose:** Team member photos
- **Recommended Size:** 400x400px (square format)
- **Best Format:** PNG/JPG
- **Use Case:** Executive team section on main website

#### 3. 📅 Event Gallery
- **Purpose:** Event and activity photos
- **Recommended Size:** High resolution preferred
- **Best Format:** JPG for photos
- **Use Case:** Event gallery sections

#### 4. 🤝 Partners
- **Purpose:** Partner and sponsor logos
- **Recommended Size:** Various (logos)
- **Best Format:** PNG with transparent background
- **Use Case:** Partner showcase sections

#### 5. 🖼️ General Gallery
- **Purpose:** General website photos
- **Recommended Size:** High resolution
- **Best Format:** JPG/PNG
- **Use Case:** Website gallery and hero sections

#### 6. 👨‍🏫 Faculty
- **Purpose:** Faculty and advisor photos
- **Recommended Size:** Professional headshots
- **Best Format:** JPG/PNG
- **Use Case:** Faculty sections

#### 7. 📢 Recruitment
- **Purpose:** Recruitment banners and materials
- **Recommended Size:** Banner format (various)
- **Best Format:** PNG/JPG
- **Use Case:** Recruitment pages

## 🚀 How to Use the Admin Panel

### Step 1: Login
1. Navigate to `http://localhost:8000/admin/login.html`
2. Enter username: `admin`
3. Enter password: `nsucc2025`
4. Click "Login to Dashboard"

### Step 2: Upload Images
1. **Method 1 - Drag & Drop:**
   - Select category from sidebar
   - Drag images directly onto the upload zone
   - Watch progress bar and confirmation

2. **Method 2 - Browse Files:**
   - Select category from sidebar
   - Click on upload zone
   - Browse and select files
   - Multiple selection supported

### Step 3: Manage Uploaded Files
- **View:** All uploaded files appear as thumbnails
- **Delete:** Hover over image and click red X button
- **Info:** File name and size displayed below each image

### Step 4: Track Progress
- **Dashboard Stats:** View total and recent uploads
- **Recent Activity:** See chronological upload history
- **Progress Bars:** Real-time upload progress

## 🔧 Technical Features

### Authentication System
- **Session-based:** Secure login with time-based expiration
- **Auto-logout:** Automatic logout after 4 hours
- **Redirect Protection:** Unauthorized access redirects to login

### File Management
- **Local Storage:** Files stored in browser localStorage
- **Persistence:** Uploaded files persist between sessions
- **Validation:** File type and size validation
- **Preview:** Instant image preview after upload

### User Interface
- **Responsive Design:** Works on desktop and mobile
- **Drag & Drop:** Modern file upload interface
- **Progress Tracking:** Visual upload progress
- **Error Handling:** Clear error messages for validation

## 📱 Mobile Compatibility
- **Responsive Layout:** Sidebar collapses on mobile
- **Touch-Friendly:** Large touch targets
- **Mobile Upload:** Supports mobile camera/gallery selection

## ⚠️ Important Notes

### File Limitations
- Maximum 10MB per file
- Only image files supported
- Recommended to use optimized images for web

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript must be enabled
- Local storage must be available

### Data Persistence
- Files stored locally in browser
- Clearing browser data will remove uploaded files
- For production use, implement server-side storage

## 🛠️ For Developers

### File Structure
```
admin/
├── login.html          # Login page
├── index.html          # Main dashboard
├── admin-script.js     # JavaScript functionality
└── admin-styles.css    # Styling
```

### Key Functions
- `checkAuthentication()` - Validates user session
- `handleFileUpload()` - Processes file uploads
- `processFiles()` - File validation and storage
- `showTab()` - Navigation between categories

### Storage Format
Files stored in localStorage as:
```javascript
{
  "category": [
    {
      "id": "timestamp_index",
      "name": "filename.jpg",
      "size": 1234567,
      "type": "image/jpeg",
      "uploadDate": "ISO_DATE",
      "category": "category_name"
    }
  ]
}
```

## 🔐 Security Features

### Session Management
- Time-based session expiration
- Secure token storage
- Automatic cleanup on logout

### File Validation
- File type checking
- Size limit enforcement
- Malicious file prevention

### Access Control
- Protected admin routes
- Authentication requirement
- Unauthorized access handling

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify file types and sizes
3. Try refreshing the page
4. Re-login if session expired

## 📈 Future Enhancements

Potential improvements for production use:
- Server-side file storage
- User role management
- Bulk upload operations
- Image compression
- CDN integration
- File organization tools

---

**Last Updated:** January 2025  
**Version:** 1.0  
**For:** NSU Communications Club Website