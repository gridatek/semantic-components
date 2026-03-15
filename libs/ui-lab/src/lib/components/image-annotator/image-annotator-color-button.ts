import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

@Directive({
  selector: 'button[scImageAnnotatorColorButton]',
  host: {
    'data-slot': 'image-annotator-color-button',
    type: 'button',
    '[class]': 'class()',
    '[style.background-color]': 'color()',
    '[attr.aria-pressed]': 'isActive()',
    '[attr.aria-label]': '"Color " + color()',
    '(click)': 'select()',
  },
})
export class ScImageAnnotatorColorButton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly color = input.required<string>();

  private readonly state = inject(ScImageAnnotatorState);

  protected readonly isActive = computed(
    () => this.state.currentColor() === this.color(),
  );

  protected readonly class = computed(() =>
    cn(
      'h-6 w-6 rounded border-2 transition-transform hover:scale-110',
      this.isActive() && 'ring-2 ring-offset-1',
      this.classInput(),
    ),
  );

  protected select(): void {
    this.state.selectColor(this.color());
  }
}
