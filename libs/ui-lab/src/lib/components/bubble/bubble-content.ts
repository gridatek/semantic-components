import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * `button` and `a` are valid hosts: a bubble is sometimes tappable, and the
 * `[button,a]:*` focus and transition rules only apply on those elements.
 */
@Directive({
  selector: 'div[scBubbleContent], button[scBubbleContent], a[scBubbleContent]',
  host: {
    'data-slot': 'bubble-content',
    '[class]': 'class()',
  },
})
export class ScBubbleContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'w-fit max-w-full min-w-0 overflow-hidden rounded-xl border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:outline-none [button,a]:transition-colors [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );
}
