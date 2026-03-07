import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScImageAnnotator } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-size-image-annotator-demo',
  imports: [ScImageAnnotator],
  template: `
    <sc-image-annotator [src]="imageSrc()" [width]="400" [height]="300" />
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSizeImageAnnotatorDemo {
  readonly imageSrc = signal('https://picsum.photos/seed/annotate2/400/300');
}
