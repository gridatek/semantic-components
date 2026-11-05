import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentDescription,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScBubble,
  ScBubbleContent,
  ScMessage,
  ScMessageContent,
} from '@semantic-components/ui';
import { SiDownloadIcon, SiFileTextIcon } from '@semantic-icons/lucide-icons';

/** An Attachment among a message’s bubbles. */
@Component({
  selector: 'app-attachment-message-demo',
  imports: [
    NgOptimizedImage,
    ScAttachment,
    ScAttachmentAction,
    ScAttachmentActions,
    ScAttachmentContent,
    ScAttachmentDescription,
    ScAttachmentMedia,
    ScAttachmentTitle,
    ScBubble,
    ScBubbleContent,
    ScMessage,
    ScMessageContent,
    SiFileTextIcon,
    SiDownloadIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-8 py-6">
      <div scMessage align="end">
        <div scMessageContent>
          <div scAttachment orientation="vertical">
            <div scAttachmentMedia variant="image">
              <img
                ngSrc="/images/gallery/cafe-thumb.jpg"
                fill
                priority
                alt="Café"
              />
            </div>
          </div>
          <div scBubble>
            <div scBubbleContent>
              Here&apos;s the image. Can you add it to the PDF, as the cover?
            </div>
          </div>
        </div>
      </div>
      <div scMessage>
        <div scMessageContent>
          <div scBubble variant="muted">
            <div scBubbleContent>
              Done. Here&apos;s the PDF with the image as its cover.
            </div>
          </div>
          <div scAttachment>
            <div scAttachmentMedia><svg siFileTextIcon></svg></div>
            <div scAttachmentContent>
              <div scAttachmentTitle>sales-dashboard.pdf</div>
              <div scAttachmentDescription>PDF · 2.4 MB</div>
            </div>
            <div scAttachmentActions>
              <button scAttachmentAction variant="secondary" size="icon-sm">
                <svg siDownloadIcon></svg>
                <span class="sr-only">Download sales-dashboard.pdf</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div scMessage align="end">
        <div scMessageContent>
          <div scBubble>
            <div scBubbleContent>Thanks. Looks good.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AttachmentMessageDemo {}
