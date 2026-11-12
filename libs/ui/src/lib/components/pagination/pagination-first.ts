import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScPagination } from './pagination';

@Directive({
  selector: 'a[scPaginationFirst], button[scPaginationFirst]',
  host: {
    '[class]': 'class()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.type]': 'isAnchor() ? null : type()',
    '(click)': 'onClick($event)',
  },
})
export class ScPaginationFirst {
  private readonly buttonStyles = injectPreset().button;
  // The preset's padding by the arrow (shadcn's, important: it outweighs the
  // button's own padding by an icon).
  private readonly paginationStyles = injectPreset().pagination;

  constructor() {
    ɵwarnIfUnnamed('scPaginationFirst');
  }

  private readonly pagination = inject(ScPagination, { optional: true });
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  /** On a button: `button` by default, so it never submits a form round it. */
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly disabled = computed(() => {
    if (this.disabledInput()) return true;
    if (this.pagination) {
      return this.pagination.previousPage() === null;
    }
    return false;
  });

  protected readonly isAnchor = computed(
    () => this.elementRef.nativeElement.tagName === 'A',
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Balances a text button ("« First"); icon-only buttons stay centred.
      !this.size()?.startsWith('icon') && this.paginationStyles.previous,
      'rtl:[&>svg]:rotate-180',
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    // A link follows its own href (yours: "?page=2", a routerLink), a button
    // does what its type says; disabled, neither.
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    if (this.pagination) {
      this.pagination.goToPage(1);
    }
  }
}
