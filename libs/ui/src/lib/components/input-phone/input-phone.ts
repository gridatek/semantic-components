import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkOverlayOrigin, ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

interface ScCountry {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

@Component({
  selector: 'sc-input-phone',
  imports: [FormsModule, CommonModule, OverlayModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ScInputPhone,
      multi: true,
    },
  ],
  template: `
    <div [class]="class()">
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
        [class.ring-2]="isInputFocused() || showCountryDropdown()"
        [class.ring-ring]="isInputFocused() || showCountryDropdown()"
        [class.ring-offset-2]="isInputFocused() || showCountryDropdown()"
      >
        <!-- Country Selector -->
        <div class="relative">
          <button
            class="inline-flex items-center whitespace-nowrap rounded-l-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-r-0 h-10"
            #countryTrigger="cdkOverlayOrigin"
            [class.border-destructive]="isInvalid()"
            (click)="toggleCountryDropdown()"
            (focus)="onCountryFocus()"
            (blur)="onCountryBlur()"
            cdkOverlayOrigin
            type="button"
          >
            <div
              class="w-6 h-4 rounded-sm overflow-hidden bg-gray-200 flex items-center justify-center mr-2"
            >
              <img
                class="w-full h-full object-cover"
                [src]="'https://flagcdn.com/w20/' + selectedCountry().code.toLowerCase() + '.png'"
                [alt]="selectedCountry().name + ' flag'"
                loading="lazy"
              />
            </div>
            <span class="text-muted-foreground">{{ selectedCountry().dialCode }}</span>
            <svg
              class="ml-2 h-4 w-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </button>
        </div>

        <!-- Phone Number Input -->
        <input
          class="flex h-10 w-full rounded-r-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-l-0"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [class.border-destructive]="isInvalid()"
          [id]="id()"
          (input)="onPhoneNumberChange($event)"
          (blur)="onInputBlur()"
          (focus)="onInputFocus()"
          type="tel"
        />
      </div>

      @if (errorMessage() && (isTouched() || showErrors())) {
        <p class="text-sm text-destructive mt-2">{{ errorMessage() }}</p>
      }

      @if (helperText() && !errorMessage()) {
        <p class="text-sm text-muted-foreground mt-2">{{ helperText() }}</p>
      }

      @if (formattedNumber() && isValid()) {
        <p class="text-sm text-muted-foreground mt-2">
          International format: {{ formattedNumber() }}
        </p>
      }
    </div>

    <!-- Country Dropdown Overlay -->
    <ng-template
      [cdkConnectedOverlayOrigin]="countryTrigger"
      [cdkConnectedOverlayOpen]="showCountryDropdown()"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      (backdropClick)="closeCountryDropdown()"
      cdkConnectedOverlay
      cdkConnectedOverlayPanelClass="z-50"
    >
      <div class="w-80 rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
        <div class="p-2">
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            #searchInput
            [value]="countrySearchTerm()"
            [attr.aria-expanded]="showCountryDropdown()"
            [attr.aria-activedescendant]="'country-option-' + activeCountryIndex()"
            (input)="onCountrySearchChange($event)"
            (keydown)="onKeydown($event)"
            type="text"
            placeholder="Search countries..."
            role="combobox"
            aria-label="Search countries"
          />
        </div>
        <div
          class="max-h-60 overflow-y-auto"
          [attr.aria-label]="'Country selection'"
          role="listbox"
        >
          @for (country of filteredCountries(); track country.code; let i = $index) {
            <div
              class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
              [class.bg-accent]="i === activeCountryIndex()"
              [class.text-accent-foreground]="i === activeCountryIndex()"
              [attr.aria-selected]="i === activeCountryIndex()"
              [id]="'country-option-' + i"
              (click)="selectCountry(country)"
              role="option"
            >
              <div
                class="w-6 h-4 rounded-sm overflow-hidden bg-gray-200 flex items-center justify-center mr-3"
              >
                <img
                  class="w-full h-full object-cover"
                  [src]="'https://flagcdn.com/w20/' + country.code.toLowerCase() + '.png'"
                  [alt]="country.name + ' flag'"
                  loading="lazy"
                />
              </div>
              <span class="flex-1">{{ country.name }}</span>
              <span class="text-muted-foreground">{{ country.dialCode }}</span>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPhone implements ControlValueAccessor {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('space-y-2', this.classInput()));

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-input-phone-'), {
    alias: 'id',
  });
  readonly id = computed(() => this.idInput());

  readonly label = input<string>('');
  readonly placeholder = input<string>('Enter phone number');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly showErrors = input<boolean>(false);
  readonly defaultCountry = input<string>('US');

  readonly value = model<string>('');

  readonly phoneChange = output<{
    isValid: boolean;
    phoneNumber: string;
    formattedNumber: string;
    countryFlag: string;
    nationalNumber: string;
  }>();

  protected readonly selectedCountry = signal<ScCountry>({
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
  });
  protected readonly showCountryDropdown = signal<boolean>(false);
  protected readonly countrySearchTerm = signal<string>('');
  protected readonly filteredCountries = signal<ScCountry[]>([]);

  protected readonly isValid = signal<boolean>(false);
  protected readonly isInvalid = signal<boolean>(false);
  protected readonly isTouched = signal<boolean>(false);
  protected readonly isInputFocused = signal<boolean>(false);
  protected readonly errorMessage = signal<string>('');
  protected readonly formattedNumber = signal<string>('');

  protected readonly countryTrigger = viewChild.required<CdkOverlayOrigin>('countryTrigger');
  protected readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  protected readonly activeCountryIndex = signal<number>(-1);

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

  private readonly phoneUtil = PhoneNumberUtil.getInstance();

  private onChange = (value: string) => {};
  private onTouched = () => {};

  private readonly countries: ScCountry[] = [
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
    { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
    { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
    { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
    { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  ];

  constructor() {
    // Initialize filtered countries and default country
    this.filteredCountries.set([...this.countries]);

    effect(() => {
      const defaultCountryData = this.countries.find((c) => c.code === this.defaultCountry());
      if (defaultCountryData) {
        this.selectedCountry.set(defaultCountryData);
      }
    });

    // Validate phone number when value changes
    effect(() => {
      this.validatePhoneNumber();
    });
  }

  protected onPhoneNumberChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
    this.validatePhoneNumber();
    this.emitPhoneChange();
  }

  protected onInputFocus(): void {
    this.isInputFocused.set(true);
    if (!this.value()) {
      this.isInvalid.set(false);
      this.errorMessage.set('');
    }
  }

  protected onInputBlur(): void {
    this.isInputFocused.set(false);
    this.isTouched.set(true);
    this.onTouched();
  }

  protected onCountryFocus(): void {
    this.isInputFocused.set(true);
  }

  protected onCountryBlur(): void {
    // Small delay to allow for dropdown interaction
    setTimeout(() => {
      if (!this.showCountryDropdown()) {
        this.isInputFocused.set(false);
      }
    }, 100);
  }

  protected toggleCountryDropdown(): void {
    this.showCountryDropdown.update((show) => !show);
    if (this.showCountryDropdown()) {
      this.countrySearchTerm.set('');
      this.filteredCountries.set([...this.countries]);
      this.activeCountryIndex.set(0);

      // Focus the search input after a short delay to ensure the overlay is rendered
      setTimeout(() => {
        this.searchInput()?.nativeElement.focus();
      }, 50);
    }
  }

  protected closeCountryDropdown(): void {
    this.showCountryDropdown.set(false);
    this.isInputFocused.set(false);
  }

  protected selectCountry(country: ScCountry): void {
    this.selectedCountry.set(country);
    this.showCountryDropdown.set(false);
    this.validatePhoneNumber();
    this.emitPhoneChange();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.showCountryDropdown()) return;

    const filteredCountries = this.filteredCountries();
    const currentIndex = this.activeCountryIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < filteredCountries.length - 1 ? currentIndex + 1 : 0;
      this.activeCountryIndex.set(nextIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredCountries.length - 1;
      this.activeCountryIndex.set(prevIndex);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const activeCountry = filteredCountries[currentIndex];
      if (activeCountry) {
        this.selectCountry(activeCountry);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closeCountryDropdown();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.activeCountryIndex.set(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.activeCountryIndex.set(filteredCountries.length - 1);
    }
  }

  protected onCountrySearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.countrySearchTerm.set(target.value);
    this.filterCountries();
  }

  protected filterCountries(): void {
    const term = this.countrySearchTerm().toLowerCase();
    const filtered = this.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.dialCode.includes(term) ||
        country.code.toLowerCase().includes(term),
    );
    this.filteredCountries.set(filtered);

    // Reset active index to first item when filtering
    if (filtered.length > 0) {
      this.activeCountryIndex.set(0);
    } else {
      this.activeCountryIndex.set(-1);
    }
  }

  private validatePhoneNumber(): void {
    const phoneNumber = this.value();

    if (!phoneNumber || phoneNumber.trim() === '') {
      this.isValid.set(false);
      this.isInvalid.set(false);
      this.errorMessage.set(this.required() ? 'Phone number is required' : '');
      this.formattedNumber.set('');
      return;
    }

    try {
      const phoneNumberObj = this.phoneUtil.parse(phoneNumber, this.selectedCountry().code);
      const isValidNumber = this.phoneUtil.isValidNumber(phoneNumberObj);

      if (isValidNumber) {
        this.isValid.set(true);
        this.isInvalid.set(false);
        this.errorMessage.set('');
        this.formattedNumber.set(
          this.phoneUtil.format(phoneNumberObj, PhoneNumberFormat.INTERNATIONAL),
        );
      } else {
        this.isValid.set(false);
        this.isInvalid.set(true);
        this.errorMessage.set('Please enter a valid phone number');
        this.formattedNumber.set('');
      }
    } catch {
      this.isValid.set(false);
      this.isInvalid.set(true);
      this.errorMessage.set('Please enter a valid phone number');
      this.formattedNumber.set('');
    }
  }

  private emitPhoneChange(): void {
    const phoneNumber = this.value();
    const phoneData = {
      isValid: this.isValid(),
      phoneNumber,
      formattedNumber: this.formattedNumber(),
      countryFlag: this.selectedCountry().flag,
      nationalNumber: '',
    };

    if (this.isValid() && phoneNumber) {
      try {
        const phoneNumberObj = this.phoneUtil.parse(phoneNumber, this.selectedCountry().code);
        phoneData.nationalNumber = this.phoneUtil.format(
          phoneNumberObj,
          PhoneNumberFormat.NATIONAL,
        );
      } catch {
        // Handle parsing error
      }
    }

    this.phoneChange.emit(phoneData);
  }

  writeValue(value: string): void {
    this.value.set(value || '');
    this.validatePhoneNumber();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // The disabled state is handled through the disabled input signal
    // Angular will manage this automatically
  }
}
