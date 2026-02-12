import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScProgress } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-values-progress-demo',
  imports: [ScProgress],
  template: `
    <div class="space-y-3">
      <div class="flex items-center gap-4">
        <span class="w-12 text-sm text-muted-foreground">0%</span>
        <div sc-progress [value]="0" class="flex-1"></div>
      </div>
      <div class="flex items-center gap-4">
        <span class="w-12 text-sm text-muted-foreground">25%</span>
        <div sc-progress [value]="25" class="flex-1"></div>
      </div>
      <div class="flex items-center gap-4">
        <span class="w-12 text-sm text-muted-foreground">50%</span>
        <div sc-progress [value]="50" class="flex-1"></div>
      </div>
      <div class="flex items-center gap-4">
        <span class="w-12 text-sm text-muted-foreground">75%</span>
        <div sc-progress [value]="75" class="flex-1"></div>
      </div>
      <div class="flex items-center gap-4">
        <span class="w-12 text-sm text-muted-foreground">100%</span>
        <div sc-progress [value]="100" class="flex-1"></div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuesProgressDemo {}
