import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { AttachmentUsageDemo } from './attachment-usage-demo';

@Component({
  selector: 'app-attachment-usage-demo-container',
  imports: [UsageCode, AttachmentUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-attachment-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AttachmentUsageDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentGroup,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScSpinner,
} from '@semantic-components/ui';
import {
  SiFileCodeIcon,
  SiLoaderCircleIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-attachment-usage-demo',
  imports: [
    NgOptimizedImage,
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    ScAttachmentActions,
    ScAttachmentAction,
    ScAttachmentGroup,
    ScSpinner,
    SiFileCodeIcon,
    SiLoaderCircleIcon,
    SiXIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div scAttachmentGroup tabindex="0" role="group" aria-label="Images">
        <div scAttachment orientation="vertical">
          <div scAttachmentMedia variant="image">
            <img
              ngSrc="/images/gallery/cafe-thumb.jpg"
              fill
              priority
              alt="Café"
            />
          </div>
          <div scAttachmentContent>
            <div scAttachmentTitle>cafe.jpg</div>
            <div scAttachmentDescription>JPG · 820 KB</div>
          </div>
        </div>
        <div scAttachment orientation="vertical">
          <div scAttachmentMedia variant="image">
            <img ngSrc="/images/gallery/coast-thumb.jpg" fill alt="Coast" />
          </div>
          <div scAttachmentContent>
            <div scAttachmentTitle>coast.jpg</div>
            <div scAttachmentDescription>JPG · 1.1 MB</div>
          </div>
        </div>
        <div scAttachment orientation="vertical">
          <div scAttachmentMedia variant="image">
            <img ngSrc="/images/gallery/forest-thumb.jpg" fill alt="Forest" />
          </div>
          <div scAttachmentContent>
            <div scAttachmentTitle>forest.jpg</div>
            <div scAttachmentDescription>JPG · 940 KB</div>
          </div>
        </div>
      </div>
      <div scAttachment state="uploading" class="w-full">
        <div scAttachmentMedia>
          <svg scSpinner siLoaderCircleIcon aria-label="Uploading"></svg>
        </div>
        <div scAttachmentContent>
          <div scAttachmentTitle>sales-dashboard.pdf</div>
          <div scAttachmentDescription>Uploading · 64%</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Cancel upload</span>
          </button>
        </div>
      </div>
      <div scAttachment class="w-full">
        <div scAttachmentMedia><svg siFileCodeIcon></svg></div>
        <div scAttachmentContent>
          <div scAttachmentTitle>message-renderer.ts</div>
          <div scAttachmentDescription>TypeScript · 12 KB</div>
        </div>
        <div scAttachmentActions>
          <button scAttachmentAction>
            <svg siXIcon></svg>
            <span class="sr-only">Remove message-renderer.ts</span>
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AttachmentUsageDemo {}`;
}
