import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  type Annotation,
  ScImageAnnotator,
  ScImageAnnotatorCanvas,
  ScImageAnnotatorToolbar,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-image-annotator-demo',
  imports: [ScImageAnnotator, ScImageAnnotatorToolbar, ScImageAnnotatorCanvas],
  template: `
    <div
      scImageAnnotator
      [src]="imageSrc()"
      [width]="700"
      [height]="450"
      (annotationsChange)="onAnnotationsChange($event)"
      (save)="onSave($event)"
    >
      <div scImageAnnotatorToolbar></div>
      <div scImageAnnotatorCanvas></div>
    </div>
    <p class="text-muted-foreground mt-2 text-sm">
      Annotations: {{ annotationCount() }}
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicImageAnnotatorDemo {
  readonly annotationCount = signal(0);
  readonly imageSrc = signal('https://picsum.photos/seed/annotate1/700/450');

  onAnnotationsChange(annotations: Annotation[]): void {
    this.annotationCount.set(annotations.length);
  }

  onSave(dataUrl: string): void {
    console.log('Image saved, data URL length:', dataUrl.length);
  }
}
