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
    <div class="bg-muted/30 rounded-lg border py-2">
      <div
        scMarqueeText
        text="This text scrolls in the opposite direction"
        [duration]="12"
        [reverse]="true"
        separator="★"
      ></div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReversedMarqueeDemo {}
