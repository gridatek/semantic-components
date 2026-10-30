import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button';

/**
 * A link that looks like a button: a real `<a>`, its `href` (or
 * `routerLink`) yours, its classes the preset's button. `disabled`: still
 * announced as a link (dimmed), out of the tab order, and nothing follows it
 * — not a click, Enter, a middle-click, nor a `routerLink`.
 */
@Directive({
  selector: 'a[scLink]',
  host: {
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[class]': 'class()',
  },
})
export class ScLink {
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');
  /** Not followed, by any means; announced as a dimmed link. */
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    const element =
      inject<ElementRef<HTMLAnchorElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    // In the capture phase: before the link's other listeners (a
    // routerLink's), which then never hear it.
    const block = (event: Event) => {
      if (!this.disabled()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const stops = ['click', 'auxclick'].map((type) =>
      renderer.listen(element, type, block, { capture: true }),
    );
    inject(DestroyRef).onDestroy(() => stops.forEach((stop) => stop()));
  }
}
