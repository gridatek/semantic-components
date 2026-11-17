import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A small dot that pulses: something is live or new (shadcndashboard's
 * "Update" banner). Decorative — say what it means in the text beside it.
 * Still for reduced motion. The library has none: a candidate for it.
 */
@Component({
  selector: 'app-live-dot',
  template: `
    <span
      class="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:hidden"
    ></span>
    <span class="bg-primary relative inline-flex size-2 rounded-full"></span>
  `,
  host: { 'aria-hidden': 'true', '[class]': 'class()' },
  encapsulation: ViewEncapsulation.None,
})
export class LiveDot {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative inline-flex size-2 shrink-0', this.classInput()),
  );
}
