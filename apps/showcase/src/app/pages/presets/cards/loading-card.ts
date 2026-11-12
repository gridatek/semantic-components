import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardHeader,
  ScSkeleton,
} from '@semantic-components/ui';

/** A card still loading: its shapes in skeletons. */
@Component({
  selector: 'app-preview-loading-card',
  imports: [ScCard, ScCardContent, ScCardHeader, ScSkeleton],
  template: `
    <div scCard aria-busy="true">
      <div scCardHeader>
        <div scSkeleton class="h-5 w-32"></div>
        <div scSkeleton class="h-4 w-48"></div>
      </div>
      <div scCardContent class="flex flex-col gap-4">
        <div scSkeleton class="h-32 w-full"></div>
        <div class="flex flex-col gap-2">
          <div scSkeleton class="h-4 w-full"></div>
          <div scSkeleton class="h-4 w-3/4"></div>
          <div scSkeleton class="h-4 w-1/2"></div>
        </div>
        <div class="flex gap-2">
          <div scSkeleton class="h-9 flex-1"></div>
          <div scSkeleton class="h-9 flex-1"></div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewLoadingCard {}
