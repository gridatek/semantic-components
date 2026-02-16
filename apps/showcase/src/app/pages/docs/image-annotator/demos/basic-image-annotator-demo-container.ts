import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicImageAnnotatorDemo } from './basic-image-annotator-demo';

@Component({
  selector: 'app-basic-image-annotator-demo-container',
  imports: [DemoContainer, BasicImageAnnotatorDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-image-annotator-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicImageAnnotatorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScImageAnnotator, type Annotation } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-image-annotator-demo',
  imports: [ScImageAnnotator],
  template: \`
    <sc-image-annotator
      [src]="imageSrc()"
      [width]="700"
      [height]="450"
      (annotationsChange)="onAnnotationsChange($event)"
      (save)="onSave($event)"
    />
    <p class="mt-2 text-sm text-muted-foreground">
      Annotations: {{ annotationCount() }}
    </p>
  \`,
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
}`;
}
