import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-display-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: `
    <div class="flex items-center gap-4">
      <button scTimezoneDisplay></button>
      <span class="text-muted-foreground text-sm">
        Shows current timezone abbreviation
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTimezoneDemo {}
