import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'sc-calendar-header',
  host: { class: 'block' },
  imports: [ScButton, SiChevronLeftIcon, SiChevronRightIcon],
  template: `
    <div class="relative flex items-center justify-center pt-1">
      <button
        scButton
        variant="outline"
        size="icon-sm"
        class="absolute left-1"
        (click)="previous.emit()"
        [attr.aria-label]="previousLabel()"
      >
        <svg siChevronLeftIcon class="size-4"></svg>
      </button>
      <button
        scButton
        variant="ghost"
        size="sm"
        (click)="headerClick.emit()"
        [attr.aria-label]="headerLabel()"
        [attr.aria-expanded]="expanded()"
      >
        {{ label() }}
      </button>
      <button
        scButton
        variant="outline"
        size="icon-sm"
        class="absolute right-1"
        (click)="next.emit()"
        [attr.aria-label]="nextLabel()"
      >
        <svg siChevronRightIcon class="size-4"></svg>
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
