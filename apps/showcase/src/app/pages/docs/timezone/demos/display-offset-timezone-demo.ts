import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-display-offset-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: `
    <div class="flex items-center gap-4">
      <button scTimezoneDisplay [showOffset]="true"></button>
      <span class="text-muted-foreground text-sm">
        Shows abbreviation and UTC offset
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayOffsetTimezoneDemo {}
