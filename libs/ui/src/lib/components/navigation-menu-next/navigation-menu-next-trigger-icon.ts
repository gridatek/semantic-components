import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuNextItem } from './navigation-menu-next-item';

/** Your chevron (down) after the trigger's text: turned over while open; hidden from screen readers. */
@Directive({
  selector: 'svg[scNavigationMenuNextTriggerIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuNextTriggerIcon {
  private readonly item = inject(ScNavigationMenuNextItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative top-px ms-1 size-3 transition duration-300 motion-reduce:transition-none',
      this.item.open() && 'rotate-180',
      this.classInput(),
    ),
  );
}
