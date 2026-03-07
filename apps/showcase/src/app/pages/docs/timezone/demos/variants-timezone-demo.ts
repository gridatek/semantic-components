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
        <button scTimezoneDisplay variant="default"></button>
        <span class="text-muted-foreground text-xs">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scTimezoneDisplay variant="outline"></button>
        <span class="text-muted-foreground text-xs">Outline</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scTimezoneDisplay variant="ghost"></button>
        <span class="text-muted-foreground text-xs">Ghost</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsTimezoneDemo {}
