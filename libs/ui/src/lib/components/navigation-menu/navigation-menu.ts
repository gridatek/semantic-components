import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  numberAttribute,
  signal,
} from '@angular/core';
import { cn } from '../../utils';

/** An item of the menu, as the menu knows it. */
export interface ScNavigationMenuItemRef {
  readonly value: () => string;
  readonly element: HTMLElement;
  /** Its trigger, if it has a panel. */
  readonly trigger: () => HTMLElement | null;
  /** Its panel, if it has one. */
  readonly content: () => HTMLElement | null;
}

/** The shared panel's place and size, in px from the menu's top left. */
interface ScNavigationMenuBox {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Site navigation with panels (WAI-ARIA disclosure navigation, not a `menu`):
 * a trigger opens its item's panel on hover, click, Enter or Space. One
 * panel at a time, `[(value)]`; with `viewport` (default) they share one box
 * that moves and resizes from item to item. Tab follows the page (a trigger,
 * then its links); ←/→ move between the top-level items, Home/End, ↓ goes
 * into the open panel, Escape closes it. A click outside, or the focus
 * leaving, closes it too. Name it (`aria-label`).
 */
@Component({
  selector: 'nav[scNavigationMenu]',
  exportAs: 'scNavigationMenu',
  template: `
    @if (viewport()) {
      <div
        aria-hidden="true"
        data-slot="navigation-menu-viewport"
        [attr.data-state]="value() === null ? 'closed' : 'open'"
        [class]="viewportClass"
        [style.left.px]="box()?.left"
        [style.top.px]="box()?.top"
        [style.width.px]="box()?.width"
        [style.height.px]="box()?.height"
      ></div>
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'navigation-menu',
    '[attr.data-viewport]': 'viewport()',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
    '(focusout)': 'onFocusout($event)',
    '(document:pointerdown)': 'onOutsidePointer($event)',
    '(mouseleave)': 'hoverClose()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScNavigationMenu {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The open item's `value`; `null`: none. */
  readonly value = model<string | null>(null);
  /** ms the pointer rests on a trigger before its panel opens (at once when another is open). */
  readonly delay = input(50, { transform: numberAttribute });
  /** ms after the pointer leaves before the panel closes. */
  readonly closeDelay = input(50, { transform: numberAttribute });
  /** One shared box for the panels, moving from item to item; `false`: each under its trigger. */
  readonly viewport = input(true, { transform: booleanAttribute });

  private readonly itemsSignal = signal<readonly ScNavigationMenuItemRef[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  /** Where the open item is: the others' panels rest before or after it. */
  readonly openIndex = computed(() =>
    this.items().findIndex((item) => item.value() === this.value()),
  );

  /** An item whose panel focuses its first link once shown (↓ on its trigger). */
  readonly focusOnOpen = signal<string | null>(null);

  protected readonly box = signal<ScNavigationMenuBox | null>(null);
  /** Opened by the pointer resting: a click then keeps it open. */
  private openedByHover = false;
  private timer: ReturnType<typeof setTimeout> | undefined;

  protected readonly class = computed(() =>
    cn(
      'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center',
      this.classInput(),
    ),
  );

  protected readonly viewportClass = cn(
    'bg-popover pointer-events-none absolute z-40 rounded-lg shadow ring-1 ring-foreground/10',
    'transition-[left,top,width,height,opacity,scale,visibility] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
    'data-[state=closed]:invisible data-[state=closed]:scale-90 data-[state=closed]:opacity-0 data-[state=closed]:duration-150',
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));

    // The shared box follows the open panel: its item's place, its size.
    afterRenderEffect({
      read: () => {
        const open = this.items().find((item) => item.value() === this.value());
        const content = open?.content();
        if (!open || !content || !this.viewport()) return;
        const li = open.element;
        const width = content.offsetWidth;
        const rtl = getComputedStyle(this.element).direction === 'rtl';
        const next: ScNavigationMenuBox = {
          left: rtl ? li.offsetLeft + li.offsetWidth - width : li.offsetLeft,
          top: li.offsetTop + content.offsetTop,
          width,
          height: content.offsetHeight,
        };
        const box = this.box();
        if (
          !box ||
          box.left !== next.left ||
          box.top !== next.top ||
          box.width !== next.width ||
          box.height !== next.height
        )
          this.box.set(next);
      },
    });
  }

  register(item: ScNavigationMenuItemRef): () => void {
    this.itemsSignal.update((items) => [...items, item]);
    return () =>
      this.itemsSignal.update((items) => items.filter((i) => i !== item));
  }

  /** A trigger pressed (click, Enter, Space): open, or close when open by a press. */
  toggle(value: string): void {
    clearTimeout(this.timer);
    if (this.value() === value && !this.openedByHover) this.value.set(null);
    else this.value.set(value);
    this.openedByHover = false;
  }

  /** The pointer on an item: its panel, after `delay` — at once if one is open. */
  hoverOpen(value: string | null): void {
    clearTimeout(this.timer);
    if (value === this.value()) return;
    if (value === null) {
      this.hoverClose();
      return;
    }
    const open = () => {
      this.openedByHover = true;
      this.value.set(value);
    };
    if (this.value() !== null) open();
    else this.timer = setTimeout(open, this.delay());
  }

  hoverClose(): void {
    clearTimeout(this.timer);
    if (this.value() === null) return;
    this.timer = setTimeout(() => this.close(), this.closeDelay());
  }

  /** Keeps the panel open: the pointer came back. */
  cancelClose(): void {
    clearTimeout(this.timer);
  }

  close(focusTrigger = false): void {
    clearTimeout(this.timer);
    const open = this.items().find((item) => item.value() === this.value());
    this.value.set(null);
    this.openedByHover = false;
    if (focusTrigger) open?.trigger()?.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement;
    const item = this.items().find((i) => i.element.contains(target));
    const content = item?.content();
    const inContent = !!content?.contains(target);
    const rtl = getComputedStyle(this.element).direction === 'rtl';
    const next = rtl ? 'ArrowLeft' : 'ArrowRight';
    const previous = rtl ? 'ArrowRight' : 'ArrowLeft';

    if (event.key === 'Escape') {
      if (this.value() === null) return;
      this.close(true);
      event.preventDefault();
      return;
    }

    if (inContent && content) {
      // In a panel: ↓/↑ between its links.
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      const links = [...content.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const index = links.indexOf(target);
      links[index + (event.key === 'ArrowDown' ? 1 : -1)]?.focus();
      event.preventDefault();
      return;
    }

    // On a top-level trigger or link.
    const tops = this.items()
      .map((i) =>
        i.element.querySelector<HTMLElement>(':scope > a, :scope > button'),
      )
      .filter((el): el is HTMLElement => !!el);
    const index = tops.indexOf(target);
    if (index === -1) return;
    switch (event.key) {
      case next:
        tops[index + 1]?.focus();
        break;
      case previous:
        tops[index - 1]?.focus();
        break;
      case 'Home':
        tops[0]?.focus();
        break;
      case 'End':
        tops[tops.length - 1]?.focus();
        break;
      case 'ArrowDown': {
        if (!item || !content) return;
        if (this.value() !== item.value()) this.toggle(item.value());
        // Its panel takes the focus once shown (see scNavigationMenuContent).
        this.focusOnOpen.set(item.value());
        break;
      }
      default:
        return;
    }
    event.preventDefault();
  }

  /** The focus left the menu, or went to another item: the panel closes. */
  protected onFocusout(event: FocusEvent): void {
    const to = event.relatedTarget as Node | null;
    if (this.value() === null) return;
    const open = this.items().find((item) => item.value() === this.value());
    if (!to || !open?.element.contains(to)) this.close();
  }

  protected onOutsidePointer(event: Event): void {
    if (this.value() !== null && !this.element.contains(event.target as Node))
      this.close();
  }
}
