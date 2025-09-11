import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScCode, ScCodeBlock, ScH1, ScH2, ScP, ScSection } from '@semantic-components/ui';

import { FileUploadDemo } from './file-upload-demo';

@Component({
  selector: 'app-file-upload-demo-section',
  imports: [ScSection, ScH1, ScH2, ScP, ScCodeBlock, ScCode, FileUploadDemo],
  template: `
    <sc-section>
      <sc-h1>File Upload</sc-h1>
      <sc-p>
        A drag-and-drop file upload component with support for multiple files, file type
        restrictions, and size validation.
      </sc-p>

      <sc-h2>Demo</sc-h2>
      <app-file-upload-demo />

      <sc-h2>Installation</sc-h2>
      <sc-code-block language="bash" code="npm install @semantic-components/ui" />

      <sc-h2>Usage</sc-h2>
      <sc-code-block [code]="usageCode" language="typescript" />

      <sc-h2>API Reference</sc-h2>

      <sc-h2>Props</sc-h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-border">
          <thead>
            <tr class="bg-muted/50">
              <th class="border border-border p-2 text-left">Prop</th>
              <th class="border border-border p-2 text-left">Type</th>
              <th class="border border-border p-2 text-left">Default</th>
              <th class="border border-border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2"><sc-code>variant</sc-code></td>
              <td class="border border-border p-2">
                <sc-code>'default' | 'active' | 'error'</sc-code>
              </td>
              <td class="border border-border p-2"><sc-code>'default'</sc-code></td>
              <td class="border border-border p-2">Visual variant of the upload area</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>size</sc-code></td>
              <td class="border border-border p-2"><sc-code>'default' | 'sm' | 'lg'</sc-code></td>
              <td class="border border-border p-2"><sc-code>'default'</sc-code></td>
              <td class="border border-border p-2">Size of the upload area</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>multiple</sc-code></td>
              <td class="border border-border p-2"><sc-code>boolean</sc-code></td>
              <td class="border border-border p-2"><sc-code>false</sc-code></td>
              <td class="border border-border p-2">Allow multiple file selection</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>accept</sc-code></td>
              <td class="border border-border p-2"><sc-code>string</sc-code></td>
              <td class="border border-border p-2"><sc-code>''</sc-code></td>
              <td class="border border-border p-2">
                File type restrictions (e.g., 'image/*', '.pdf')
              </td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>maxSize</sc-code></td>
              <td class="border border-border p-2"><sc-code>number</sc-code></td>
              <td class="border border-border p-2"><sc-code>0</sc-code></td>
              <td class="border border-border p-2">Maximum file size in bytes (0 = no limit)</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>disabled</sc-code></td>
              <td class="border border-border p-2"><sc-code>boolean</sc-code></td>
              <td class="border border-border p-2"><sc-code>false</sc-code></td>
              <td class="border border-border p-2">Disable the upload component</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>class</sc-code></td>
              <td class="border border-border p-2"><sc-code>string</sc-code></td>
              <td class="border border-border p-2"><sc-code>''</sc-code></td>
              <td class="border border-border p-2">Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <sc-h2>Events</sc-h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-border">
          <thead>
            <tr class="bg-muted/50">
              <th class="border border-border p-2 text-left">Event</th>
              <th class="border border-border p-2 text-left">Type</th>
              <th class="border border-border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2"><sc-code>filesSelected</sc-code></td>
              <td class="border border-border p-2"><sc-code>FileList</sc-code></td>
              <td class="border border-border p-2">Emitted when files are selected</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>fileRemoved</sc-code></td>
              <td class="border border-border p-2"><sc-code>File</sc-code></td>
              <td class="border border-border p-2">Emitted when a file is removed</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><sc-code>uploadError</sc-code></td>
              <td class="border border-border p-2"><sc-code>string</sc-code></td>
              <td class="border border-border p-2">Emitted when validation errors occur</td>
            </tr>
          </tbody>
        </table>
      </div>

      <sc-h2>Examples</sc-h2>

      <sc-h2>Basic Usage</sc-h2>
      <sc-code-block [code]="basicUsageCode" language="typescript" />

      <sc-h2>Multiple Files</sc-h2>
      <sc-code-block [code]="multipleFilesCode" language="typescript" />

      <sc-h2>With Form Integration</sc-h2>
      <sc-code-block [code]="formIntegrationCode" language="typescript" />
    </sc-section>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDemoSection {
  protected readonly usageCode = `import { ScFileUpload, ScField, ScLabel } from '@semantic-components/ui';

@Component({
  imports: [ScFileUpload, ScField, ScLabel],
  template: \`
    <div sc-field>
      <label sc-label>Upload Files</label>
      <sc-file-upload
        accept="image/*,.pdf"
        [multiple]="true"
        [maxSize]="5242880"
        (filesSelected)="onFilesSelected($event)"
        (uploadError)="onUploadError($event)"
      />
    </div>
  \`
})`;

  protected readonly basicUsageCode = `<sc-file-upload
  accept="image/*"
  [maxSize]="2097152"
  (filesSelected)="onFilesSelected($event)"
/>`;

  protected readonly multipleFilesCode = `<sc-file-upload
  [multiple]="true"
  accept=".pdf,.doc,.docx"
  [maxSize]="10485760"
  size="lg"
  (filesSelected)="onFilesSelected($event)"
  (fileRemoved)="onFileRemoved($event)"
/>`;

  protected readonly formIntegrationCode = `<form [formGroup]="uploadForm">
  <div sc-field>
    <label sc-label>Documents</label>
    <sc-file-upload
      accept=".pdf,.doc,.docx"
      [multiple]="true"
      [maxSize]="5242880"
      (filesSelected)="onFilesSelected($event)"
      (uploadError)="onUploadError($event)"
    />
    @if (errorMessage) {
      <div sc-field-error-message>{{ errorMessage }}</div>
    }
  </div>
</form>`;
}
