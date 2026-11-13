import { ToolbarWidget } from '@angular/aria/toolbar';
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
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { type ScButtonVariants } from '../button';

/**
 * A link's look: a link in text (default), or a button's — `link` the link
 * button (its box, among buttons), `button` the primary one, or the outline,
 * secondary, ghost and destructive buttons.
 */
export type ScLinkVariant =
  | 'default'
  | 'link'
  | 'button'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'destructive';

/**
 * A link: a real `<a>`, its `href` (or `routerLink`) yours — in the
 * preset's link look, or a button's (`variant`). `disabled`: still
 * announced as a link (dimmed), out of the tab order, and nothing follows it
 * — not a click, Enter, a middle-click, nor a `routerLink`.
 */
/** The preset's button variant for each button look. */
const LINK_TO_BUTTON: Record<
  Exclude<ScLinkVariant, 'default'>,
  ScButtonVariants['variant']
> = {
  link: 'link',
  button: 'default',
  outline: 'outline',
  secondary: 'secondary',
  ghost: 'ghost',
  destructive: 'destructive',
};

@Directive({
  selector: 'a[scLink]',
  host: {
    // A button's look: read by the button group's styles, as a button's.
    '[attr.data-slot]': "variant() === 'default' ? null : 'button'",
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'tabIndex()',
    '[class]': 'class()',
  },
})
export class ScLink {
  private readonly preset = injectPreset();
  // A toolbar's widget: its roving tabindex (one Tab stop for the toolbar),
  // which this binding would otherwise override.
  private readonly widget = inject(ToolbarWidget, {
    self: true,
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  /** A link in text (default), or a button's look. */
  readonly variant = input<ScLinkVariant>('default');
  /** A button look's size; a link in text takes the size of its text. */
  readonly size = input<ScButtonVariants['size']>('default');
  /** Not followed, by any means; announced as a dimmed link. */
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly tabIndex = computed(() =>
    this.widget ? this.widget._pattern.tabIndex() : this.disabled() ? -1 : null,
  );

  protected readonly class = computed(() => {
    const variant = this.variant();
    return cn(
      variant === 'default'
        ? cn(
            // In text: underlined (not told apart by colour alone), its
            // colour and size the text's; an icon at the text's size.
            'font-medium underline underline-offset-4 outline-none transition-colors hover:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:inline [&_svg]:align-[-0.125em] [&_svg:not([class*=size-])]:size-[1em]',
            this.preset.link,
          )
        : this.preset.button({
            variant: LINK_TO_BUTTON[variant],
            size: this.size(),
          }),
      this.classInput(),
    );
  });

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
