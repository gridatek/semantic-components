import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomSizeImageAnnotatorDemo } from './custom-size-image-annotator-demo';

@Component({
  selector: 'app-custom-size-image-annotator-demo-container',
  imports: [DemoContainer, CustomSizeImageAnnotatorDemo],
  template: `
    <app-demo-container title="Custom Size" [code]="code">
      <app-custom-size-image-annotator-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSizeImageAnnotatorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScImageAnnotator } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-size-image-annotator-demo',
  imports: [ScImageAnnotator],
  template: \`
    <sc-image-annotator [src]="imageSrc()" [width]="400" [height]="300" />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSizeImageAnnotatorDemo {
  readonly imageSrc = signal('https://picsum.photos/seed/annotate2/400/300');
}`;
}
