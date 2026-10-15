import {
  Component,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { cn } from '../../utils';
import { ScProgressIndicator } from './progress-indicator';

@Component({
  selector: '[scProgress]',
  imports: [ScProgressIndicator],
  host: {
    role: 'progressbar',
    '[class]': 'class()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'value()',
    '[attr.data-state]': 'state()',
  },
  template: ` <div scProgressIndicator></div> `,
  encapsulation: ViewEncapsulation.None,
})
export class ScProgress implements FormValueControl<number | null> {
  constructor() {
    // In development: a progress bar needs a name — the library gives none.
    if (typeof ngDevMode !== 'undefined' && ngDevMode) {
      const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
      afterNextRender(() => {
        if (
          !element.hasAttribute('aria-label') &&
          !element.hasAttribute('aria-labelledby')
        ) {
          console.warn(
            'scProgress has no name: give it aria-label or aria-labelledby.',
            element,
          );
        }
      });
    }
  }

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model<number | null>(null);
  readonly max = input<number | undefined>(100);

  readonly percentage = computed(() => {
    const val = this.value();
    const maxVal = this.max() ?? 100;
    if (val === null || maxVal === 0) return 0;
    return Math.min(Math.max((val / maxVal) * 100, 0), 100);
  });

  protected readonly state = computed(() => {
    const val = this.value();
    const maxVal = this.max() ?? 100;
    if (val === null) return 'indeterminate';
    return val >= maxVal ? 'complete' : 'loading';
  });

  protected readonly class = computed(() =>
    cn(
      'bg-muted relative flex h-1 w-full items-center overflow-x-hidden rounded-full',
      this.classInput(),
    ),
  );
}
