import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarquee,
  ScMarqueeContent,
  ScMarqueeItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-stacked-marquee-demo',
  imports: [ScMarquee, ScMarqueeContent, ScMarqueeItem],
  template: `
    <div class="space-y-2">
      <div scMarquee [duration]="30" [gap]="24">
        <div scMarqueeContent>
          @for (emoji of row1Emojis; track emoji) {
            <span scMarqueeItem class="text-3xl">{{ emoji }}</span>
          }
        </div>
        <div scMarqueeContent aria-hidden="true">
          @for (emoji of row1Emojis; track emoji) {
            <span scMarqueeItem class="text-3xl">{{ emoji }}</span>
          }
        </div>
      </div>
      <div scMarquee [duration]="25" [reverse]="true" [gap]="24">
        <div scMarqueeContent>
          @for (emoji of row2Emojis; track emoji) {
            <span scMarqueeItem class="text-3xl">{{ emoji }}</span>
          }
        </div>
        <div scMarqueeContent aria-hidden="true">
          @for (emoji of row2Emojis; track emoji) {
            <span scMarqueeItem class="text-3xl">{{ emoji }}</span>
          }
        </div>
      </div>
      <div scMarquee [duration]="35" [gap]="24">
        <div scMarqueeContent>
          @for (emoji of row3Emojis; track emoji) {
            <span scMarqueeItem class="text-3xl">{{ emoji }}</span>
          }
        </div>
        <div scMarqueeContent aria-hidden="true">
          @for (emoji of row3Emojis; track emoji) {
            <span scMarqueeItem class="text-3xl">{{ emoji }}</span>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedMarqueeDemo {
  readonly row1Emojis = ['🚀', '⭐', '💡', '🎯', '🔥', '💎', '🌟', '✨'];
  readonly row2Emojis = ['🎨', '🎭', '🎪', '🎢', '🎡', '🎠', '🎮', '🎲'];
  readonly row3Emojis = ['🌈', '🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '💐'];
}
