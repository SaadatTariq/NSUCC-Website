# NSUCC Website Management Guide

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Admin Panel Access](#admin-panel-access)
3. [Common Tasks](#common-tasks)
4. [File Structure](#file-structure)
5. [Step-by-Step Guides](#step-by-step-guides)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

## 🚀 Getting Started

This website is designed to be manageable by non-technical users. All major updates can be done through the admin panel or by following simple steps in this guide.

### Quick Access
- **Admin Panel**: Open `/admin/index.html` in your browser
- **Website Files**: All website files are in the main folder
- **Images**: Located in `assets/images/` folder

## 🎛️ Admin Panel Access

The admin panel provides easy-to-use tools for managing your website content:

1. Open `admin/index.html` in your web browser
2. Choose the type of content you want to update
3. Follow the step-by-step instructions
4. Copy the generated code and paste it into the appropriate files

### Admin Panel Features
- ✅ **Event Manager**: Add/edit events easily
- ✅ **Executive Manager**: Update team photos and bios
- ✅ **Partners Manager**: Add/remove partner organizations
- ✅ **Gallery Manager**: Update website photos
- ✅ **Content Manager**: Edit text content
- ✅ **Settings Manager**: Update contact info and settings

## 📝 Common Tasks

### 1. Adding a New Event

**Using Admin Panel:**
1. Open `admin/events-manager.html`
2. Fill in the event information form
3. Upload event logo to `assets/images/event_logo/`
4. Copy generated code to `events.html`

**Manual Method:**
1. Add event logo to `assets/images/event_logo/`
2. Open `events.html`
3. Copy an existing event card
4. Replace information with new event details

### 2. Updating Executive Team Photos

**Quick Method (Same Positions):**
1. Take new photos (800x1200px recommended)
2. Name them exactly like current files:
   - `President.png`
   - `Vice-President.png`
   - `General Secretary.png`
   - `Treasurer.png`
   - `JS_Int.png`
   - `JS_Ext.png`
3. Replace old files in `assets/images/executives/`

**Complete Update:**
1. Use `admin/executives-manager.html`
2. Generate new executive cards
3. Update `executives.html`

### 3. Adding Partners

**Using Admin Panel:**
1. Open `admin/partners-manager.html`
2. Upload partner logo to `assets/images/partners/`
3. Generate partner code
4. Add to `partners.html`
5. Update partner count in statistics

### 4. Updating Gallery Photos

**Homepage Slider:**
1. Add photos to `assets/images/gallery/`
2. Open `index.html`
3. Find gallery slider section
4. Update image file names

**Replace Existing:**
1. Keep same filename as current image
2. Replace file in `assets/images/gallery/`
3. Clear browser cache to see changes

## 📁 File Structure

```
NSUCC-Website/
├── admin/                    # Admin panel (management tools)
│   ├── index.html           # Main admin dashboard
│   ├── events-manager.html  # Event management
│   ├── executives-manager.html
│   └── ...
├── assets/
│   └── images/
│       ├── executives/      # Team member photos
│       ├── event_logo/      # Event logos
│       ├── partners/        # Partner logos
│       ├── gallery/         # Gallery photos
│       └── logo.png         # Main logo
├── index.html               # Homepage
├── events.html              # Events page
├── executives.html          # Executive team page
├── partners.html            # Partners page
└── ...                      # Other website pages
```

## 📖 Step-by-Step Guides

### Adding a New Event (Detailed)

1. **Prepare Event Materials:**
   - Event logo (PNG/JPG, ~300x300px)
   - Event details (date, venue, description)
   - Sponsor information

2. **Upload Logo:**
   - Go to `assets/images/event_logo/`
   - Add your logo file (e.g., `NewEvent2025.png`)

3. **Generate Event Code:**
   - Open `admin/events-manager.html`
   - Fill out the form with event details
   - Click "Generate Event Code"
   - Copy the generated HTML code

4. **Add to Website:**
   - Open `events.html`
   - Find the events grid section
   - Paste the new event code at the end
   - Save the file

5. **Test:**
   - Open `events.html` in browser
   - Check that the new event displays correctly

### Updating Contact Information

1. **Using Admin Panel:**
   - Open `admin/settings-manager.html`
   - Update contact information
   - Generate updated code
   - Apply to all HTML files

2. **Manual Update:**
   - Open each HTML file
   - Find footer section
   - Update email, phone, address
   - Update all 10 HTML files for consistency

### Changing Executive Team (New Term)

1. **Photo Preparation:**
   - Take professional photos
   - Resize to 800x1200px
   - Save as PNG format

2. **Quick Update (Same Structure):**
   - Replace photos with same filenames
   - Update term year in `executives.html` hero section

3. **Complete Update:**
   - Use `admin/executives-manager.html`
   - Generate new executive cards
   - Update social media links
   - Replace content in `executives.html`

## 🛠️ Troubleshooting

### Common Issues

**Problem: Images not showing**
- Check file path spelling (case-sensitive)
- Ensure image is uploaded to correct folder
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

**Problem: Changes not visible**
- Clear browser cache
- Check if file was saved properly
- Verify HTML syntax is correct

**Problem: Layout broken**
- Check for missing closing tags
- Ensure quotation marks are properly closed
- Validate HTML using online checker

**Problem: Social media links not working**
- Verify URLs are complete (include https://)
- Check for typos in URLs
- Ensure target="_blank" is included

### Getting Help

1. **Use Admin Panel**: Simplest method for most updates
2. **Check File Structure**: Ensure files are in correct locations
3. **Validate Code**: Use online HTML validators
4. **Contact Technical Team**: For complex issues
5. **Backup First**: Always backup before major changes

## ✅ Best Practices

### Content Management
- 📝 **Keep Content Fresh**: Update events, photos regularly
- 🎯 **Maintain Consistency**: Use same writing style across pages
- 📱 **Test on Mobile**: Check website on different devices
- 🔗 **Verify Links**: Test all links periodically

### Image Management
- 📏 **Optimize Sizes**: Keep images under 2MB each
- 🖼️ **Use Consistent Dimensions**: Maintain aspect ratios
- 🎨 **Professional Quality**: Use high-quality, well-lit photos
- 💾 **Backup Originals**: Keep original high-resolution copies

### File Management
- 💾 **Backup Regularly**: Keep copies of all files
- 📝 **Document Changes**: Note what was updated when
- 🔄 **Version Control**: Consider using Git for change tracking
- 🧹 **Clean Up**: Remove unused images periodically

### Security
- 🔒 **Limit Access**: Only give admin access to trusted members
- 📊 **Monitor Changes**: Keep track of who makes updates
- 🚫 **Protect Admin**: Don't link to admin panel publicly
- 🔐 **Secure Hosting**: Use HTTPS and secure hosting

## 📞 Support

### For Technical Issues
1. Check this guide first
2. Use admin panel tools when possible
3. Contact technical team for complex problems
4. Keep backups of working versions

### For Content Questions
1. Review existing content for style reference
2. Maintain professional tone
3. Keep descriptions concise
4. Include relevant achievements and details

### Emergency Contacts
- **Technical Issues**: Contact system administrator
- **Content Review**: Club advisor or president
- **Design Questions**: Reference existing pages for consistency

---

**Note**: This website is designed to be user-friendly. When in doubt, use the admin panel tools - they're specifically designed for non-technical users and include built-in guidance.