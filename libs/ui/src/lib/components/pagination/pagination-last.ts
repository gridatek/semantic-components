import {
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn, ɵwarnIfUnnamed } from '../../utils';
import { ScButtonVariants } from '../button/button';
import { ScPagination } from './pagination';

@Directive({
  selector: 'a[scPaginationLast], button[scPaginationLast]',
  host: {
    '[class]': 'class()',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.href]': 'isAnchor() ? "#" : null',
    '(click)': 'onClick($event)',
  },
})
export class ScPaginationLast {
  private readonly buttonStyles = injectPreset().button;

  constructor() {
    ɵwarnIfUnnamed('scPaginationLast');
  }

  private readonly pagination = inject(ScPagination, { optional: true });
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });

  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly disabled = computed(() => {
    if (this.disabledInput()) return true;
    if (this.pagination) {
      return this.pagination.currentPage() === this.pagination.totalPages();
    }
    return false;
  });

  protected readonly isAnchor = computed(
    () => this.elementRef.nativeElement.tagName === 'A',
  );

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Balances a text button ("Last »"); icon-only buttons stay centred.
      !this.size()?.startsWith('icon') && 'pe-1.5',
      'rtl:[&>svg]:rotate-180',
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    if (this.pagination) {
      const lastPage = this.pagination.totalPages();
      this.pagination.goToPage(lastPage);
    }
  }
}
