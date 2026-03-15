import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { AnnotationTool } from './image-annotator-types';

@Directive({
  selector: 'button[scImageAnnotatorToolButton]',
  host: {
    'data-slot': 'image-annotator-tool-button',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'isActive()',
    '(click)': 'select()',
  },
})
export class ScImageAnnotatorToolButton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly tool = input.required<AnnotationTool>();

  private readonly state = inject(ScImageAnnotatorState);

  protected readonly isActive = computed(
    () => this.state.currentTool() === this.tool(),
  );

  protected readonly class = computed(() =>
    cn(
      'rounded p-2 transition-colors',
      this.isActive() ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
      this.classInput(),
    ),
  );

  protected select(): void {
    this.state.selectTool(this.tool());
  }
}
