import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { Subject } from 'rxjs';

import { ScTimezoneDropdown } from './timezone-dropdown';
import { ScTimezoneInputField } from './timezone-input-field';
import { ScTimezoneSelector } from './timezone-selector';
import { TimezoneService } from './timezone.service';
import { ScTimezone, TimezoneChangeEvent } from './types';

@Component({
  selector: 'sc-timezone-picker',
  imports: [ScTimezoneSelector, ScTimezoneInputField, ScTimezoneDropdown, OverlayModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScTimezonePicker),
      multi: true,
    },
  ],
  template: `
    <div [class]="computedClass()">
      @if (label()) {
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          [for]="id()"
        >
          {{ label() }}
          @if (required()) {
            <span class="text-destructive">*</span>
          }
        </label>
      }

      <div
        class="flex has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 rounded-md ring-offset-background"
        [class.ring-2]="isInputFocused() || showTimezoneDropdown()"
        [class.ring-ring]="isInputFocused() || showTimezoneDropdown()"
        [class.ring-offset-2]="isInputFocused() || showTimezoneDropdown()"
      >
        <div class="relative" #timezoneTrigger="cdkOverlayOrigin" cdkOverlayOrigin>
          <sc-timezone-selector
            [selectedTimezone]="selectedTimezone()"
            [isInvalid]="isInvalid()"
            [disabled]="disabled()"
            (timezoneClick)="toggleTimezoneDropdown()"
            (timezoneFocus)="onTimezoneFocus()"
            (timezoneBlur)="onTimezoneBlur()"
          />
        </div>

        <sc-timezone-input-field
          [value]="searchValue()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [isInvalid]="isInvalid()"
          [id]="id()"
          (inputChange)="onSearchChange($event)"
          (inputBlur)="onInputBlur()"
          (inputFocus)="onInputFocus()"
        />
      </div>

      @if (errorMessage() && (isTouched() || showErrors())) {
        <p class="text-sm text-destructive mt-2">{{ errorMessage() }}</p>
      }

      @if (helperText() && !errorMessage()) {
        <p class="text-sm text-muted-foreground mt-2">{{ helperText() }}</p>
      }

      @if (selectedTimezone() && isValid()) {
        <p class="text-sm text-muted-foreground mt-2">
          Selected timezone: {{ selectedTimezone()?.label }}
        </p>
      }
    </div>

    <sc-timezone-dropdown
      #timezoneDropdown
      [overlayOrigin]="timezoneTrigger"
      [isOpen]="showTimezoneDropdown()"
      [timezones]="filteredTimezones()"
      [searchTerm]="timezoneSearchTerm()"
      [activeIndex]="activeTimezoneIndex()"
      [overlayPositions]="overlayPositions"
      [overlayWidth]="overlayWidth()"
      (searchChange)="onTimezoneSearchChange($event)"
      (keydownEvent)="onKeydown($event)"
      (timezoneSelect)="selectTimezone($event)"
      (backdropClick)="closeTimezoneDropdown()"
    />
  `,
  host: {
    'data-slot': 'control',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimezonePicker implements ControlValueAccessor, OnDestroy {
  readonly class = input<string>('');
  readonly id = input<string>(inject(_IdGenerator).getId('sc-timezone-picker-'));

  protected readonly computedClass = computed(() => cn('space-y-2', this.class()));

  readonly label = input<string>('');
  readonly placeholder = input<string>('Search timezones...');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly locale = input<string>();

  readonly searchValue = signal<string>('');

  readonly timezoneChange = output<TimezoneChangeEvent>();

  protected readonly selectedTimezone = signal<ScTimezone | null>(null);
  protected readonly showTimezoneDropdown = signal<boolean>(false);
  protected readonly timezoneSearchTerm = signal<string>('');
  protected readonly filteredTimezones = signal<ScTimezone[]>([]);

  protected readonly isValid = signal<boolean>(false);
  protected readonly isInvalid = signal<boolean>(false);
  protected readonly isTouched = signal<boolean>(false);
  protected readonly isInputFocused = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');

  protected readonly timezoneTrigger = viewChild.required<CdkOverlayOrigin>('timezoneTrigger');
  protected readonly timezoneDropdown = viewChild<ScTimezoneDropdown>('timezoneDropdown');
  protected readonly activeTimezoneIndex = signal<number>(-1);
  protected readonly overlayWidth = signal<number>(400);

  protected readonly overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

  private readonly tzService = inject(TimezoneService);
  private readonly destroy$ = new Subject<void>();
  private onChange = (_value: string) => {
    // Intentionally empty - implemented by Angular forms
  };
  private onTouched = () => {
    // Intentionally empty - implemented by Angular forms
  };

  private readonly allTimezones = signal<ScTimezone[]>([]);

  constructor() {
    // Initialize timezones
    this.initializeTimezones();

    // Set overlay width based on trigger
    effect(() => {
      const triggerElement = this.timezoneTrigger()?.elementRef?.nativeElement;
      if (triggerElement) {
        this.overlayWidth.set(Math.max(400, triggerElement.offsetWidth));
      }
    });
  }

  private async initializeTimezones() {
    const locale = this.locale() || navigator.language.split('-')[0];
    const timezones = await this.tzService.getTimezones(locale);
    this.allTimezones.set(timezones);
    this.filteredTimezones.set([...timezones]);

    // Set default to browser timezone if available and no value is set
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const defaultTimezone = timezones.find((tz) => tz.id === browserTz);
    if (defaultTimezone && !this.selectedTimezone()) {
      this.selectTimezone(defaultTimezone);
    }
  }

  protected onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchValue.set(target.value);

    // Filter timezones based on search
    this.filterTimezones(target.value);

    // Open dropdown when typing
    if (!this.showTimezoneDropdown()) {
      this.showTimezoneDropdown.set(true);
      this.timezoneDropdown()?.focusSearchInput();
    }
  }

  protected onInputFocus(): void {
    this.isInputFocused.set(true);
    if (!this.searchValue()) {
      this.isInvalid.set(false);
      this.errorMessage.set('');
    }
  }

  protected onInputBlur(): void {
    this.isInputFocused.set(false);
    this.isTouched.set(true);
    this.onTouched();

    // Small delay to allow for dropdown interaction
    setTimeout(() => {
      if (!this.showTimezoneDropdown()) {
        this.validateInput();
      }
    }, 200);
  }

  protected onTimezoneFocus(): void {
    this.isInputFocused.set(true);
  }

  protected onTimezoneBlur(): void {
    // Small delay to allow for dropdown interaction
    setTimeout(() => {
      if (!this.showTimezoneDropdown()) {
        this.isInputFocused.set(false);
      }
    }, 100);
  }

  protected toggleTimezoneDropdown(): void {
    this.showTimezoneDropdown.update((show) => !show);
    if (this.showTimezoneDropdown()) {
      this.timezoneSearchTerm.set('');
      this.filteredTimezones.set([...this.allTimezones()]);
      this.activeTimezoneIndex.set(0);

      // Focus the search input after a short delay
      this.timezoneDropdown()?.focusSearchInput();
    }
  }

  protected closeTimezoneDropdown(): void {
    this.showTimezoneDropdown.set(false);
    this.isInputFocused.set(false);
  }

  protected selectTimezone(timezone: ScTimezone): void {
    this.selectedTimezone.set(timezone);
    this.searchValue.set(timezone.city);
    this.showTimezoneDropdown.set(false);
    this.isValid.set(true);
    this.isInvalid.set(false);
    this.errorMessage.set('');

    this.onChange(timezone.id);
    this.emitTimezoneChange(timezone);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.showTimezoneDropdown()) return;

    const filteredTimezones = this.filteredTimezones();
    const currentIndex = this.activeTimezoneIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < filteredTimezones.length - 1 ? currentIndex + 1 : 0;
      this.activeTimezoneIndex.set(nextIndex);
      this.scrollToActiveTimezone();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredTimezones.length - 1;
      this.activeTimezoneIndex.set(prevIndex);
      this.scrollToActiveTimezone();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const activeTimezone = filteredTimezones[currentIndex];
      if (activeTimezone) {
        this.selectTimezone(activeTimezone);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeTimezoneDropdown();
    }
  }

  protected onTimezoneSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.timezoneSearchTerm.set(target.value);
    this.filterTimezones(target.value);
  }

  protected filterTimezones(query: string): void {
    const term = query.toLowerCase();
    const filtered = this.allTimezones().filter(
      (timezone) =>
        timezone.city.toLowerCase().includes(term) ||
        timezone.id.toLowerCase().includes(term) ||
        timezone.label.toLowerCase().includes(term) ||
        timezone.region.toLowerCase().includes(term),
    );
    this.filteredTimezones.set(filtered);

    // Reset active index to first item when filtering
    if (filtered.length > 0) {
      this.activeTimezoneIndex.set(0);
      setTimeout(() => this.scrollToActiveTimezone(), 0);
    } else {
      this.activeTimezoneIndex.set(-1);
    }
  }

  protected scrollToActiveTimezone(): void {
    this.timezoneDropdown()?.scrollToActiveTimezone();
  }

  private validateInput(): void {
    const searchValue = this.searchValue();

    if (!searchValue || searchValue.trim() === '') {
      this.isValid.set(false);
      this.isInvalid.set(false);
      this.errorMessage.set(this.required() ? 'Timezone is required' : '');
      return;
    }

    // Check if the search value matches a known timezone
    const matchingTimezone = this.allTimezones().find(
      (tz) =>
        tz.city.toLowerCase() === searchValue.toLowerCase() ||
        tz.id.toLowerCase() === searchValue.toLowerCase(),
    );

    if (matchingTimezone) {
      this.isValid.set(true);
      this.isInvalid.set(false);
      this.errorMessage.set('');
      if (this.selectedTimezone()?.id !== matchingTimezone.id) {
        this.selectTimezone(matchingTimezone);
      }
    } else {
      this.isValid.set(false);
      this.isInvalid.set(true);
      this.errorMessage.set('Please select a valid timezone');
    }
  }

  private emitTimezoneChange(timezone: ScTimezone): void {
    const timezoneData: TimezoneChangeEvent = {
      isValid: this.isValid(),
      timezone: timezone.id,
      label: timezone.label,
      offset: timezone.offset,
    };

    this.timezoneChange.emit(timezoneData);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (value) {
      const timezone = this.allTimezones().find((tz) => tz.id === value);
      if (timezone) {
        this.selectedTimezone.set(timezone);
        this.searchValue.set(timezone.city);
        this.isValid.set(true);
      }
    } else {
      this.selectedTimezone.set(null);
      this.searchValue.set('');
      this.isValid.set(false);
    }
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
