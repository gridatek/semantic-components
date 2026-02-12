import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-variants-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button sc-timezone-display variant="default"></button>
        <span class="text-xs text-muted-foreground">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-timezone-display variant="outline"></button>
        <span class="text-xs text-muted-foreground">Outline</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-timezone-display variant="ghost"></button>
        <span class="text-xs text-muted-foreground">Ghost</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTimezoneDemo {}
