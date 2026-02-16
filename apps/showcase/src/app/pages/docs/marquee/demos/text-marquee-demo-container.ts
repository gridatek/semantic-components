import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TextMarqueeDemo } from './text-marquee-demo';

@Component({
  selector: 'app-text-marquee-demo-container',
  imports: [DemoContainer, TextMarqueeDemo],
  template: `
    <app-demo-container title="Text" [code]="code">
      <app-text-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-text-marquee-demo',
  imports: [ScMarqueeText],
  template: \`
    <div class="rounded-lg border bg-muted/30 py-2">
      <sc-marquee-text
        text="Breaking News: This is a scrolling text marquee component for Angular"
        [duration]="15"
      />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMarqueeDemo {}`;
}
