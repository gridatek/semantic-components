import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * An option's icon, at its start: hidden from screen readers and typeahead.
 * `mirror`: turned in a right-to-left page (an arrow, a reply).
 */
@Directive({
  selector: '[scListboxItemIcon]',
  host: {
    'data-slot': 'listbox-item-icon',
    'aria-hidden': 'true',
    '[attr.data-mirror]': 'mirror() || null',
    '[class]': 'class()',
  },
})
export class ScListboxItemIcon {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly mirror = input(false, { transform: booleanAttribute });

  private readonly class = computed(() =>
    cn(
      "text-muted-foreground flex shrink-0 items-center [&_svg:not([class*='size-'])]:size-4",
      this.mirror() && 'rtl:-scale-x-100',
      this.classInput(),
    ),
  );
}
