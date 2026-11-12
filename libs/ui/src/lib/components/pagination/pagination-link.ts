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
import { ScButtonVariants } from '../button/button';
import { ScPagination } from './pagination';

@Directive({
  selector: 'a[scPaginationLink], button[scPaginationLink]',
  host: {
    '[class]': 'class()',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '[attr.type]': 'isAnchor() ? null : type()',
    '(click)': 'onClick($event)',
  },
})
export class ScPaginationLink {
  private readonly buttonStyles = injectPreset().button;

  private readonly pagination = inject(ScPagination, { optional: true });
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  /** On a button: `button` by default, so it never submits a form round it. */
  readonly type = input<'button' | 'submit' | 'reset'>('button');
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
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
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

    const pageNum = this.page();
    if (pageNum !== undefined && this.pagination) {
      this.pagination.goToPage(pageNum);
    }
  }
}
