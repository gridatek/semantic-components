import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSkeleton } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-article-skeleton-demo',
  imports: [ScSkeleton],
  template: `
    <div class="space-y-3">
      <div sc-skeleton class="h-[125px] w-[250px] rounded-xl"></div>
      <div class="space-y-2">
        <div sc-skeleton class="h-4 w-[250px]"></div>
        <div sc-skeleton class="h-4 w-[200px]"></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSkeletonDemo {}
