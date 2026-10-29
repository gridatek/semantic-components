import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenu } from './navigation-menu';
import { ScNavigationMenuItem } from './navigation-menu-item';

/** The trigger's look; a top-level link has it too. */
export const navigationMenuTriggerClasses =
  'group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50';

/**
 * Opens its item's panel: on hover, or pressed (click, Enter, Space) — a
 * disclosure, `aria-expanded` and `aria-controls`. Your text, then your
 * chevron (`svg[scNavigationMenuTriggerIcon]`).
 */
@Directive({
  selector: 'button[scNavigationMenuTrigger]',
  host: {
    'data-slot': 'navigation-menu-trigger',
    type: 'button',
    '[attr.aria-expanded]': 'item.open()',
    '[attr.aria-controls]': 'item.contentId',
    '[attr.data-state]': 'item.open() ? "open" : "closed"',
    '[class]': 'class()',
    '(click)': 'menu.toggle(item.value())',
  },
})
export class ScNavigationMenuTrigger {
  protected readonly menu = inject(ScNavigationMenu);
  protected readonly item = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      navigationMenuTriggerClasses,
      'data-[state=open]:bg-muted/50 data-[state=open]:hover:bg-muted data-[state=open]:focus:bg-muted',
      this.classInput(),
    ),
  );

  constructor() {
    this.item.setTrigger(inject(ElementRef).nativeElement);
    inject(DestroyRef).onDestroy(() => this.item.setTrigger(null));
  }
}
