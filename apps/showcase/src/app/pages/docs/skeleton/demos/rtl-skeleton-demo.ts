import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

/** In a right-to-left page: the picture at the right, the lines from the right. */
@Component({
  selector: 'app-rtl-skeleton-demo',
  imports: [ScSkeleton],
  template: `
    <div dir="rtl" lang="ar">
      <div class="flex items-center gap-4">
        <div scSkeleton class="size-12 rounded-full"></div>
        <div class="space-y-2">
          <div scSkeleton class="h-4 w-[250px]"></div>
          <div scSkeleton class="h-4 w-[200px]"></div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSkeletonDemo {}
