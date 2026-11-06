import { Component, ViewEncapsulation } from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

@Component({
  selector: 'app-skeleton-usage-demo',
  imports: [ScSkeleton],
  template: `
    <div class="flex items-center gap-4">
      <div scSkeleton class="size-12 rounded-full"></div>
      <div class="space-y-2">
        <div scSkeleton class="h-4 w-[250px]"></div>
        <div scSkeleton class="h-4 w-[200px]"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SkeletonUsageDemo {}
