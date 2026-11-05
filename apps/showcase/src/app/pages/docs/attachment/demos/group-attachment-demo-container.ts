import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupAttachmentDemo } from './group-attachment-demo';

@Component({
  selector: 'app-group-attachment-demo-container',
  imports: [DemoContainer, GroupAttachmentDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/attachment/group-attachment-demo"
      [code]="code"
    >
      <app-group-attachment-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupAttachmentDemoContainer {
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
} from '@semantic-components/ui';
import {
  SiFileCodeIcon,
  SiFileTextIcon,
  SiTableIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A row that scrolls and snaps, its edges fading. */
@Component({
  selector: 'app-group-attachment-demo',
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
    SiFileCodeIcon,
    SiFileTextIcon,
    SiTableIcon,
    SiXIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scAttachmentGroup>
        <div scAttachment>
          <div scAttachmentMedia><svg siFileTextIcon></svg></div>
          <div scAttachmentContent>
            <div scAttachmentTitle>briefing-notes.pdf</div>
            <div scAttachmentDescription>PDF · 1.4 MB</div>
          </div>
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove briefing-notes.pdf</span>
            </button>
          </div>
        </div>
        <div scAttachment>
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
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove cafe.jpg</span>
            </button>
          </div>
        </div>
        <div scAttachment>
          <div scAttachmentMedia><svg siTableIcon></svg></div>
          <div scAttachmentContent>
            <div scAttachmentTitle>customers.csv</div>
            <div scAttachmentDescription>CSV · 18 KB</div>
          </div>
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove customers.csv</span>
            </button>
          </div>
        </div>
        <div scAttachment>
          <div scAttachmentMedia><svg siFileCodeIcon></svg></div>
          <div scAttachmentContent>
            <div scAttachmentTitle>renderer.ts</div>
            <div scAttachmentDescription>TS · 12 KB</div>
          </div>
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove renderer.ts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupAttachmentDemo {}`;
}
