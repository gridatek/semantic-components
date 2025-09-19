import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ScCombobox, ScComboboxItem } from '@semantic-components/ui';
import { Subject } from 'rxjs';

import { TimezoneService } from './timezone.service';

@Component({
  selector: 'sc-timezone-picker',
  imports: [ScCombobox, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScTimezonePicker),
      multi: true,
    },
  ],
  template: `
    <sc-combobox
      [placeholder]="placeholder()"
      [items]="timezones()"
      [showStatus]="false"
      (selectionChange)="onSelectionChange($event)"
    />
  `,
  host: {
    'data-slot': 'control',
  },
})
export class ScTimezonePicker implements OnInit, OnDestroy, ControlValueAccessor {
  readonly locale = input<string>();
  readonly placeholder = input<string>('Select timezone');
  readonly id = input<string>();

  protected readonly timezones = signal<ScComboboxItem[]>([]);

  private destroy$ = new Subject<void>();
  private tzService = inject(TimezoneService);
  private onChange: (value: string) => void = () => {
    // Intentionally empty - implemented by Angular forms
  };
  private onTouched: () => void = () => {
    // Intentionally empty - implemented by Angular forms
  };
  private hasInitialValue = false;

  async ngOnInit() {
    const locale = this.locale() || navigator.language.split('-')[0];
    const timezoneData = await this.tzService.getTimezones(locale);

    // Convert to ScComboboxItem format
    const items: ScComboboxItem[] = timezoneData.map((tz) => ({
      label: tz.label,
      value: tz.value,
      subtitle: tz.value, // Show timezone ID as subtitle
    }));

    this.timezones.set(items);

    // Set default to browser timezone if available
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const defaultItem = items.find((item) => item.value === browserTz);
    if (defaultItem && !this.hasInitialValue) {
      this.writeValue(defaultItem.value);
    }
  }

  onSelectionChange(value: string) {
    this.onChange(value);
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    // The combobox will handle displaying the selected value
    if (value) {
      this.hasInitialValue = true;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Handle disabled state if needed
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
