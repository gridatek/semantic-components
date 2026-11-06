import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScDrawerNextProvider } from './drawer-next-provider';

/**
 * The bar a drawer is dragged by, at its free edge. On a `div` it is only
 * for the pointer (hidden from screen readers); on a `button`, named by you,
 * a press moves to the next snap point.
 */
@Directive({
  selector: 'div[scDrawerNextHandle], button[scDrawerNextHandle]',
  host: {
    'data-slot': 'drawer-handle',
    '[attr.aria-hidden]': 'isButton ? null : "true"',
    '[attr.type]': 'isButton ? "button" : null',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScDrawerNextHandle {
  private readonly styles = injectPreset().drawer;
  private readonly drawer = inject(ScDrawerNextProvider);
  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName ===
    'BUTTON';
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative z-10 flex shrink-0 cursor-grab touch-none outline-none after:block after:shrink-0 active:cursor-grabbing',
      'transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0',
      // Along its free edge: under a top bar, above a bottom one, beside a side one.
      'group-data-[swipe-axis=y]/drawer-popup:h-6 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-axis=y]/drawer-popup:items-center',
      'group-data-[swipe-direction=up]/drawer-popup:order-last',
      'group-data-[swipe-axis=x]/drawer-popup:absolute group-data-[swipe-axis=x]/drawer-popup:inset-y-0 group-data-[swipe-axis=x]/drawer-popup:w-6 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=x]/drawer-popup:justify-center',
      'group-data-[swipe-direction=left]/drawer-popup:right-0 group-data-[swipe-direction=right]/drawer-popup:left-0',
      'focus-visible:after:ring-3 focus-visible:after:ring-ring/50',
      this.styles.handle,
      this.classInput(),
    ),
  );

  protected onClick(): void {
    if (this.isButton) this.drawer.nextSnapPoint();
  }
}
