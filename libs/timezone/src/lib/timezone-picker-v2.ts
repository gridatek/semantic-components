import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '@angular/forms';

import { ScCombobox2, ScCombobox2Item } from '@semantic-components/ui';

import { TimezoneService } from './timezone.service';
import { ScTimezone, TimezoneChangeEvent } from './types';

@Component({
  selector: 'sc-timezone-picker-v2',
  imports: [ScCombobox2],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScTimezonePickerV2),
      multi: true,
    },
  ],
  template: `
    <sc-combobox2
      [label]="label()"
      [placeholder]="placeholder()"
      [required]="required()"
      [disabled]="disabled()"
      [helperText]="helperText()"
      [showErrors]="showErrors()"
      [items]="timezoneItems()"
      [config]="{ searchPlaceholder: 'Search timezones...', showSearch: true }"
      (selectionChange)="onSelectionChange($event)"
    >
      <!-- Custom trigger template showing timezone offset -->
      <ng-template #triggerTemplate let-item>
        @if (item) {
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
              <svg
                class="w-3 h-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <span class="text-xs font-mono">{{ item.subtitle }}</span>
          </div>
        }
      </ng-template>

      <!-- Custom item template showing full timezone info -->
      <ng-template #itemTemplate let-item>
        <div class="flex items-center space-x-3 w-full">
          <div
            class="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
          >
            <svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
          </div>
          <div class="flex-1 overflow-hidden">
            <div class="font-medium">{{ item.label }}</div>
            <div class="text-xs text-muted-foreground">{{ item.id }}</div>
          </div>
          <div class="text-xs text-muted-foreground font-mono flex-shrink-0">
            {{ item.subtitle }}
          </div>
        </div>
      </ng-template>
    </sc-combobox2>
  `,
  host: {
    'data-slot': 'control',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezonePickerV2 implements OnInit, ControlValueAccessor {
  readonly label = input<string>('');
  readonly placeholder = input<string>('Select timezone...');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly locale = input<string>();

  readonly timezoneChange = output<TimezoneChangeEvent>();

  protected readonly timezoneItems = signal<ScCombobox2Item[]>([]);

  private readonly tzService = inject(TimezoneService);
  private allTimezones: ScTimezone[] = [];
  private onChange = (_value: string) => {
    // Intentionally empty - implemented by Angular forms
  };
  private onTouched = () => {
    // Intentionally empty - implemented by Angular forms
  };

  async ngOnInit() {
    const locale = this.locale() || navigator.language.split('-')[0];
    this.allTimezones = await this.tzService.getTimezones(locale);

    // Convert to ScCombobox2Item format
    const items: ScCombobox2Item[] = this.allTimezones.map((tz) => ({
      id: tz.id,
      label: tz.city,
      subtitle: tz.offset,
      data: tz,
    }));

    this.timezoneItems.set(items);
  }

  onSelectionChange(item: ScCombobox2Item | null): void {
    if (item) {
      const timezone = item.data as ScTimezone;
      this.onChange(item.id);

      const timezoneData: TimezoneChangeEvent = {
        isValid: true,
        timezone: timezone.id,
        label: timezone.label,
        offset: timezone.offset,
      };

      this.timezoneChange.emit(timezoneData);
    } else {
      this.onChange('');
    }
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    // The ScCombobox2 will handle this
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // The disabled state is handled through the disabled input signal
  }
}
