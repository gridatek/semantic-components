import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-icon-only-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: `
    <div class="flex items-center gap-4">
      <button scTimezoneDisplay [iconOnly]="true" size="icon"></button>
      <span class="text-muted-foreground text-sm">Clock icon only</span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconOnlyTimezoneDemo {}
