import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
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

/** In a right-to-left page: the picker at the start, the countries named in the locale’s language — the number left to right, as numbers are. */
@Component({
  selector: 'app-rtl-phone-input-next-demo',
  imports: [
    Dir,
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
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div class="grid w-full max-w-sm gap-3">
        <div scField>
          <label scLabel>رقم الهاتف</label>
          <div
            scPhoneInputNext
            #phone="scPhoneInputNext"
            defaultCountry="EG"
            [(value)]="number"
          >
            <div
              scCombobox
              scPhoneInputNextCountry
              #country="scPhoneInputNextCountry"
            >
              <button scComboboxTrigger variant="ghost">
                <span class="sr-only">البلد</span>
                <span scComboboxValue class="flex items-center gap-2">
                  <img scPhoneInputNextFlag alt="" />
                  <span dir="ltr">+{{ phone.callingCode() }}</span>
                </span>
                <svg siChevronDownIcon></svg>
              </button>
              <ng-template scComboboxPortal>
                <div scComboboxPopup aria-label="البلد" class="min-w-72">
                  <div scInputGroup>
                    <div scInputGroupAddon side="inline-start">
                      <svg siSearchIcon></svg>
                    </div>
                    <input
                      scInput
                      scComboboxInput
                      aria-label="ابحث عن بلد"
                      placeholder="ابحث عن بلد…"
                    />
                  </div>
                  <div scComboboxEmpty>لا توجد بلدان</div>
                  <ng-template scComboboxListTemplate>
                    <div scComboboxList aria-label="البلدان">
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
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPhoneInputNextDemo {
  private readonly number = signal('');
}
