import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiClockIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { ScTimezoneService } from './timezone.service';

/**
 * Timezone badge - displays the current timezone as a compact badge.
 * Useful for showing timezone info in headers or status bars.
 *
 * @example
 * ```html
 * <span scTimezoneBadge></span>
 * <span scTimezoneBadge [showLabel]="true"></span>
 * ```
 */
@Component({
  selector: 'span[scTimezoneBadge]',
  imports: [SiClockIcon],
  host: {
    'data-slot': 'timezone-badge',
    '[class]': 'class()',
  },
  template: `
    @if (showIcon()) {
      <svg siClockIcon class="size-3" aria-hidden="true"></svg>
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
