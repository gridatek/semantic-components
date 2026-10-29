import {
  DestroyRef,
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScNavigationMenu } from './navigation-menu';
import { ScNavigationMenuItem } from './navigation-menu-item';

/**
 * An item's panel, inside the item after its trigger: shown under it while
 * open. Always in the page (for the Tab order, and crawlers); closed, it is
 * `invisible` — out of the tab order and the accessibility tree. Between
 * items it slides in from the side you came from. Lay out its inside as you
 * like (a grid of `scNavigationMenuLink`s).
 */
@Directive({
  selector: 'div[scNavigationMenuContent]',
  host: {
    'data-slot': 'navigation-menu-content',
    '[id]': 'item.contentId',
    '[attr.data-state]': 'item.open() ? "open" : "closed"',
    '[attr.data-side]': 'item.side()',
    '[class]': 'class()',
    '(mouseenter)': 'menu.cancelClose()',
  },
})
export class ScNavigationMenuContent {
  protected readonly menu = inject(ScNavigationMenu);
  protected readonly item = inject(ScNavigationMenuItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-popover-foreground absolute start-0 top-full z-50 mt-2 w-max p-1',
      // A bridge over the gap: the pointer crossing it stays on the item.
      'before:absolute before:inset-x-0 before:-top-2 before:h-2',
      'transition-[opacity,translate,scale,visibility] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
      // Shown at once when it opens (its links can take the focus right
      // away); hidden only once faded out when it closes.
      'data-[state=open]:transition-[opacity,translate,scale] motion-reduce:data-[state=open]:transition-none',
      'data-[state=closed]:pointer-events-none data-[state=closed]:invisible data-[state=closed]:opacity-0',
      // Resting before or after the open one; on its own, a little smaller.
      'data-[state=closed]:data-[side=start]:-translate-x-12 data-[state=closed]:data-[side=end]:translate-x-12',
      'rtl:data-[state=closed]:data-[side=start]:translate-x-12 rtl:data-[state=closed]:data-[side=end]:-translate-x-12',
      !this.item.side() && 'data-[state=closed]:scale-95',
      // Without the shared box: its own.
      !this.menu.viewport() &&
        'bg-popover rounded-lg shadow ring-1 ring-foreground/10',
      '**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    this.item.setContent(element);
    // ↓ on the trigger: the first link, once this panel is shown.
    afterRenderEffect(() => {
      if (!this.item.open() || this.menu.focusOnOpen() !== this.item.value())
        return;
      this.menu.focusOnOpen.set(null);
      element
        .querySelector<HTMLElement>('a[href], button:not([disabled])')
        ?.focus();
    });
    inject(DestroyRef).onDestroy(() => this.item.setContent(null));
  }
}
