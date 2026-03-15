import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScImageAnnotator,
  ScImageAnnotatorCanvas,
  ScImageAnnotatorToolbar,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-size-image-annotator-demo',
  imports: [ScImageAnnotator, ScImageAnnotatorToolbar, ScImageAnnotatorCanvas],
  template: `
    <div scImageAnnotator [src]="imageSrc()" [width]="400" [height]="300">
      <div scImageAnnotatorToolbar></div>
      <div scImageAnnotatorCanvas></div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSizeImageAnnotatorDemo {
  readonly imageSrc = signal('https://picsum.photos/seed/annotate2/400/300');
}
