import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import {
  ScCountryCodeSelect,
  getCountryByCode,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-country-selector-phone-input-demo',
  imports: [ScCountryCodeSelect, ScInput, ScInputGroup, ScInputGroupAddon],
  template: `
    <div class="max-w-sm">
      <div scInputGroup>
        <div scInputGroupAddon>
          <div scCountryCodeSelect [(value)]="countryCode"></div>
        </div>
        <input
          scInput
          variant="group"
          type="tel"
          inputmode="tel"
          placeholder="Phone number"
          [value]="phone()"
          (input)="onPhoneInput($event)"
        />
      </div>
      <p class="text-muted-foreground mt-2 text-sm">
        Value: {{ fullNumber() || 'Empty' }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectorPhoneInputDemo {
  readonly countryCode = signal('US');
  readonly phone = signal('');

  protected readonly fullNumber = computed(() => {
    const country = getCountryByCode(this.countryCode());
    const phone = this.phone();
    return country && phone ? `${country.dialCode} ${phone}` : '';
  });

  onPhoneInput(event: Event): void {
    this.phone.set((event.target as HTMLInputElement).value);
  }
}
