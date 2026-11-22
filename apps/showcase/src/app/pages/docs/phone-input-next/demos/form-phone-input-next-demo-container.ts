import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormPhoneInputNextDemo } from './form-phone-input-next-demo';

@Component({
  selector: 'app-form-phone-input-next-demo-container',
  imports: [DemoContainer, FormPhoneInputNextDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/phone-input-next/form-phone-input-next-demo"
    >
      <app-form-phone-input-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormPhoneInputNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
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
  ScFieldErrors,
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
  phoneNumberNext,
} from '@semantic-components/ui/phone-input';
import { SiChevronDownIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** A [formField]: required, and phoneNumberNext() — strict here: the digits checked, not only the length. */
@Component({
  selector: 'app-form-phone-input-next-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
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
    ScFieldErrors,
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
    <form [formRoot]="contactForm" class="grid w-full max-w-sm gap-3">
      <div scField>
        <label scLabel>Phone number</label>
        <div
          scPhoneInputNext
          #phone="scPhoneInputNext"
          defaultCountry="US"
          [formField]="contactForm.phone"
        >
          <div
            scCombobox
            scPhoneInputNextCountry
            #country="scPhoneInputNextCountry"
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
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Save</button>
      @if (saved()) {
        <p class="text-sm" role="status">{{ saved() }}</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormPhoneInputNextDemo {
  private readonly model = signal({ phone: '' });
  private readonly saved = signal('');
  private readonly contactForm = form(
    this.model,
    (s) => {
      required(s.phone, { message: 'Enter your phone number.' });
      phoneNumberNext(s.phone, {
        strict: true,
        message: 'Enter a valid phone number.',
      });
    },
    {
      submission: {
        action: async () => this.saved.set(\`Saved \${this.model().phone}.\`),
      },
    },
  );
}`;
}
