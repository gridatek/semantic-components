import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScPagination } from './pagination';

@Directive({
  selector: 'a[scPaginationPrevious], button[scPaginationPrevious]',
  host: {
    '[class]': 'class()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.type]': 'isAnchor() ? null : type()',
    '(click)': 'onClick($event)',
  },
})
export class ScPaginationPrevious {
  private readonly buttonStyles = injectStyle().button;
  // The style's padding by the arrow (shadcn's, important: it outweighs the
  // button's own padding by an icon).
  private readonly paginationStyles = injectStyle().pagination;

  constructor() {
    ɵwarnIfUnnamed('scPaginationPrevious');
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

  private readonly disabled = computed(() => {
    if (this.disabledInput()) return true;
    if (this.pagination) {
      return this.pagination.previousPage() === null;
    }
    return false;
  });

  private readonly isAnchor = computed(
    () => this.elementRef.nativeElement.tagName === 'A',
  );

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Balances a text button ("‹ Previous"); icon-only buttons stay centred.
      !this.size()?.startsWith('icon') && this.paginationStyles.previous,
      'rtl:[&>svg]:rotate-180',
      this.classInput(),
    ),
  );

  private onClick(event: Event): void {
    // A link follows its own href (yours: "?page=2", a routerLink), a button
    // does what its type says; disabled, neither.
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    if (this.pagination) {
      const previousPage = this.pagination.currentPage() - 1;
      this.pagination.goToPage(previousPage);
    }
  }
}
