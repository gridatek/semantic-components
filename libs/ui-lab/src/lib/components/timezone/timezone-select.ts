import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimezoneService } from './timezone.service';

/**
 * Timezone select dropdown - shows all available timezones.
 * Allows users to select their preferred timezone.
 *
 * @example
 * ```html
 * <sc-timezone-select></sc-timezone-select>
 * <sc-timezone-select [showOffset]="true"></sc-timezone-select>
 * ```
 */
@Component({
  selector: 'sc-timezone-select',
  host: {
    'data-slot': 'timezone-select',
    '[class]': 'class()',
  },
  template: `
    <label for="timezone-select" class="sr-only">Select timezone</label>
    <select
      id="timezone-select"
      [value]="currentTimezoneId()"
      (change)="onTimezoneChange($event)"
      class="border-input bg-background ring-offset-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      @for (tz of timezones(); track tz.id) {
        <option [value]="tz.id">
          {{ formatOptionLabel(tz) }}
        </option>
      }
    </select>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezoneSelect {
  private readonly timezoneService = inject(ScTimezoneService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showOffset = input<boolean>(true);
  readonly showAbbr = input<boolean>(true);

  protected readonly currentTimezoneId = computed(() =>
    this.timezoneService.timezone(),
  );
  protected readonly timezones = this.timezoneService.timezones;

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected formatOptionLabel(tz: {
    id: string;
    label: string;
    offset: string;
    abbr: string;
  }): string {
    const parts: string[] = [];

    if (this.showOffset()) {
      parts.push(`(GMT${tz.offset})`);
    }

    parts.push(tz.label);

    if (this.showAbbr()) {
      parts.push(`- ${tz.abbr}`);
    }

    return parts.join(' ');
  }

  protected onTimezoneChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.timezoneService.setTimezone(target.value);
  }
}
