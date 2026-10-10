import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

/**
 * The annotator's toolbar (`role="toolbar"`, one Tab stop, arrow keys between
 * buttons). Exposes the configured tools and colors for `@for` loops.
 */
@Directive({
  selector: 'div[scImageAnnotatorToolbar]',
  exportAs: 'scImageAnnotatorToolbar',
  hostDirectives: [{ directive: Toolbar, inputs: ['wrap'] }],
  host: {
    'data-slot': 'image-annotator-toolbar',
    '[attr.aria-label]': 'label()',
    '[class]': 'class()',
  },
})
export class ScImageAnnotatorToolbar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly label = input('Annotation tools', { alias: 'aria-label' });

  private readonly state = inject(ScImageAnnotatorState);

  protected readonly class = computed(() =>
    cn(
      'bg-muted/50 flex flex-wrap items-center gap-2 border-b p-2',
      this.classInput(),
    ),
  );

  readonly tools = computed(() => this.state.tools());
  readonly colors = computed(() => this.state.colors());
  readonly lineWidth = this.state.lineWidth;
  readonly hasAnnotations = computed(() => this.state.annotations().length > 0);
}
