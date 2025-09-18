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

## Basic Usage

### With Supabase

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
      url: 'your-supabase-url',
      anonKey: 'your-supabase-anon-key',
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

### Variants

#### Dashboard (Full UI)

```html
<sc-file-uploader variant="dashboard" [providerConfig]="config" />
```

#### Drag & Drop

```html
<sc-file-uploader variant="drag-drop" [providerConfig]="config" />
```

#### File Input (Button only)

```html
<sc-file-uploader variant="file-input" [providerConfig]="config" />
```

## Configuration

### File Upload Config

```typescript
interface FileUploadConfig {
  maxFileSize?: number; // Max file size in bytes
  allowedFileTypes?: string[]; // Allowed MIME types or extensions
  maxNumberOfFiles?: number; // Maximum number of files
  autoProceed?: boolean; // Auto start upload
  showProgressDetails?: boolean; // Show detailed progress
}
```

### Provider Configurations

#### Supabase

```typescript
const supabaseConfig: ProviderConfig = {
  provider: 'supabase',
  config: {
    url: 'your-supabase-url',
    anonKey: 'your-supabase-anon-key',
    defaultBucket: 'uploads',
  },
};
```

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

## Running unit tests

Run `nx test file-uploader` to execute the unit tests.
