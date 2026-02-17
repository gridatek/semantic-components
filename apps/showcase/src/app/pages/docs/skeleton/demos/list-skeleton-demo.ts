import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-list-skeleton-demo',
  imports: [ScSkeleton],
  template: `
    <div class="space-y-3">
      @for (i of [1, 2, 3, 4]; track i) {
        <div class="flex items-center space-x-4">
          <div scSkeleton class="size-10 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div scSkeleton class="h-4 w-3/4"></div>
            <div scSkeleton class="h-3 w-1/2"></div>
          </div>
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSkeletonDemo {}
