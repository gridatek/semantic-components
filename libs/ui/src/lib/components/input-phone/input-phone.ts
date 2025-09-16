import { _IdGenerator } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

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
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  template: `
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700 mb-2" *ngIf="label">
        {{ label }}
        <span class="text-red-500" *ngIf="required">*</span>
      </label>

      <div class="relative flex">
        <!-- Country Selector -->
        <div class="relative">
          <button
            class="flex items-center px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            [class.border-red-300]="isInvalid"
            [class.focus:ring-red-500]="isInvalid"
            [class.focus:border-red-500]="isInvalid"
            (click)="toggleCountryDropdown()"
            type="button"
          >
            <span class="text-lg mr-2">{{ selectedCountry.flag }}</span>
            <span class="text-sm text-gray-600">{{ selectedCountry.dialCode }}</span>
            <svg
              class="w-4 h-4 ml-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <!-- Country Dropdown -->
          <div
            class="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
            *ngIf="showCountryDropdown"
          >
            <div class="p-2">
              <input
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                [(ngModel)]="countrySearchTerm"
                (input)="filterCountries()"
                type="text"
                placeholder="Search countries..."
              />
            </div>
            <ul class="py-1">
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                *ngFor="let country of filteredCountries"
                (click)="selectCountry(country)"
              >
                <span class="text-lg mr-3">{{ country.flag }}</span>
                <span class="flex-1 text-sm">{{ country.name }}</span>
                <span class="text-sm text-gray-500">{{ country.dialCode }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Phone Number Input -->
        <input
          class="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          [(ngModel)]="phoneNumber"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [class.border-red-300]="isInvalid"
          [class.focus:ring-red-500]="isInvalid"
          [class.focus:border-red-500]="isInvalid"
          [class.border-green-300]="isValid && phoneNumber"
          [class.focus:ring-green-500]="isValid && phoneNumber"
          [class.focus:border-green-500]="isValid && phoneNumber"
          (input)="onPhoneNumberChange($event)"
          (blur)="onTouched()"
          (focus)="onFocus()"
          type="tel"
        />

        <!-- Validation Icons -->
        <div class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          <svg
            class="w-5 h-5 text-green-500"
            *ngIf="isValid && phoneNumber"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <svg
            class="w-5 h-5 text-red-500"
            *ngIf="isInvalid && phoneNumber"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <div class="mt-1 text-sm text-red-600" *ngIf="errorMessage && (isTouched || showErrors)">
        {{ errorMessage }}
      </div>

      <!-- Helper Text -->
      <div class="mt-1 text-sm text-gray-500" *ngIf="helperText && !errorMessage">
        {{ helperText }}
      </div>

      <!-- Formatted Number Display -->
      <div class="mt-1 text-sm text-gray-600" *ngIf="formattedNumber && isValid">
        International format: {{ formattedNumber }}
      </div>
    </div>

    <!-- Click Outside Detector -->
    <div
      class="fixed inset-0 z-40"
      *ngIf="showCountryDropdown"
      (click)="closeCountryDropdown()"
    ></div>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScInputPhone),
      multi: true,
    },
  ],
})
export class ScInputPhone implements OnInit, ControlValueAccessor {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('', this.classInput()));

  readonly idInput = input<string>(inject(_IdGenerator).getId('sc-input-phone-'), {
    alias: 'id',
  });

  @Input() label: string = '';
  @Input() placeholder: string = 'Enter phone number';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() helperText: string = '';
  @Input() showErrors: boolean = false;
  @Input() defaultCountry: string = 'US';

  @Output() phoneChange = new EventEmitter<{
    isValid: boolean;
    phoneNumber: string;
    formattedNumber: string;
    countryCode: string;
    nationalNumber: string;
  }>();

  phoneNumber: string = '';
  selectedCountry: ScCountry = { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' };
  showCountryDropdown: boolean = false;
  countrySearchTerm: string = '';
  filteredCountries: ScCountry[] = [];

  isValid: boolean = false;
  isInvalid: boolean = false;
  isTouched: boolean = false;
  errorMessage: string = '';
  formattedNumber: string = '';

  private phoneUtil = PhoneNumberUtil.getInstance();
  private onChange = (value: any) => {};
  protected onTouched = () => {};

  countries: ScCountry[] = [
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

  ngOnInit() {
    const defaultCountryData = this.countries.find((c) => c.code === this.defaultCountry);
    if (defaultCountryData) {
      this.selectedCountry = defaultCountryData;
    }
    this.filteredCountries = [...this.countries];
  }

  writeValue(value: any): void {
    if (value) {
      this.phoneNumber = value;
      this.validatePhoneNumber();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onPhoneNumberChange(event: any): void {
    this.phoneNumber = event.target.value;
    this.validatePhoneNumber();
    this.onChange(this.phoneNumber);
    this.emitPhoneChange();
  }

  onFocus(): void {
    // Reset validation states on focus for better UX
    if (!this.phoneNumber) {
      this.isInvalid = false;
      this.errorMessage = '';
    }
  }

  toggleCountryDropdown(): void {
    this.showCountryDropdown = !this.showCountryDropdown;
    if (this.showCountryDropdown) {
      this.countrySearchTerm = '';
      this.filteredCountries = [...this.countries];
    }
  }

  closeCountryDropdown(): void {
    this.showCountryDropdown = false;
  }

  selectCountry(country: ScCountry): void {
    this.selectedCountry = country;
    this.showCountryDropdown = false;
    this.validatePhoneNumber();
    this.emitPhoneChange();
  }

  filterCountries(): void {
    const term = this.countrySearchTerm.toLowerCase();
    this.filteredCountries = this.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.dialCode.includes(term) ||
        country.code.toLowerCase().includes(term),
    );
  }

  private validatePhoneNumber(): void {
    if (!this.phoneNumber || this.phoneNumber.trim() === '') {
      this.isValid = false;
      this.isInvalid = false;
      this.errorMessage = this.required ? 'Phone number is required' : '';
      this.formattedNumber = '';
      return;
    }

    try {
      // Parse the phone number with the selected country
      const phoneNumberObj = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.code);

      // Check if the number is valid
      const isValidNumber = this.phoneUtil.isValidNumber(phoneNumberObj);

      if (isValidNumber) {
        this.isValid = true;
        this.isInvalid = false;
        this.errorMessage = '';
        this.formattedNumber = this.phoneUtil.format(
          phoneNumberObj,
          PhoneNumberFormat.INTERNATIONAL,
        );
      } else {
        this.isValid = false;
        this.isInvalid = true;
        this.errorMessage = 'Please enter a valid phone number';
        this.formattedNumber = '';
      }
    } catch (error) {
      this.isValid = false;
      this.isInvalid = true;
      this.errorMessage = 'Please enter a valid phone number';
      this.formattedNumber = '';
    }
  }

  private emitPhoneChange(): void {
    let phoneData = {
      isValid: this.isValid,
      phoneNumber: this.phoneNumber,
      formattedNumber: this.formattedNumber,
      countryCode: this.selectedCountry.code,
      nationalNumber: '',
    };

    if (this.isValid && this.phoneNumber) {
      try {
        const phoneNumberObj = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.code);
        phoneData.nationalNumber = this.phoneUtil.format(
          phoneNumberObj,
          PhoneNumberFormat.NATIONAL,
        );
      } catch (error) {
        // Handle parsing error
      }
    }

    this.phoneChange.emit(phoneData);
  }
}
