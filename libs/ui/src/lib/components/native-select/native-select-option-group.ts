import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** A group of options under its `label`: the system's colours, as the options. */
@Directive({
  selector: 'optgroup[scNativeSelectOptionGroup]',
  host: {
    '[class]': 'class()',
  },
})
export class ScNativeSelectOptionGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-[Canvas] text-[CanvasText]', this.classInput()),
  );
}
