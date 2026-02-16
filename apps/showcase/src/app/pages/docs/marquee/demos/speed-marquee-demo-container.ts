import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpeedMarqueeDemo } from './speed-marquee-demo';

@Component({
  selector: 'app-speed-marquee-demo-container',
  imports: [DemoContainer, SpeedMarqueeDemo],
  template: `
    <app-demo-container title="Speed Variations" [code]="code">
      <app-speed-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-speed-marquee-demo',
  imports: [ScMarqueeText],
  template: \`
    <div class="space-y-4">
      <div>
        <p class="text-sm text-muted-foreground mb-1">Fast (10s)</p>
        <sc-marquee-text
          text="Fast scrolling text"
          [duration]="10"
          separator="→"
        />
      </div>
      <div>
        <p class="text-sm text-muted-foreground mb-1">Normal (20s)</p>
        <sc-marquee-text
          text="Normal scrolling text"
          [duration]="20"
          separator="→"
        />
      </div>
      <div>
        <p class="text-sm text-muted-foreground mb-1">Slow (40s)</p>
        <sc-marquee-text
          text="Slow scrolling text"
          [duration]="40"
          separator="→"
        />
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedMarqueeDemo {}`;
}
