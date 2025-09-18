# @semantic-components/file-uploader

A powerful and extensible file uploader component for Angular applications, built on top of Uppy with support for multiple cloud storage providers.

## Features

- 🚀 Built on Uppy for robust file uploading
- ☁️ Multiple cloud storage providers (Supabase, AWS S3, Google Cloud, Azure Blob - coming soon)
- 🎨 Multiple UI variants (Dashboard, Drag & Drop, File Input)
- 📱 Responsive and accessible
- 🔧 Highly configurable
- 🎯 TypeScript support

## Installation

```bash
npm install @semantic-components/file-uploader
```

For Supabase support:

```bash
npm install @supabase/supabase-js
```

> **Note**: This library loads Uppy dynamically from CDN to avoid build dependencies. No additional Uppy packages need to be installed.

## Quick Start

### Basic Usage with Supabase

```typescript
import { Component } from '@angular/core';

import { FileUploader, ProviderConfig, UploadEvent } from '@semantic-components/file-uploader';

@Component({
  selector: 'app-example',
  imports: [FileUploader],
  template: `
    <sc-file-uploader
      [providerConfig]="supabaseConfig"
      [config]="uploadConfig"
      (uploadComplete)="onUploadComplete($event)"
      (uploadProgress)="onProgress($event)"
      (uploadError)="onError($event)"
      bucket="uploads"
      uploadPath="user-files/"
      variant="dashboard"
    />
  `,
})
export class ExampleComponent {
  supabaseConfig: ProviderConfig = {
    provider: 'supabase',
    config: {
      url: 'https://your-project.supabase.co',
      anonKey: 'your-anon-key',
      defaultBucket: 'uploads',
    },
  };

  uploadConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['image/*', '.pdf'],
    maxNumberOfFiles: 5,
    autoProceed: false,
  };

  onUploadComplete(event: UploadEvent) {
    console.log('Upload completed:', event.successful);
  }

  onProgress(progress: number) {
    console.log('Upload progress:', progress);
  }

  onError(error: Error) {
    console.error('Upload error:', error);
  }
}
```

## Setting up Supabase for File Upload

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: Your project name (e.g., "my-file-upload-app")
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project" and wait for it to initialize

### 2. Configure Storage

1. In your Supabase dashboard, go to **Storage** in the left sidebar
2. Click "Create a new bucket"
3. Enter bucket details:
   - **Name**: `uploads` (or your preferred name)
   - **Public bucket**: Check this if you want files to be publicly accessible
   - **File size limit**: Set appropriate limit (e.g., 10MB)
   - **Allowed MIME types**: Configure as needed (e.g., `image/*,application/pdf`)
4. Click "Create bucket"

### 3. Set up Storage Policies (RLS)

For security, configure Row Level Security policies:

1. Go to **Storage** → **Policies**
2. For the uploads bucket, create policies:

#### Allow authenticated users to upload:

```sql
-- Policy name: "Allow authenticated uploads"
-- Operation: INSERT
-- Target roles: authenticated

bucket_id = 'uploads'
```

#### Allow users to view their own uploads:

```sql
-- Policy name: "Allow users to view own uploads"
-- Operation: SELECT
-- Target roles: authenticated

bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]
```

#### Allow users to delete their own uploads:

```sql
-- Policy name: "Allow users to delete own uploads"
-- Operation: DELETE
-- Target roles: authenticated

bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]
```

### 4. Get API Keys

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon/public key**: Your anonymous key for client-side usage

### 5. Configure CORS (if needed)

If you encounter CORS issues:

1. Go to **Settings** → **API** → **CORS configuration**
2. Add your domain to the allowed origins
3. For local development, add: `http://localhost:4200`

## Testing the Library

### 1. Demo Application

The library includes a demo application that you can use to test functionality:

```bash
# Clone the repository
git clone <repository-url>
cd semantic-components

# Install dependencies
npm install

# Install Supabase client
npm install @supabase/supabase-js

# Start the demo app
npx nx serve app
```

Navigate to `http://localhost:4200` and go to the "Cloud File Uploader" section.

### 2. Configure Demo with Your Supabase Project

Update the demo configuration in `apps/app/src/app/docs/components/file-upload/file-uploader-demo.ts`:

```typescript
supabaseConfig: ProviderConfig = {
  provider: 'supabase',
  config: {
    url: 'https://your-project.supabase.co', // Your project URL
    anonKey: 'your-anon-key', // Your anon key
    defaultBucket: 'uploads', // Your bucket name
  },
};
```

### 3. Test Different Scenarios

#### File Upload Test

1. Select files using the dashboard interface
2. Verify files appear in your Supabase storage bucket
3. Check progress indicators work correctly
4. Test error handling with invalid file types

#### Configuration Test

```typescript
uploadConfig = {
  maxFileSize: 1 * 1024 * 1024, // 1MB limit
  allowedFileTypes: ['image/jpeg'], // Only JPEG images
  maxNumberOfFiles: 1, // Single file only
  autoProceed: true, // Auto-upload
  showProgressDetails: true, // Show detailed progress
};
```

#### Different Variants Test

```html
<!-- Dashboard variant (full UI) -->
<sc-file-uploader variant="dashboard" [providerConfig]="config" />

<!-- Drag & Drop variant -->
<sc-file-uploader variant="drag-drop" [providerConfig]="config" />

<!-- File Input variant (button only) -->
<sc-file-uploader variant="file-input" [providerConfig]="config" />
```

### 4. Unit Testing

Run the library tests:

```bash
# Run all tests
npx nx test file-uploader

# Run tests with coverage
npx nx test file-uploader --codeCoverage

# Run tests in watch mode
npx nx test file-uploader --watch
```

### 5. Integration Testing

Test with real Supabase backend:

```bash
# Build the library
npx nx build file-uploader

# Test in consuming application
npm link ./dist/libs/file-uploader
```

## API Reference

### FileUploader Component

#### Inputs

| Property         | Type                                         | Default       | Description                    |
| ---------------- | -------------------------------------------- | ------------- | ------------------------------ |
| `providerConfig` | `ProviderConfig`                             | **required**  | Storage provider configuration |
| `config`         | `FileUploadConfig`                           | `{}`          | Upload configuration options   |
| `uploadPath`     | `string`                                     | `''`          | Upload path within bucket      |
| `bucket`         | `string`                                     | `''`          | Storage bucket name            |
| `variant`        | `'dashboard' \| 'drag-drop' \| 'file-input'` | `'dashboard'` | UI variant                     |

#### Outputs

| Event            | Type          | Description                    |
| ---------------- | ------------- | ------------------------------ |
| `uploadComplete` | `UploadEvent` | Fired when upload completes    |
| `uploadProgress` | `number`      | Fired during upload progress   |
| `uploadError`    | `Error`       | Fired when upload error occurs |

#### Types

```typescript
interface FileUploadConfig {
  maxFileSize?: number; // Max file size in bytes
  allowedFileTypes?: string[]; // Allowed MIME types or extensions
  maxNumberOfFiles?: number; // Maximum number of files
  autoProceed?: boolean; // Auto start upload
  showProgressDetails?: boolean; // Show detailed progress
}

interface ProviderConfig {
  provider: 'supabase';
  config: {
    url: string; // Supabase project URL
    anonKey: string; // Supabase anonymous key
    defaultBucket?: string; // Default bucket name
  };
}

interface UploadEvent {
  files: UploadResult[]; // All uploaded files
  successful: UploadResult[]; // Successfully uploaded files
  failed: any[]; // Failed uploads
}

interface UploadResult {
  url: string; // Public URL of uploaded file
  key: string; // Storage key/path
  bucket: string; // Bucket name
  metadata?: any; // Additional metadata
}
```

## Troubleshooting

### Common Issues

#### 1. CORS Errors

- Add your domain to Supabase CORS configuration
- For local development, add `http://localhost:4200`

#### 2. Authentication Errors

- Verify your Supabase URL and anon key are correct
- Check if RLS policies are properly configured

#### 3. Upload Permissions

- Ensure storage bucket policies allow uploads for your user role
- Check if bucket exists and is accessible

#### 4. File Size Errors

- Verify file size limits in both component config and Supabase bucket settings
- Check if MIME types are allowed

### Debug Mode

Enable debug logging:

```typescript
// Add to your component
ngOnInit() {
  // Enable Uppy debug mode
  (window as any).uppyDebug = true;
}
```

### Getting Help

1. Check the [demo application](http://localhost:4200) for working examples
2. Review Supabase storage documentation
3. Check browser console for detailed error messages
4. Verify network requests in browser DevTools

## Extending with Custom Providers

You can easily add support for other cloud providers by implementing the `StorageProvider` interface:

```typescript
import { StorageProvider, UploadOptions, UploadResult } from '@semantic-components/file-uploader';

export class CustomStorageProvider implements StorageProvider {
  readonly name = 'custom-provider';

  async upload(file: File, options?: UploadOptions): Promise<UploadResult> {
    // Your upload logic here
  }

  async delete(key: string, bucket?: string): Promise<void> {
    // Your delete logic here
  }

  async getSignedUrl(key: string, bucket?: string, expiresIn?: number): Promise<string> {
    // Your signed URL logic here
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npx nx test file-uploader`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.
