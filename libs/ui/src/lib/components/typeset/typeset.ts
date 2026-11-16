import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * An element set by Typeset without a `typeset` container around it — a
 * heading, a paragraph, a quote, inline code, a rule: it marks itself
 * `data-typeset`, and typeset.css (the app imports it) sets it by its tag,
 * with the same rules as in a container and from the same variables
 * (`--typeset-size`, `--typeset-flow`…). In a container, plain elements are
 * enough; for the container itself, `class="typeset"`.
 */
@Directive({
  selector: '[scTypeset]',
  host: {
    'data-typeset': '',
    '[class]': 'class()',
  },
})
export class ScTypeset {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
