import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScPagination } from './pagination';
import { buttonVariants, ScButtonVariants } from '../button';

@Directive({
  selector: 'a[sc-pagination-link], button[sc-pagination-link]',
  host: {
    'data-slot': 'pagination-link',
    '[class]': 'class()',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.href]': 'isAnchor() && !disabled() ? "#" : null',
    '[attr.role]': 'isAnchor() && disabled() ? "link" : null',
    '(click)': 'onClick($event)',
  },
})
export class ScPaginationLink {
  private readonly pagination = inject(ScPagination, { optional: true });
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly page = input<number>();

  readonly variant = computed(() => (this.isActive() ? 'outline' : 'ghost'));

  readonly size = input<ScButtonVariants['size']>('icon');

  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly isAnchor = computed(
    () => this.elementRef.nativeElement.tagName === 'A',
  );

  protected readonly isActive = computed(() => {
    const pageNum = this.page();
    if (pageNum === undefined || !this.pagination) return false;
    return pageNum === this.pagination.currentPage();
  });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  onClick(event: Event): void {
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    const pageNum = this.page();
    if (pageNum !== undefined && this.pagination) {
      this.pagination.goToPage(pageNum);
    }
  }
}
