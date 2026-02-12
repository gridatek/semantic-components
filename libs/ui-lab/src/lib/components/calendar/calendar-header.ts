import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'sc-calendar-header',
  imports: [SiChevronLeftIcon, SiChevronRightIcon],
  template: `
    <div class="relative flex items-center justify-center pt-1">
      <button
        type="button"
        class="absolute left-1 inline-flex size-7 items-center justify-center rounded-md border border-input bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity"
        (click)="previous.emit()"
        [attr.aria-label]="previousLabel()"
      >
        <svg si-chevron-left-icon class="size-4"></svg>
      </button>
      <button
        type="button"
        class="text-sm font-medium hover:text-primary transition-colors px-3 py-1 rounded-md hover:bg-accent"
        (click)="headerClick.emit()"
        [attr.aria-label]="headerLabel()"
        [attr.aria-expanded]="expanded()"
      >
        {{ label() }}
      </button>
      <button
        type="button"
        class="absolute right-1 inline-flex size-7 items-center justify-center rounded-md border border-input bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity"
        (click)="next.emit()"
        [attr.aria-label]="nextLabel()"
      >
        <svg si-chevron-right-icon class="size-4"></svg>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCalendarHeader {
  readonly label = input.required<string>();
  readonly previousLabel = input.required<string>();
  readonly nextLabel = input.required<string>();
  readonly headerLabel = input.required<string>();
  readonly expanded = input<boolean>(false);

  readonly previous = output<void>();
  readonly next = output<void>();
  readonly headerClick = output<void>();
}
