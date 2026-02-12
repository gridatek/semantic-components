import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-table-skeleton-demo',
  imports: [ScSkeleton],
  template: `
    <div class="rounded-md border">
      <div class="border-b p-4">
        <div class="flex items-center space-x-4">
          <div sc-skeleton class="h-4 w-[100px]"></div>
          <div sc-skeleton class="h-4 w-[150px]"></div>
          <div sc-skeleton class="h-4 w-[100px]"></div>
          <div sc-skeleton class="h-4 w-[80px]"></div>
        </div>
      </div>
      @for (i of [1, 2, 3]; track i) {
        <div class="border-b p-4 last:border-0">
          <div class="flex items-center space-x-4">
            <div sc-skeleton class="h-4 w-[100px]"></div>
            <div sc-skeleton class="h-4 w-[150px]"></div>
            <div sc-skeleton class="h-4 w-[100px]"></div>
            <div sc-skeleton class="h-4 w-[80px]"></div>
          </div>
        </div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSkeletonDemo {}
