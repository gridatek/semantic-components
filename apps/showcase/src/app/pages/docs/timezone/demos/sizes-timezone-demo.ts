import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button sc-timezone-display variant="outline" size="sm"></button>
        <span class="text-xs text-muted-foreground">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-timezone-display variant="outline" size="default"></button>
        <span class="text-xs text-muted-foreground">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-timezone-display variant="outline" size="lg"></button>
        <span class="text-xs text-muted-foreground">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          sc-timezone-display
          variant="outline"
          size="icon"
          [iconOnly]="true"
        ></button>
        <span class="text-xs text-muted-foreground">Icon</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimezoneDemo {}
