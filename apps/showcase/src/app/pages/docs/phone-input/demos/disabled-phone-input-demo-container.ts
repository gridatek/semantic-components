import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledPhoneInputDemo } from './disabled-phone-input-demo';

@Component({
  selector: 'app-disabled-phone-input-demo-container',
  imports: [DemoContainer, DisabledPhoneInputDemo],
  template: `
    <app-demo-container
      title="Disabled and read-only"
      [code]="code"
      demoUrl="/demos/phone-input/disabled-phone-input-demo"
    >
      <app-disabled-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPhoneInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  ScPhoneInput,
  ScPhoneInputCountry,
  ScPhoneInputFlag,
  ScPhoneInputNumber,
} from '@semantic-components/ui/phone-input';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** disabled: not focused, not changed; readonly: read, focusable, not changed. */
@Component({
  selector: 'app-disabled-phone-input-demo',
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
    ScPhoneInput,
    ScPhoneInputCountry,
    ScPhoneInputFlag,
    ScPhoneInputNumber,
    SiChevronDownIcon,
    SiSearchIcon,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-6">
      <div scField>
        <label scLabel>Disabled</label>
        <div scPhoneInput #phone="scPhoneInput" disabled value="+14155550123">
          <div scCombobox scPhoneInputCountry #country="scPhoneInputCountry">
            <button scComboboxTrigger variant="ghost">
              <span class="sr-only">Country</span>
              <span scComboboxValue class="flex items-center gap-2">
                <img scPhoneInputFlag alt="" />
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
                        <img scPhoneInputFlag [country]="item.code" alt="" />
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
          <input scPhoneInputNumber />
        </div>
      </div>
      <div scField>
        <label scLabel>Read-only</label>
        <div
          scPhoneInput
          #readOnlyPhone="scPhoneInput"
          readonly
          value="+442079460958"
        >
          <div
            scCombobox
            scPhoneInputCountry
            #readOnlyCountry="scPhoneInputCountry"
          >
            <button scComboboxTrigger variant="ghost">
              <span class="sr-only">Country</span>
              <span scComboboxValue class="flex items-center gap-2">
                <img scPhoneInputFlag alt="" />
                <span dir="ltr">+{{ readOnlyPhone.callingCode() }}</span>
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
                    @for (item of readOnlyCountry.results(); track item.code) {
                      <div
                        scComboboxItem
                        [value]="item.code"
                        [label]="item.name"
                      >
                        <img scPhoneInputFlag [country]="item.code" alt="" />
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
          <input scPhoneInputNumber />
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledPhoneInputDemo {}`;
}
