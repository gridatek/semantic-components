# File Upload

A drag and drop file upload zone with preview and progress support.

## Usage

```html
<div sc-file-upload [multiple]="true" [(files)]="files">
  <div sc-file-upload-dropzone>
    <p>Drag and drop files here or click to browse</p>
  </div>

  <div sc-file-upload-list>
    @for (file of files(); track file.id) {
    <div sc-file-upload-item [file]="file">
      <div sc-file-upload-item-preview [file]="file"></div>
      <div sc-file-upload-item-name>{{ file.file.name }}</div>
      <div sc-file-upload-item-size [file]="file"></div>
      <button sc-file-upload-item-delete [fileId]="file.id"></button>
    </div>
    }
  </div>
</div>
```

## Components

### ScFileUpload

Root container that manages file state.

**Selector:** `[sc-file-upload]`

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

**Selector:** `[sc-file-upload-dropzone]`

**Data Attributes:**

| Attribute       | Values            |
| --------------- | ----------------- |
| `data-dragging` | `true` \| `false` |
| `data-disabled` | `true` \| `null`  |

### ScFileUploadTrigger

Button that opens the file picker.

**Selector:** `button[sc-file-upload-trigger]`

### ScFileUploadList

Container for file items.

**Selector:** `[sc-file-upload-list]`

### ScFileUploadItem

Individual file item container.

**Selector:** `[sc-file-upload-item]`

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

**Selector:** `[sc-file-upload-item-preview]`

**Inputs:**

| Input  | Type             | Required | Description     |
| ------ | ---------------- | -------- | --------------- |
| `file` | `FileUploadFile` | Yes      | The file object |

### ScFileUploadItemName

File name display.

**Selector:** `[sc-file-upload-item-name]`

### ScFileUploadItemSize

Formatted file size display.

**Selector:** `[sc-file-upload-item-size]`

**Inputs:**

| Input  | Type             | Required | Description     |
| ------ | ---------------- | -------- | --------------- |
| `file` | `FileUploadFile` | Yes      | The file object |

### ScFileUploadItemDelete

Delete button for removing a file.

**Selector:** `button[sc-file-upload-item-delete]`

**Inputs:**

| Input    | Type     | Required | Description |
| -------- | -------- | -------- | ----------- |
| `fileId` | `string` | Yes      | File ID     |

### ScFileUploadItemProgress

Progress bar for upload status.

**Selector:** `[sc-file-upload-item-progress]`

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
<div sc-file-upload [multiple]="true" [(files)]="files">
  <div sc-file-upload-dropzone class="p-8">
    <div class="flex flex-col items-center gap-2">
      <p>Drag and drop files here</p>
      <p class="text-sm text-muted-foreground">or click to browse</p>
    </div>
  </div>
</div>
```

### Image Upload

```html
<div sc-file-upload [multiple]="true" accept="image/*" [maxSize]="5242880" [(files)]="images">
  <div sc-file-upload-dropzone>
    <p>Upload images (PNG, JPG up to 5MB)</p>
  </div>

  <div sc-file-upload-list>
    @for (file of images(); track file.id) {
    <div sc-file-upload-item [file]="file">
      <div sc-file-upload-item-preview [file]="file"></div>
      <div sc-file-upload-item-name>{{ file.file.name }}</div>
      <button sc-file-upload-item-delete [fileId]="file.id"></button>
    </div>
    }
  </div>
</div>
```

### Button Trigger

```html
<div sc-file-upload [(files)]="files">
  <button sc-file-upload-trigger>Upload Files</button>
</div>
```

### With Progress

```html
<div sc-file-upload [(files)]="files" (filesSelected)="handleUpload($event)">
  <div sc-file-upload-dropzone>Upload files</div>

  <div sc-file-upload-list>
    @for (file of files(); track file.id) {
    <div sc-file-upload-item [file]="file">
      <div sc-file-upload-item-name>{{ file.file.name }}</div>
      @if (file.status === 'uploading') {
      <div sc-file-upload-item-progress [file]="file"></div>
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
