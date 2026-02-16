import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-reversed-marquee-demo',
  imports: [ScMarqueeText],
  template: `
    <div class="rounded-lg border bg-muted/30 py-2">
      <sc-marquee-text
        text="This text scrolls in the opposite direction"
        [duration]="12"
        [reverse]="true"
        separator="★"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReversedMarqueeDemo {}
