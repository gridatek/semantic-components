import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** A group of options under its `label`: the system's colours, as the options. */
@Directive({
  selector: 'optgroup[scNativeSelectNextOptGroup]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeSelectNextOptGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-[Canvas] text-[CanvasText]', this.classInput()),
  );
}
