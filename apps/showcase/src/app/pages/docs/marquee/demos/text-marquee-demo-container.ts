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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMarqueeDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarqueeText,
  ScMarqueeTextSegment,
  ScMarqueeTextSeparator,
  ScMarqueeTextTrack,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-text-marquee-demo',
  imports: [
    ScMarqueeText,
    ScMarqueeTextTrack,
    ScMarqueeTextSegment,
    ScMarqueeTextSeparator,
  ],
  template: \`
    <div class="bg-muted/30 rounded-lg border py-2">
      <div scMarqueeText [duration]="15">
        <div scMarqueeTextTrack>
          @for (_ of repeats; track $index) {
            <span scMarqueeTextSegment>
              Breaking News: This is a scrolling text marquee component for
              Angular
            </span>
            <span scMarqueeTextSeparator>•</span>
          }
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMarqueeDemo {
  readonly repeats = [1, 2, 3, 4];
}`;
}
