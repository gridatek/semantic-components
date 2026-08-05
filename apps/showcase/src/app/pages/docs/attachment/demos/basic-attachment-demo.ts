import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScAttachment,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentGroup,
  ScAttachmentMedia,
  ScAttachmentTitle,
} from '@semantic-components/ui-lab';
import { SiFileTextIcon, SiXIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-attachment-demo',
  imports: [
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    ScAttachmentActions,
    ScAttachmentGroup,
    ScButton,
    SiFileTextIcon,
    SiXIcon,
  ],
  template: `
    <div scAttachmentGroup class="w-full max-w-lg">
      <div scAttachment>
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>quarterly-report.pdf</div>
          <div scAttachmentDescription>2.4 MB</div>
        </div>
        <div scAttachmentActions>
          <button scButton variant="ghost" size="icon-sm" aria-label="Remove">
            <svg siXIcon></svg>
          </button>
        </div>
      </div>

      <div scAttachment size="sm" state="uploading">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>notes.txt</div>
          <div scAttachmentDescription>Uploading…</div>
        </div>
      </div>

      <div scAttachment size="sm" state="error">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>archive.zip</div>
          <div scAttachmentDescription>Upload failed</div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAttachmentDemo {}
