import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

/**
 * Selects a stroke color. Name it (`[attr.aria-label]="color.label"`).
 */
@Directive({
  selector: 'button[scImageAnnotatorColorButton]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    'data-slot': 'image-annotator-color-button',
    '[style.background-color]': 'color()',
    '[attr.aria-pressed]': 'isActive()',
    '[class]': 'class()',
    '(click)': 'select()',
  },
})
export class ScImageAnnotatorColorButton {
  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorColorButton');
  }

  readonly classInput = input<string>('', { alias: 'class' });
  readonly color = input.required<string>();

  private readonly state = inject(ScImageAnnotatorState);
  protected readonly isActive = computed(
    () => this.state.currentColor() === this.color(),
  );

  protected readonly class = computed(() =>
    cn(
      'border-border size-6 rounded-md border-2 outline-none transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50',
      this.isActive() &&
        'ring-ring ring-2 ring-offset-1 ring-offset-background',
      this.classInput(),
    ),
  );

  protected select(): void {
    this.state.selectColor(this.color());
  }
}
