import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-skeleton-demo',
  imports: [ScSkeleton],
  template: `
    <div class="space-y-2">
      <div scSkeleton class="h-4 w-[250px]"></div>
      <div scSkeleton class="h-4 w-[200px]"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSkeletonDemo {}
