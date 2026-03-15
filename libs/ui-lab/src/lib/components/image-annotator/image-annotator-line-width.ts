import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

@Directive({
  selector: 'input[type="range"][scImageAnnotatorLineWidth]',
  host: {
    'data-slot': 'image-annotator-line-width',
    '[class]': 'class()',
    '[value]': 'state.lineWidth()',
    '(input)': 'onInput($event)',
  },
})
export class ScImageAnnotatorLineWidth {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScImageAnnotatorState);

  protected readonly class = computed(() =>
    cn('accent-primary h-1 w-20', this.classInput()),
  );

  protected onInput(event: Event): void {
    this.state.setLineWidth(
      parseInt((event.target as HTMLInputElement).value, 10),
    );
  }
}
