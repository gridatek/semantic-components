import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';
import { Country, COUNTRIES, getCountryByCode } from './countries';

@Component({
  selector: 'sc-phone-input',
  exportAs: 'scPhoneInput',
  template: `
    <div [class]="containerClass()">
      <!-- Country Selector -->
      <div class="relative">
        <button
          type="button"
          [class]="countryButtonClass()"
          [disabled]="disabled()"
          (click)="toggleDropdown()"
          [attr.aria-expanded]="dropdownOpen()"
          [attr.aria-haspopup]="'listbox'"
          [attr.aria-label]="'Select country: ' + selectedCountry().name"
        >
          <span class="text-base">{{ selectedCountry().flag }}</span>
          <span class="text-sm text-muted-foreground">
            {{ selectedCountry().dialCode }}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4 text-muted-foreground"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        @if (dropdownOpen()) {
          <div [class]="dropdownClass()" role="listbox">
            <!-- Search -->
            <div class="p-2 border-b">
              <input
                #searchInput
                type="text"
                [class]="searchInputClass()"
                placeholder="Search countries..."
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                (keydown)="onSearchKeydown($event)"
              />
            </div>

            <!-- Country List -->
            <div class="max-h-48 overflow-y-auto">
              @for (
                country of filteredCountries();
                track country.code;
                let i = $index
              ) {
                <button
                  type="button"
                  role="option"
                  [class]="countryOptionClass(country)"
                  [attr.aria-selected]="country.code === selectedCountry().code"
                  (click)="selectCountry(country)"
                  (keydown)="onOptionKeydown($event, country)"
                >
                  <span class="text-base">{{ country.flag }}</span>
                  <span class="flex-1 text-left">{{ country.name }}</span>
                  <span class="text-sm text-muted-foreground">
                    {{ country.dialCode }}
                  </span>
                </button>
              } @empty {
                <div
                  class="px-3 py-6 text-center text-sm text-muted-foreground"
                >
                  No countries found
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Phone Input -->
      <input
        #phoneInput
        type="tel"
        [class]="inputClass()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="phoneNumber()"
        (input)="onPhoneInput($event)"
        (focus)="focused.set(true)"
        (blur)="focused.set(false)"
      />
    </div>

    @if (dropdownOpen()) {
      <div class="fixed inset-0 z-40" (click)="closeDropdown()"></div>
    }
  `,
  host: {
    'data-slot': 'phone-input',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPhoneInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Phone number');
  readonly disabled = input<boolean>(false);
  readonly defaultCountry = input<string>('US');
  readonly countries = input<Country[]>(COUNTRIES);

  readonly value = model<string>('');
  readonly countryCode = model<string>('US');

  readonly valueChange = output<string>();
  readonly countryChange = output<Country>();

  protected readonly dropdownOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly focused = signal(false);
  protected readonly phoneNumber = signal('');

  private readonly searchInput =
    viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private readonly phoneInputEl =
    viewChild<ElementRef<HTMLInputElement>>('phoneInput');

  constructor() {
    effect(() => {
      const country = this.defaultCountry();
      if (country && !this.countryCode()) {
        this.countryCode.set(country);
      }
    });

    effect(() => {
      const phone = this.phoneNumber();
      const country = this.selectedCountry();
      if (country) {
        const fullNumber = phone ? `${country.dialCode} ${phone}` : '';
        this.value.set(fullNumber);
        this.valueChange.emit(fullNumber);
      }
    });
  }

  protected readonly selectedCountry = computed(() => {
    return getCountryByCode(this.countryCode()) || this.countries()[0];
  });

  protected readonly filteredCountries = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.countries();

    return this.countries().filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.dialCode.includes(query) ||
        c.code.toLowerCase().includes(query),
    );
  });

  protected readonly containerClass = computed(() =>
    cn('flex', this.classInput()),
  );

  protected readonly countryButtonClass = computed(() =>
    cn(
      'flex items-center gap-1 px-3 h-9 rounded-l-md border border-r-0 border-input bg-transparent',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:z-10',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ),
  );

  protected readonly dropdownClass = computed(() =>
    cn(
      'absolute left-0 top-full mt-1 z-50 w-72 rounded-md border bg-popover shadow-md',
      'animate-in fade-in-0 zoom-in-95',
    ),
  );

  protected readonly searchInputClass = computed(() =>
    cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    ),
  );

  protected countryOptionClass(country: Country): string {
    const isSelected = country.code === this.selectedCountry()?.code;
    return cn(
      'flex w-full items-center gap-2 px-3 py-2 text-sm',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:bg-accent',
      isSelected && 'bg-accent',
    );
  }

  protected readonly inputClass = computed(() =>
    cn(
      'flex h-9 w-full rounded-r-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ),
  );

  toggleDropdown(): void {
    if (this.dropdownOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.dropdownOpen.set(true);
    this.searchQuery.set('');
    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    });
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
    this.searchQuery.set('');
  }

  selectCountry(country: Country): void {
    this.countryCode.set(country.code);
    this.countryChange.emit(country);
    this.closeDropdown();
    this.phoneInputEl()?.nativeElement.focus();
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Only allow digits, spaces, and dashes
    const cleaned = input.value.replace(/[^\d\s\-()]/g, '');
    this.phoneNumber.set(cleaned);
    input.value = cleaned;
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeDropdown();
    } else if (event.key === 'Enter') {
      const filtered = this.filteredCountries();
      if (filtered.length > 0) {
        this.selectCountry(filtered[0]);
      }
    }
  }

  onOptionKeydown(event: KeyboardEvent, country: Country): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectCountry(country);
    } else if (event.key === 'Escape') {
      this.closeDropdown();
    }
  }

  focus(): void {
    this.phoneInputEl()?.nativeElement.focus();
  }

  getFullNumber(): string {
    return this.value();
  }

  getPhoneNumber(): string {
    return this.phoneNumber();
  }

  getCountry(): Country | undefined {
    return this.selectedCountry();
  }
}
