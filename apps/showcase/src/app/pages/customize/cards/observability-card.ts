import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

/** An announcement: a photo tinted in the primary color, then the news. */
@Component({
  selector: 'app-preview-observability-card',
  imports: [
    NgOptimizedImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    SiPlusIcon,
  ],
  template: `
    <div scCard class="relative w-full overflow-hidden pt-0">
      <div class="relative aspect-video w-full">
        <div
          class="bg-primary absolute inset-0 z-30 opacity-50 mix-blend-color"
        ></div>
        <img
          ngSrc="/images/gallery/coast.jpg"
          fill
          alt="A rocky coast"
          class="z-20 object-cover brightness-60 grayscale"
        />
      </div>
      <div scCardHeader>
        <h2 scCardTitle>Observability Plus is replacing Monitoring</h2>
        <p scCardDescription>
          Switch to the improved way to explore your data, with natural
          language. Monitoring will no longer be available on the Pro plan in
          November, 2025
        </p>
      </div>
      <div scCardFooter>
        <button scButton>
          Create Query
          <svg siPlusIcon data-icon="inline-end"></svg>
        </button>
        <span scBadge variant="secondary" class="ms-auto">Warning</span>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewObservabilityCard {}
