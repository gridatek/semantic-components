import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenuItem } from './navigation-menu-item';

/** Your chevron (down) after the trigger's text: turned over while open; hidden from screen readers. */
@Directive({
  selector: 'svg[scNavigationMenuTriggerIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScNavigationMenuTriggerIcon {
  private readonly item = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative top-px ms-1 size-3 transition duration-300 motion-reduce:transition-none',
      this.item.open() && 'rotate-180',
      this.classInput(),
    ),
  );
}
