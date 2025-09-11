import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScCodeHighlighter } from '@semantic-components/code-highlighter';
import { ScHeading } from '@semantic-components/ui';

import { FileUploadDemo } from './file-upload-demo';

@Component({
  selector: 'app-file-upload-demo-section',
  imports: [ScHeading, ScCodeHighlighter, FileUploadDemo],
  template: `
    <section sc-section>
      <h1 sc-heading>File Upload</h1>
      <p sc-p>
        A drag-and-drop file upload component with support for multiple files, file type
        restrictions, and size validation.
      </p>

      <h2 sc-heading>Demo</h2>
      <app-file-upload-demo />

      <h2 sc-heading>Installation</h2>
      <sc-code-highlighter [code]="installCode" language="bash" />

      <h2 sc-heading>Usage</h2>
      <sc-code-highlighter [code]="usageCode" language="angular-ts" />

      <h2 sc-heading>API Reference</h2>

      <h2 sc-heading>Props</h2>
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
              <td class="border border-border p-2"><code>variant</code></td>
              <td class="border border-border p-2">
                <code>'default' | 'active' | 'error'</code>
              </td>
              <td class="border border-border p-2"><code>'default'</code></td>
              <td class="border border-border p-2">Visual variant of the upload area</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>size</code></td>
              <td class="border border-border p-2"><code>'default' | 'sm' | 'lg'</code></td>
              <td class="border border-border p-2"><code>'default'</code></td>
              <td class="border border-border p-2">Size of the upload area</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>multiple</code></td>
              <td class="border border-border p-2"><code>boolean</code></td>
              <td class="border border-border p-2"><code>false</code></td>
              <td class="border border-border p-2">Allow multiple file selection</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>accept</code></td>
              <td class="border border-border p-2"><code>string</code></td>
              <td class="border border-border p-2"><code>''</code></td>
              <td class="border border-border p-2">
                File type restrictions (e.g., 'image/*', '.pdf')
              </td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>maxSize</code></td>
              <td class="border border-border p-2"><code>number</code></td>
              <td class="border border-border p-2"><code>0</code></td>
              <td class="border border-border p-2">Maximum file size in bytes (0 = no limit)</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>disabled</code></td>
              <td class="border border-border p-2"><code>boolean</code></td>
              <td class="border border-border p-2"><code>false</code></td>
              <td class="border border-border p-2">Disable the upload component</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>class</code></td>
              <td class="border border-border p-2"><code>string</code></td>
              <td class="border border-border p-2"><code>''</code></td>
              <td class="border border-border p-2">Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 sc-heading>Events</h2>
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
              <td class="border border-border p-2"><code>filesSelected</code></td>
              <td class="border border-border p-2"><code>FileList</code></td>
              <td class="border border-border p-2">Emitted when files are selected</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>fileRemoved</code></td>
              <td class="border border-border p-2"><code>File</code></td>
              <td class="border border-border p-2">Emitted when a file is removed</td>
            </tr>
            <tr>
              <td class="border border-border p-2"><code>uploadError</code></td>
              <td class="border border-border p-2"><code>string</code></td>
              <td class="border border-border p-2">Emitted when validation errors occur</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 sc-heading>Examples</h2>

      <h2 sc-heading>Basic Usage</h2>
      <sc-code-highlighter [code]="basicUsageCode" language="angular-ts" />

      <h2 sc-heading>Multiple Files</h2>
      <sc-code-highlighter [code]="multipleFilesCode" language="angular-ts" />

      <h2 sc-heading>With Form Integration</h2>
      <sc-code-highlighter [code]="formIntegrationCode" language="angular-ts" />
    </section>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDemoSection {
  protected readonly installCode = 'npm install @semantic-components/ui';

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
