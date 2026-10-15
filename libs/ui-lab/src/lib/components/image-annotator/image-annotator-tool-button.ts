import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { ScAnnotationTool } from './image-annotator-types';

/** Selects a drawing tool. Write its icon and name it (`[attr.aria-label]="tool.label"`). */
@Directive({
  selector: 'button[scImageAnnotatorToolButton]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    'data-slot': 'image-annotator-tool-button',
    '[attr.aria-pressed]': 'isActive()',
    '[class]': 'class()',
    '(click)': 'select()',
  },
})
export class ScImageAnnotatorToolButton {
  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorToolButton');
  }

  readonly classInput = input<string>('', { alias: 'class' });
  readonly tool = input.required<ScAnnotationTool>();

  private readonly state = inject(ScImageAnnotatorState);
  protected readonly isActive = computed(
    () => this.state.currentTool() === this.tool(),
  );

  protected readonly class = computed(() =>
    cn(
      'rounded-md p-2 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
      this.isActive() ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
      this.classInput(),
    ),
  );

  protected select(): void {
    this.state.selectTool(this.tool());
  }
}
