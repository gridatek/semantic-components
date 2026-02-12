import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScTimezoneService } from './timezone.service';
import {
  TimezoneVariant,
  TimezoneSize,
  variantStyles,
  sizeStyles,
} from './timezone-display';

/**
 * Timezone button with label - shows timezone name with dropdown indicator.
 * Useful for integration with dropdown menus or custom popover selectors.
 *
 * @example
 * ```html
 * <button sc-timezone-button></button>
 * <button sc-timezone-button variant="outline"></button>
 * ```
 */
@Component({
  selector: 'button[sc-timezone-button]',
  host: {
    'data-slot': 'timezone-button',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
    <span class="font-medium">{{ displayLabel() }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneButton {
  private readonly timezoneService = inject(ScTimezoneService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<TimezoneVariant>('ghost');
  readonly size = input<TimezoneSize>('default');
  readonly showOffset = input<boolean>(false);

  protected readonly currentTimezone = this.timezoneService.currentTimezone;

  protected readonly displayLabel = computed(() => {
    const tz = this.currentTimezone();
    if (this.showOffset()) {
      return `${tz.label} (${tz.offset})`;
    }
    return tz.label;
  });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium',
      'ring-offset-background transition-colors cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      variantStyles[this.variant()],
      sizeStyles[this.size()],
      this.classInput(),
    ),
  );

  protected readonly ariaLabel = computed(() => {
    const tz = this.currentTimezone();
    return `Current timezone: ${tz.label} (${tz.offset}). Click to change timezone.`;
  });
}
