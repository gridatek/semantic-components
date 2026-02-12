import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PauseOnHoverMarqueeDemo } from './pause-on-hover-marquee-demo';

@Component({
  selector: 'app-pause-on-hover-marquee-demo-container',
  imports: [DemoContainer, PauseOnHoverMarqueeDemo],
  template: `
    <app-demo-container title="Pause on Hover" [code]="code">
      <app-pause-on-hover-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseOnHoverMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-pause-on-hover-marquee-demo',
  imports: [ScMarqueeText],
  template: \`
    <p class="text-sm text-muted-foreground mb-3">
      Hover over the marquee to pause animation
    </p>
    <div class="rounded-lg border bg-primary/5 py-3">
      <sc-marquee-text
        text="Hover over me to pause the animation!"
        [duration]="15"
        [pauseOnHover]="true"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseOnHoverMarqueeDemo {}`;
}
