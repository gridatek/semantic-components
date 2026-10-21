import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScDock } from './dock';

/**
 * An item: your `a` (`routerLink`, `href`) or `button`, with your icon and
 * its `scDockLabel` — its name. It grows near the pointer, and when
 * focused from the keyboard.
 */
@Directive({
  selector: 'a[scDockItem], button[scDockItem]',
  host: {
    'data-slot': 'dock-item',
    '[style.width]': 'size()',
    '[style.height]': 'size()',
    '[class]': 'class()',
    '(focusin)': 'onFocus()',
    '(focusout)': 'onBlur()',
  },
})
export class ScDockItem {
  protected readonly dock = inject(ScDock);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** Its centre along the dock, at rest. */
  private readonly center = signal<number | null>(null);

  protected readonly size = computed(
    () => `calc(var(--dock-item) * ${this.dock.ɵscale(this.center())})`,
  );

  protected readonly class = computed(() =>
    cn(
      'group/dock-item bg-muted/60 hover:bg-muted relative grid shrink-0 place-items-center rounded-xl outline-none',
      'transition-[width,height,background-color] duration-150 ease-out motion-reduce:transition-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50',
      '[&_svg:not([class*=size-])]:size-1/2',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scDockItem');
    const unregister = this.dock.ɵregister(this);
    inject(DestroyRef).onDestroy(unregister);
  }

  /** Where it rests: measured by the dock before anything grows. */
  ɵmeasure(): void {
    const rect = this.element.getBoundingClientRect();
    this.center.set(
      this.dock.ɵalong(rect.left + rect.width / 2, rect.top + rect.height / 2),
    );
  }

  protected onBlur(): void {
    this.dock.ɵfocusAt.set(null);
  }

  protected onFocus(): void {
    // From the keyboard only: a click is the pointer's.
    if (!this.element.matches(':focus-visible')) return;
    // Measured once at rest: moving on from a grown item, the places hold.
    if (this.center() === null) this.dock.ɵmeasure();
    this.dock.ɵfocusAt.set(this.center());
  }
}
