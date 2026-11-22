import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OnlyPhoneInputNextDemo } from './only-phone-input-next-demo';

@Component({
  selector: 'app-only-phone-input-next-demo-container',
  imports: [DemoContainer, OnlyPhoneInputNextDemo],
  template: `
    <app-demo-container
      title="Only some countries"
      [code]="code"
      demoUrl="/demos/phone-input-next/only-phone-input-next-demo"
    >
      <app-only-phone-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OnlyPhoneInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCombobox,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxListTemplate,
  ScComboboxPopup,
  ScComboboxPortal,
  ScComboboxTrigger,
  ScComboboxValue,
  ScField,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import {
  ScPhoneInputNext,
  ScPhoneInputNextCountry,
  ScPhoneInputNextFlag,
  ScPhoneInputNextNumber,
} from '@semantic-components/ui/phone-input';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** countries: only these — here, the Nordic countries. */
@Component({
  selector: 'app-only-phone-input-next-demo',
  imports: [
    ScCombobox,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxListTemplate,
    ScComboboxPopup,
    ScComboboxPortal,
    ScComboboxTrigger,
    ScComboboxValue,
    ScField,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPhoneInputNext,
    ScPhoneInputNextCountry,
    ScPhoneInputNextFlag,
    ScPhoneInputNextNumber,
    SiChevronDownIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-3">
      <div scField>
        <label scLabel>Phone number</label>
        <div
          scPhoneInputNext
          #phone="scPhoneInputNext"
          defaultCountry="SE"
          [(value)]="number"
        >
          <div
            scCombobox
            scPhoneInputNextCountry
            #country="scPhoneInputNextCountry"
            [countries]="nordic"
          >
            <button scComboboxTrigger variant="ghost">
              <span class="sr-only">Country</span>
              <span scComboboxValue class="flex items-center gap-2">
                <img scPhoneInputNextFlag alt="" />
                <span dir="ltr">+{{ phone.callingCode() }}</span>
              </span>
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scComboboxPortal>
              <div scComboboxPopup aria-label="Country" class="min-w-72">
                <div scInputGroup>
                  <div scInputGroupAddon side="inline-start">
                    <svg siSearchIcon></svg>
                  </div>
                  <input
                    scInput
                    scComboboxInput
                    aria-label="Search countries"
                    placeholder="Search countries…"
                  />
                </div>
                <div scComboboxEmpty>No countries found</div>
                <ng-template scComboboxListTemplate>
                  <div scComboboxList aria-label="Countries">
                    @for (item of country.results(); track item.code) {
                      <div
                        scComboboxItem
                        [value]="item.code"
                        [label]="item.name"
                      >
                        <img
                          scPhoneInputNextFlag
                          [country]="item.code"
                          alt=""
                        />
                        <span class="flex-1">{{ item.name }}</span>
                        <span class="text-muted-foreground" dir="ltr"
                          >+{{ item.callingCode }}</span
                        >
                      </div>
                    }
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <input scPhoneInputNextNumber />
        </div>
      </div>
      <p class="text-muted-foreground text-sm" data-testid="value">
        Value: {{ number() || '—' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OnlyPhoneInputNextDemo {
  private readonly number = signal('');
  private readonly nordic = ['DK', 'FI', 'IS', 'NO', 'SE'] as const;
}`;
}
