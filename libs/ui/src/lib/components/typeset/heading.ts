import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A heading, h1 to h6, as Typeset sets it without a `typeset` container
 * around it: it marks itself `data-typeset`, and typeset.css (the app imports
 * it) sets it by its tag — the same rules as a heading in a container, from
 * the same variables (`--typeset-size`, `--typeset-flow`,
 * `--typeset-font-heading`…). In a container, a plain `h2` is enough.
 */
@Directive({
  selector:
    'h1[scHeading], h2[scHeading], h3[scHeading], h4[scHeading], h5[scHeading], h6[scHeading]',
  host: {
    'data-typeset': '',
    '[class]': 'class()',
  },
})
export class ScHeading {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
