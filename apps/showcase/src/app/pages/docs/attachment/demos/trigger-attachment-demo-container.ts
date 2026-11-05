import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TriggerAttachmentDemo } from './trigger-attachment-demo';

@Component({
  selector: 'app-trigger-attachment-demo-container',
  imports: [DemoContainer, TriggerAttachmentDemo],
  template: `
    <app-demo-container
      title="Trigger"
      demoUrl="/demos/attachment/trigger-attachment-demo"
      [code]="code"
    >
      <app-trigger-attachment-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerAttachmentDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScAttachmentTrigger,
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
} from '@semantic-components/ui';
import {
  SiCopyIcon,
  SiFileSearchIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A trigger fills the card and opens something — here a dialog; the actions stay clickable above it. Name it. */
@Component({
  selector: 'app-trigger-attachment-demo',
  imports: [
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    ScAttachmentActions,
    ScAttachmentAction,
    ScAttachmentTrigger,
    ScDialogProvider,
    ScDialogTrigger,
    ScDialogPortal,
    ScDialog,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogClose,
    ScButton,
    SiCopyIcon,
    SiFileSearchIcon,
    SiXIcon,
  ],
  template: \`
    <div scDialogProvider class="w-full max-w-sm">
      <div scAttachment class="w-full">
        <div scAttachmentMedia><svg siFileSearchIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>research-summary.pdf</div>
          <div scAttachmentDescription>Open preview dialog</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siCopyIcon></svg>
            <span class="sr-only">Copy link</span>
          </button>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Remove research-summary.pdf</span>
          </button>
        </div>
        <button scAttachmentTrigger scDialogTrigger>
          <span class="sr-only">Preview research-summary.pdf</span>
        </button>
      </div>
      <ng-template scDialogPortal>
        <div scDialog class="sm:max-w-md">
          <button scButton variant="ghost" size="icon-sm" scDialogClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scDialogHeader>
            <h2 scDialogTitle>research-summary.pdf</h2>
            <p scDialogDescription>
              The attachment trigger fills the card and opens the dialog, while
              the actions stay clickable above it.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TriggerAttachmentDemo {}`;
}
