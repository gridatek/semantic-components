import { Directive, computed, inject, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import {
  type Annotation,
  type AnnotatorColor,
  type AnnotatorToolOption,
  DEFAULT_ANNOTATOR_COLORS,
  DEFAULT_ANNOTATOR_TOOLS,
} from './image-annotator-types';

/**
 * Draw and mark up an image. Holds the shared state for its toolbar and
 * canvas. `width` × `height` is the image coordinate space (and the export
 * size); the annotator scales down to fit its container, keeping the ratio.
 */
@Directive({
  selector: 'div[scImageAnnotator]',
  exportAs: 'scImageAnnotator',
  providers: [ScImageAnnotatorState],
  host: {
    'data-slot': 'image-annotator',
    '[class]': 'class()',
    '[style.max-width.px]': 'width()',
  },
})
export class ScImageAnnotator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly src = input.required<string>();
  /** Image coordinate width and export width, in pixels. */
  readonly width = input(600);
  /** Image coordinate height and export height, in pixels. */
  readonly height = input(400);
  /** Accessible name of the image. */
  readonly alt = input('Annotated image');
  readonly colors = input<readonly AnnotatorColor[]>(DEFAULT_ANNOTATOR_COLORS);
  readonly tools = input<readonly AnnotatorToolOption[]>(
    DEFAULT_ANNOTATOR_TOOLS,
  );

  private readonly state = inject(ScImageAnnotatorState);

  /** Emits the annotations after every user change (draw, erase, undo, redo, clear). */
  readonly annotationsChange = outputFromObservable(this.state.changes);
  /** Emits the PNG data URL when the image is downloaded. */
  readonly save = outputFromObservable(this.state.saved);

  protected readonly class = computed(() =>
    cn(
      'flex w-full flex-col overflow-hidden rounded-lg border bg-background',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.src = this.src;
    this.state.width = this.width;
    this.state.height = this.height;
    this.state.alt = this.alt;
    this.state.colors = this.colors;
    this.state.tools = this.tools;
  }

  getAnnotations(): Annotation[] {
    return this.state.getAnnotations();
  }

  /** Replaces the annotations (resets undo history, emits nothing). */
  setAnnotations(annotations: Annotation[]): void {
    this.state.setAnnotations(annotations);
  }
}
