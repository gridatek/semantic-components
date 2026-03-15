import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

@Directive({
  selector: 'button[scImageAnnotatorAction]',
  host: {
    'data-slot': 'image-annotator-action',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'isDisabled()',
    '(click)': 'onClick()',
  },
})
export class ScImageAnnotatorAction {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly action = input.required<'undo' | 'clear' | 'download'>();

  private readonly state = inject(ScImageAnnotatorState);

  protected readonly class = computed(() =>
    cn('hover:bg-muted rounded p-2 transition-colors', this.classInput()),
  );

  protected readonly isDisabled = computed(() => {
    if (this.action() === 'download') return false;
    return this.state.annotations().length === 0;
  });

  protected onClick(): void {
    switch (this.action()) {
      case 'undo':
        this.state.undo();
        break;
      case 'clear':
        this.state.clearAll();
        break;
      case 'download':
        this.state.download();
        break;
    }
  }
}
