import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StackedMarqueeDemo } from './stacked-marquee-demo';

@Component({
  selector: 'app-stacked-marquee-demo-container',
  imports: [DemoContainer, StackedMarqueeDemo],
  template: `
    <app-demo-container title="Stacked" [code]="code">
      <app-stacked-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarquee, ScMarqueeClone, ScMarqueeItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-stacked-marquee-demo',
  imports: [ScMarquee, ScMarqueeClone, ScMarqueeItem],
  template: \`
    <div class="space-y-2">
      <sc-marquee [duration]="30" [gap]="24">
        @for (emoji of row1Emojis; track emoji) {
          <span sc-marquee-item class="text-3xl">{{ emoji }}</span>
        }
        <ng-container sc-marquee-clone>
          @for (emoji of row1Emojis; track emoji) {
            <span sc-marquee-item class="text-3xl">{{ emoji }}</span>
          }
        </ng-container>
      </sc-marquee>
      <sc-marquee [duration]="25" [reverse]="true" [gap]="24">
        @for (emoji of row2Emojis; track emoji) {
          <span sc-marquee-item class="text-3xl">{{ emoji }}</span>
        }
        <ng-container sc-marquee-clone>
          @for (emoji of row2Emojis; track emoji) {
            <span sc-marquee-item class="text-3xl">{{ emoji }}</span>
          }
        </ng-container>
      </sc-marquee>
      <sc-marquee [duration]="35" [gap]="24">
        @for (emoji of row3Emojis; track emoji) {
          <span sc-marquee-item class="text-3xl">{{ emoji }}</span>
        }
        <ng-container sc-marquee-clone>
          @for (emoji of row3Emojis; track emoji) {
            <span sc-marquee-item class="text-3xl">{{ emoji }}</span>
          }
        </ng-container>
      </sc-marquee>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedMarqueeDemo {
  readonly row1Emojis = ['🚀', '⭐', '💡', '🎯', '🔥', '💎', '🌟', '✨'];
  readonly row2Emojis = ['🎨', '🎭', '🎪', '🎢', '🎡', '🎠', '🎮', '🎲'];
  readonly row3Emojis = ['🌈', '🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '💐'];
}`;
}
