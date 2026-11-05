import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImageAttachmentDemo } from './image-attachment-demo';

@Component({
  selector: 'app-image-attachment-demo-container',
  imports: [DemoContainer, ImageAttachmentDemo],
  template: `
    <app-demo-container
      title="Image"
      demoUrl="/demos/attachment/image-attachment-demo"
      [code]="code"
    >
      <app-image-attachment-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageAttachmentDemoContainer {
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
  ScAttachmentTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** variant="image" on the media, your img in it; orientation="vertical" puts it above the text. The whole card opens the image (a trigger on your link), the remove button above it. */
@Component({
  selector: 'app-image-attachment-demo',
  imports: [
    NgOptimizedImage,
    ScAttachment,
    ScAttachmentMedia,
    ScAttachmentContent,
    ScAttachmentTitle,
    ScAttachmentDescription,
    ScAttachmentActions,
    ScAttachmentAction,
    ScAttachmentTrigger,
    ScAttachmentGroup,
    SiXIcon,
  ],
  template: \`
    <div class="w-full max-w-sm">
      <div scAttachmentGroup>
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
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove cafe.jpg</span>
            </button>
          </div>
          <a
            scAttachmentTrigger
            href="/images/gallery/cafe.jpg"
            target="_blank"
            rel="noreferrer"
          >
            <span class="sr-only">Open cafe.jpg</span>
          </a>
        </div>
        <div scAttachment orientation="vertical">
          <div scAttachmentMedia variant="image">
            <img ngSrc="/images/gallery/coast-thumb.jpg" fill alt="Coast" />
          </div>
          <div scAttachmentContent>
            <div scAttachmentTitle>coast.jpg</div>
            <div scAttachmentDescription>JPG · 1.1 MB</div>
          </div>
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove coast.jpg</span>
            </button>
          </div>
          <a
            scAttachmentTrigger
            href="/images/gallery/coast.jpg"
            target="_blank"
            rel="noreferrer"
          >
            <span class="sr-only">Open coast.jpg</span>
          </a>
        </div>
        <div scAttachment orientation="vertical">
          <div scAttachmentMedia variant="image">
            <img ngSrc="/images/gallery/forest-thumb.jpg" fill alt="Forest" />
          </div>
          <div scAttachmentContent>
            <div scAttachmentTitle>forest.jpg</div>
            <div scAttachmentDescription>JPG · 940 KB</div>
          </div>
          <div scAttachmentActions>
            <button scAttachmentAction>
              <svg siXIcon></svg>
              <span class="sr-only">Remove forest.jpg</span>
            </button>
          </div>
          <a
            scAttachmentTrigger
            href="/images/gallery/forest.jpg"
            target="_blank"
            rel="noreferrer"
          >
            <span class="sr-only">Open forest.jpg</span>
          </a>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageAttachmentDemo {}`;
}
