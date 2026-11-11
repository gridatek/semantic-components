import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** An option: the system's colours, so the browser's list reads in dark mode too. */
@Directive({
  selector: 'option[scNativeSelectNextOption]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeSelectNextOption {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-[Canvas] text-[CanvasText]', this.classInput()),
  );
}
