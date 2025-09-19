import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';

import { ScTimezone } from './types';

@Component({
  selector: 'sc-timezone-selector',
  imports: [],
  template: `
    <button
      class="inline-flex items-center whitespace-nowrap rounded-l-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-r-0 h-10 min-w-[120px]"
      [class.border-destructive]="isInvalid()"
      [disabled]="disabled()"
      (click)="timezoneClick.emit()"
      (focus)="timezoneFocus.emit()"
      (blur)="timezoneBlur.emit()"
      type="button"
    >
      <div class="flex items-center space-x-2 overflow-hidden">
        <div class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
          <svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        </div>
        <span class="text-muted-foreground text-xs truncate">
          {{ selectedTimezone()?.offset || 'UTC' }}
        </span>
      </div>
      <svg
        class="ml-2 h-4 w-4 opacity-50 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6" />
      </svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneSelector {
  readonly selectedTimezone = input.required<ScTimezone | null>();
  readonly isInvalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly timezoneClick = output<void>();
  readonly timezoneFocus = output<void>();
  readonly timezoneBlur = output<void>();
}
