import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ReversedMarqueeDemo } from './reversed-marquee-demo';

@Component({
  selector: 'app-reversed-marquee-demo-container',
  imports: [DemoContainer, ReversedMarqueeDemo],
  template: `
    <app-demo-container title="Reversed" [code]="code">
      <app-reversed-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReversedMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-reversed-marquee-demo',
  imports: [ScMarqueeText],
  template: \`
    <div class="rounded-lg border bg-muted/30 py-2">
      <sc-marquee-text
        text="This text scrolls in the opposite direction"
        [duration]="12"
        [reverse]="true"
        separator="★"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReversedMarqueeDemo {}`;
}
