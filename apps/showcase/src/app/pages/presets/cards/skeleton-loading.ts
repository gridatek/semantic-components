import { Component, ViewEncapsulation } from '@angular/core';
import { ScCard, ScCardContent, ScSkeleton } from '@semantic-components/ui';

/** A post still loading: an avatar, lines and buttons as skeletons. */
@Component({
  selector: 'app-preview-skeleton-loading',
  imports: [ScCard, ScCardContent, ScSkeleton],
  template: `
    <div scCard aria-busy="true">
      <div scCardContent class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div scSkeleton class="size-10 rounded-full"></div>
          <div class="flex flex-1 flex-col gap-2">
            <div scSkeleton class="h-4 w-3/4"></div>
            <div scSkeleton class="h-3 w-1/2"></div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div scSkeleton class="h-3 w-full"></div>
          <div scSkeleton class="h-3 w-full"></div>
          <div scSkeleton class="h-3 w-4/5"></div>
        </div>
        <div class="flex gap-2">
          <div scSkeleton class="h-8 w-20"></div>
          <div scSkeleton class="h-8 w-20"></div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewSkeletonLoading {}
