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

/**
 * Timezone badge - displays the current timezone as a compact badge.
 * Useful for showing timezone info in headers or status bars.
 *
 * @example
 * ```html
 * <span sc-timezone-badge></span>
 * <span sc-timezone-badge [showLabel]="true"></span>
 * ```
 */
@Component({
  selector: 'span[sc-timezone-badge]',
  host: {
    'data-slot': 'timezone-badge',
    '[class]': 'class()',
  },
  template: `
    @if (showIcon()) {
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-3"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    }
    <span>{{ displayText() }}</span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneBadge {
  private readonly timezoneService = inject(ScTimezoneService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showIcon = input<boolean>(true);
  readonly showLabel = input<boolean>(false);
  readonly showOffset = input<boolean>(false);

  protected readonly currentTimezone = this.timezoneService.currentTimezone;

  protected readonly displayText = computed(() => {
    const tz = this.currentTimezone();

    if (this.showLabel()) {
      if (this.showOffset()) {
        return `${tz.label} (${tz.offset})`;
      }
      return tz.label;
    }

    if (this.showOffset()) {
      return `${tz.abbr} ${tz.offset}`;
    }

    return tz.abbr;
  });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
      'transition-colors',
      'border-transparent bg-secondary text-secondary-foreground',
      this.classInput(),
    ),
  );
}
