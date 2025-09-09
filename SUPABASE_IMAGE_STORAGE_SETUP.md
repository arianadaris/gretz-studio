# Supabase Image Storage Setup Guide

This guide will walk you through setting up a storage bucket in Supabase for handling project images in your Gretz Studio portfolio application.

## Prerequisites

- Active Supabase project
- Admin access to your Supabase dashboard
- Understanding of Row Level Security (RLS) policies

## Step 1: Create a Storage Bucket

1. **Access Supabase Dashboard**
   - Go to [supabase.com](https://supabase.com)
   - Sign in to your account
   - Select your project

2. **Navigate to Storage**
   - In the left sidebar, click on "Storage"
   - Click on "Buckets" tab

3. **Create New Bucket**
   - Click "Create bucket" button
   - Enter bucket name: `project-images`
   - Set as **Public bucket** (check the box)
   - Click "Create bucket"

## Step 2: Configure Bucket Policies

1. **Set Up RLS Policies**
   - Click on your newly created `project-images` bucket
   - Go to "Policies" tab
   - Click "Add policy"

2. **Create Upload Policy**
   ```sql
   -- Policy name: Allow authenticated users to upload
   -- Policy: INSERT
   -- Target roles: authenticated
   -- Using expression:
   auth.role() = 'authenticated'
   ```

3. **Create Read Policy**
   ```sql
   -- Policy name: Allow public read access
   -- Policy: SELECT
   -- Target roles: public
   -- Using expression:
   true
   ```

4. **Create Update Policy (Optional)**
   ```sql
   -- Policy name: Allow authenticated users to update
   -- Policy: UPDATE
   -- Target roles: authenticated
   -- Using expression:
   auth.role() = 'authenticated'
   ```

5. **Create Delete Policy (Optional)**
   ```sql
   -- Policy name: Allow authenticated users to delete
   -- Policy: DELETE
   -- Target roles: authenticated
   -- Using expression:
   auth.role() = 'authenticated'
   ```

## Step 3: Configure File Upload Settings

1. **File Size Limits**
   - Maximum file size: 50MB (default)
   - Recommended for images: 10MB

2. **Allowed File Types**
   - JPEG (.jpg, .jpeg)
   - PNG (.png)
   - WebP (.webp)
   - SVG (.svg)
   - GIF (.gif)

## Step 4: Get Storage URL

1. **Find Your Storage URL**
   - In Supabase Dashboard, go to Settings > API
   - Copy the "Project URL"
   - Your storage URL will be: `https://[your-project-id].supabase.co/storage/v1/object/public/project-images/`

## Step 5: Update Environment Variables

Add the following to your `.env.local` file:

```env
REACT_APP_SUPABASE_STORAGE_URL=https://[your-project-id].supabase.co/storage/v1/object/public/project-images/
```

## Step 6: Folder Structure (Recommended)

Organize your images in the bucket with the following structure:
```
project-images/
├── thumbnails/          # Optimized thumbnail images
├── full-size/          # Full resolution images
├── logos/              # Project logos and icons
└── mockups/            # Project mockup images
```

## Step 7: Image Optimization Best Practices

1. **Recommended Image Sizes**
   - Thumbnails: 400x300px
   - Full-size: 1200x900px
   - Logos: 200x200px (square)

2. **File Formats**
   - Use WebP for modern browsers (smaller file size)
   - Provide PNG/JPEG fallbacks
   - Use SVG for logos when possible

3. **File Naming Convention**
   - Use descriptive names: `project-name-thumbnail.webp`
   - Avoid spaces (use hyphens or underscores)
   - Include dimensions: `logo-200x200.png`

## Step 8: Testing Your Setup

1. **Test Upload**
   - Go to Storage > project-images in Supabase dashboard
   - Try uploading a test image
   - Verify the image appears in the bucket

2. **Test Public Access**
   - Copy the public URL of your uploaded image
   - Open it in a new browser tab
   - Ensure the image loads correctly

## Security Considerations

1. **File Type Validation**
   - Always validate file types on the client side
   - Implement server-side validation for additional security

2. **File Size Limits**
   - Set reasonable file size limits in your application
   - Monitor storage usage regularly

3. **Content Moderation**
   - Consider implementing content moderation for user uploads
   - Regular audit of uploaded content

## Troubleshooting

### Common Issues:

1. **Images not loading**
   - Check if bucket is set to public
   - Verify RLS policies are correctly configured
   - Ensure correct storage URL format

2. **Upload failures**
   - Check authentication status
   - Verify file size limits
   - Ensure proper permissions

3. **CORS errors**
   - Supabase handles CORS automatically for storage
   - If issues persist, check your domain configuration

## Next Steps

After completing this setup:
1. Update your React application to use the new storage bucket
2. Modify the admin dashboard to handle file uploads
3. Update the portfolio display to show images from Supabase storage
4. Test the complete upload and display workflow

## Support

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Storage API Reference](https://supabase.com/docs/reference/javascript/storage-createbucket)
- [Supabase Community Discord](https://discord.supabase.com)
