import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

@Directive({
  selector: 'div[scImageAnnotatorToolbar]',
  exportAs: 'scImageAnnotatorToolbar',
  host: {
    'data-slot': 'image-annotator-toolbar',
    '[class]': 'class()',
  },
})
export class ScImageAnnotatorToolbar {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly state = inject(ScImageAnnotatorState);

  protected readonly class = computed(() =>
    cn('bg-muted/50 flex items-center gap-2 border-b p-2', this.classInput()),
  );

  readonly tools = this.state.tools;
  readonly colors = this.state.colors;
  readonly lineWidth = this.state.lineWidth;
  readonly hasAnnotations = computed(() => this.state.annotations().length > 0);
}
