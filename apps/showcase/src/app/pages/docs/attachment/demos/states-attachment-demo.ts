import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScSpinner,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiClockIcon,
  SiFileExclamationPointIcon,
  SiFileTextIcon,
  SiLoaderCircleIcon,
  SiRefreshCwIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** state: idle (dashed), uploading and processing (the title shimmers), error (destructive), done. Say it in words too: the description. */
@Component({
  selector: 'app-states-attachment-demo',
  imports: [
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    ScAttachmentActions,
    ScAttachmentAction,
    ScSpinner,
    SiCheckIcon,
    SiClockIcon,
    SiFileExclamationPointIcon,
    SiFileTextIcon,
    SiLoaderCircleIcon,
    SiRefreshCwIcon,
    SiXIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scAttachment state="idle" class="w-full">
        <div scAttachmentMedia><svg siClockIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>selected-file.pdf</div>
          <div scAttachmentDescription>Ready to upload</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Remove selected-file.pdf</span>
          </button>
        </div>
      </div>
      <div scAttachment state="uploading" class="w-full">
        <div scAttachmentMedia>
          <svg scSpinner siLoaderCircleIcon aria-label="Uploading"></svg>
        </div>
        <div scAttachmentContent>
          <div scAttachmentTitle>design-system.zip</div>
          <div scAttachmentDescription>Uploading · 64%</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Cancel upload</span>
          </button>
        </div>
      </div>
      <div scAttachment state="processing" class="w-full">
        <div scAttachmentMedia><svg siFileTextIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>market-research.pdf</div>
          <div scAttachmentDescription>Processing document</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Remove market-research.pdf</span>
          </button>
        </div>
      </div>
      <div scAttachment state="error" class="w-full">
        <div scAttachmentMedia><svg siFileExclamationPointIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>financial-model.xlsx</div>
          <div scAttachmentDescription>Upload failed. Try again.</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siRefreshCwIcon></svg>
            <span class="sr-only">Retry financial-model.xlsx</span>
          </button>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Remove financial-model.xlsx</span>
          </button>
        </div>
      </div>
      <div scAttachment state="done" class="w-full">
        <div scAttachmentMedia><svg siCheckIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>uploaded-report.pdf</div>
          <div scAttachmentDescription>Uploaded · 1.8 MB</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Remove uploaded-report.pdf</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StatesAttachmentDemo {}
