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
import { ScNavigationMenuNext } from './navigation-menu-next';
import { ScNavigationMenuNextItem } from './navigation-menu-next-item';

/**
 * An item's panel, inside the item after its trigger: shown under it while
 * open, lined up by the menu's `align`. Always in the page (the Tab order,
 * and crawlers); closed, it is `invisible` — out of the tab order and the
 * accessibility tree. Between items it slides in from the side you came
 * from. Lay out its inside as you like (a grid of
 * `scNavigationMenuNextLink`s).
 */
@Directive({
  selector: 'div[scNavigationMenuNextContent]',
  host: {
    '[id]': 'item.contentId',
    '[attr.data-state]': 'item.open() ? "open" : "closed"',
    '[attr.data-side]': 'item.side()',
    '[class]': 'class()',
    '(mouseenter)': 'menu.cancelClose()',
  },
})
export class ScNavigationMenuNextContent {
  protected readonly menu = inject(ScNavigationMenuNext);
  protected readonly item = inject(ScNavigationMenuNextItem);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => {
    const align = this.menu.align();
    return cn(
      'text-popover-foreground absolute top-full z-50 mt-2 w-max',
      this.menu.styles.content,
      // Lined up under its trigger. Centred by `transform`, apart from the
      // slide's `translate`.
      align === 'start' && 'start-0',
      align === 'end' && 'end-0',
      align === 'center' &&
        'start-1/2 [transform:translateX(-50%)] rtl:[transform:translateX(50%)]',
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
      !this.menu.viewport() && this.menu.styles.popup,
      // Its links show focus by their background (shadcn's).
      '**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
      this.classInput(),
    );
  });

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
