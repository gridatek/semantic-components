import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPagination } from './pagination';
import { buttonVariants, ScButtonVariants } from '../button';

@Component({
  selector: 'a[sc-pagination-next], button[sc-pagination-next]',
  host: {
    'data-slot': 'pagination-next',
    '[class]': 'class()',
    '[attr.aria-label]': '"Go to next page"',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.href]': 'isAnchor() && !disabled() ? "#" : null',
    '[attr.role]': 'isAnchor() && disabled() ? "link" : null',
    '(click)': 'onClick($event)',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPaginationNext {
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
      'pr-1.5!',
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    if (this.pagination) {
      const nextPage = this.pagination.currentPage() + 1;
      this.pagination.goToPage(nextPage);
    }
  }
}
