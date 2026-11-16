import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A heading, h1 to h6, as Typeset sets it: its look is typeset.css's (the
 * app imports it), the same rules as a heading in a `typeset` container, from
 * the same variables — `--typeset-size`, `--typeset-flow`,
 * `--typeset-font-heading` — with the container's defaults when it's in none.
 */
@Directive({
  selector:
    'h1[scHeading], h2[scHeading], h3[scHeading], h4[scHeading], h5[scHeading], h6[scHeading]',
  host: {
    '[class]': 'class()',
  },
})
export class ScHeading {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
