import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The list of links. */
@Directive({
  selector: 'ul[scTocList], ol[scTocList]',
  host: {
    '[class]': 'class()',
  },
})
export class ScTocList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-2', this.classInput()),
  );
}
