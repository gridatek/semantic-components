# File Upload

A drag and drop file upload zone with preview and progress support.

## Usage

```html
<div scFileUpload [multiple]="true" [(files)]="files">
  <div scFileUploadDropzone>
    <p>Drag and drop files here or click to browse</p>
  </div>

  <div scFileUploadList>
    @for (file of files(); track file.id) {
    <div scFileUploadItem [file]="file">
      <div scFileUploadItemPreview [file]="file"></div>
      <div scFileUploadItemName>{{ file.file.name }}</div>
      <div scFileUploadItemSize [file]="file"></div>
      <button scFileUploadItemDelete [fileId]="file.id"></button>
    </div>
    }
  </div>
</div>
```

## Components

### ScFileUpload

Root container that manages file state.

**Selector:** `[scFileUpload]`

**Inputs:**

| Input      | Type      | Default | Description                           |
| ---------- | --------- | ------- | ------------------------------------- |
| `multiple` | `boolean` | `false` | Allow multiple file selection         |
| `accept`   | `string`  | `''`    | Accepted file types (e.g. `image/*`)  |
| `maxSize`  | `number`  | `0`     | Max file size in bytes (0 = no limit) |
| `maxFiles` | `number`  | `0`     | Max number of files (0 = no limit)    |
| `disabled` | `boolean` | `false` | Disable file upload                   |
| `class`    | `string`  | `''`    | Additional CSS classes                |

**Two-way Bindings:**

| Binding | Type               | Description    |
| ------- | ------------------ | -------------- |
| `files` | `FileUploadFile[]` | Selected files |

**Outputs:**

| Output          | Type             | Description                 |
| --------------- | ---------------- | --------------------------- |
| `filesSelected` | `File[]`         | Emitted when files added    |
| `fileRemoved`   | `FileUploadFile` | Emitted when file removed   |
| `error`         | `string`         | Emitted on validation error |

**Methods:**

| Method                                    | Description                |
| ----------------------------------------- | -------------------------- |
| `addFiles(files: FileList \| File[])`     | Add files programmatically |
| `removeFile(fileId: string)`              | Remove a file by ID        |
| `updateFileProgress(fileId, progress)`    | Update upload progress     |
| `updateFileStatus(fileId, status, error)` | Update file status         |
| `clearFiles()`                            | Remove all files           |

### ScFileUploadDropzone

Drag and drop zone that also responds to clicks.

**Selector:** `[scFileUploadDropzone]`

**Data Attributes:**

| Attribute       | Values            |
| --------------- | ----------------- |
| `data-dragging` | `true` \| `false` |
| `data-disabled` | `true` \| `null`  |

### ScFileUploadTrigger

Button that opens the file picker.

**Selector:** `button[scFileUploadTrigger]`

### ScFileUploadList

Container for file items.

**Selector:** `[scFileUploadList]`

### ScFileUploadItem

Individual file item container.

**Selector:** `[scFileUploadItem]`

**Inputs:**

| Input   | Type             | Required | Description     |
| ------- | ---------------- | -------- | --------------- |
| `file`  | `FileUploadFile` | Yes      | The file object |
| `class` | `string`         | No       | Additional CSS  |

**Data Attributes:**

| Attribute     | Values                                              |
| ------------- | --------------------------------------------------- |
| `data-status` | `'pending' \| 'uploading' \| 'complete' \| 'error'` |

### ScFileUploadItemPreview

File preview (shows image thumbnail for images).

**Selector:** `[scFileUploadItemPreview]`

**Inputs:**

| Input  | Type             | Required | Description     |
| ------ | ---------------- | -------- | --------------- |
| `file` | `FileUploadFile` | Yes      | The file object |

### ScFileUploadItemName

File name display.

**Selector:** `[scFileUploadItemName]`

### ScFileUploadItemSize

Formatted file size display.

**Selector:** `[scFileUploadItemSize]`

**Inputs:**

| Input  | Type             | Required | Description     |
| ------ | ---------------- | -------- | --------------- |
| `file` | `FileUploadFile` | Yes      | The file object |

### ScFileUploadItemDelete

Delete button for removing a file.

**Selector:** `button[scFileUploadItemDelete]`

**Inputs:**

| Input    | Type     | Required | Description |
| -------- | -------- | -------- | ----------- |
| `fileId` | `string` | Yes      | File ID     |

### ScFileUploadItemProgress

Progress bar for upload status.

**Selector:** `[scFileUploadItemProgress]`

**Inputs:**

| Input  | Type             | Required | Description     |
| ------ | ---------------- | -------- | --------------- |
| `file` | `FileUploadFile` | Yes      | The file object |

## Types

```typescript
interface FileUploadFile {
  file: File;
  id: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}
```

## Examples

### Basic Dropzone

```html
<div scFileUpload [multiple]="true" [(files)]="files">
  <div scFileUploadDropzone class="p-8">
    <div class="flex flex-col items-center gap-2">
      <p>Drag and drop files here</p>
      <p class="text-sm text-muted-foreground">or click to browse</p>
    </div>
  </div>
</div>
```

### Image Upload

```html
<div scFileUpload [multiple]="true" accept="image/*" [maxSize]="5242880" [(files)]="images">
  <div scFileUploadDropzone>
    <p>Upload images (PNG, JPG up to 5MB)</p>
  </div>

  <div scFileUploadList>
    @for (file of images(); track file.id) {
    <div scFileUploadItem [file]="file">
      <div scFileUploadItemPreview [file]="file"></div>
      <div scFileUploadItemName>{{ file.file.name }}</div>
      <button scFileUploadItemDelete [fileId]="file.id"></button>
    </div>
    }
  </div>
</div>
```

### Button Trigger

```html
<div scFileUpload [(files)]="files">
  <button scFileUploadTrigger>Upload Files</button>
</div>
```

### With Progress

```html
<div scFileUpload [(files)]="files" (filesSelected)="handleUpload($event)">
  <div scFileUploadDropzone>Upload files</div>

  <div scFileUploadList>
    @for (file of files(); track file.id) {
    <div scFileUploadItem [file]="file">
      <div scFileUploadItemName>{{ file.file.name }}</div>
      @if (file.status === 'uploading') {
      <div scFileUploadItemProgress [file]="file"></div>
      }
    </div>
    }
  </div>
</div>
```

## Features

- **Drag and Drop**: Drop files directly onto the dropzone
- **Click to Browse**: Click dropzone or trigger button to open file picker
- **File Validation**: Accept types, max size, max file count
- **Image Preview**: Automatic thumbnail for image files
- **Progress Tracking**: Built-in progress bar component
- **File Management**: Add, remove, clear files programmatically
- **Multiple/Single**: Support for single or multiple file selection

## Accessibility

- Hidden file input is properly labeled
- Visual feedback for drag state
- Keyboard accessible trigger button
- Screen reader text for delete button
