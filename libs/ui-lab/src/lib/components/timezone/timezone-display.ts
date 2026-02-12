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

export type TimezoneVariant = 'default' | 'outline' | 'ghost';
export type TimezoneSize = 'default' | 'sm' | 'lg' | 'icon';

export const variantStyles: Record<TimezoneVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

export const sizeStyles: Record<TimezoneSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'size-10',
};

/**
 * Timezone display button - shows current timezone with a clock icon.
 * Useful for displaying the current timezone selection.
 *
 * @example
 * ```html
 * <button sc-timezone-display></button>
 * <button sc-timezone-display variant="outline" size="sm"></button>
 * ```
 */
@Component({
  selector: 'button[sc-timezone-display]',
  host: {
    'data-slot': 'timezone-display',
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
      class="size-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
    @if (!iconOnly()) {
      <span class="text-sm font-medium">{{ displayText() }}</span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneDisplay {
  private readonly timezoneService = inject(ScTimezoneService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<TimezoneVariant>('ghost');
  readonly size = input<TimezoneSize>('default');
  readonly iconOnly = input<boolean>(false);
  readonly showOffset = input<boolean>(false);

  protected readonly currentTimezone = this.timezoneService.currentTimezone;

  protected readonly displayText = computed(() => {
    const tz = this.currentTimezone();
    if (this.showOffset()) {
      return `${tz.abbr} (${tz.offset})`;
    }
    return tz.abbr;
  });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium',
      'ring-offset-background transition-colors',
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
    return `Current timezone: ${tz.label} (${tz.offset})`;
  });
}
