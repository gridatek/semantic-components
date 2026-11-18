import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
import { SiCloudUploadIcon } from '@semantic-icons/lucide-icons';

/** Files to upload: a bordered empty state that browses. */
@Component({
  selector: 'app-preview-file-upload',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    SiCloudUploadIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>File Upload</h2>
        <p scCardDescription>Drag and drop or browse</p>
      </div>
      <div scCardBody>
        <div scEmpty class="border">
          <div scEmptyHeader>
            <div scEmptyMedia variant="icon">
              <svg siCloudUploadIcon></svg>
            </div>
            <h3 scEmptyTitle>Upload files</h3>
            <div scEmptyDescription>PNG, JPG, PDF up to 10MB</div>
          </div>
          <div scEmptyBody>
            <button scButton (click)="file.click()">Browse Files</button>
            <input
              #file
              type="file"
              multiple
              accept="image/png,image/jpeg,application/pdf"
              class="sr-only"
              tabindex="-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewFileUpload {}
