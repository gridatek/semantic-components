import { Directive, computed, inject, input, output } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { Annotation } from './image-annotator-types';

@Directive({
  selector: 'div[scImageAnnotator]',
  providers: [ScImageAnnotatorState],
  host: {
    'data-slot': 'image-annotator',
    '[class]': 'class()',
  },
})
export class ScImageAnnotator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly src = input.required<string>();
  readonly width = input(600);
  readonly height = input(400);

  readonly annotationsChange = output<Annotation[]>();
  readonly save = output<string>();

  private readonly state = inject(ScImageAnnotatorState);

  protected readonly class = computed(() =>
    cn('overflow-hidden rounded-lg border bg-background', this.classInput()),
  );

  constructor() {
    this.state.src = this.src;
    this.state.width = this.width;
    this.state.height = this.height;
    this.state.onAnnotationsChange = (annotations) => {
      this.annotationsChange.emit(annotations);
    };
    this.state.onSave = (dataUrl) => {
      this.save.emit(dataUrl);
    };
  }

  getAnnotations(): Annotation[] {
    return this.state.getAnnotations();
  }

  setAnnotations(annotations: Annotation[]): void {
    this.state.setAnnotations(annotations);
  }
}
