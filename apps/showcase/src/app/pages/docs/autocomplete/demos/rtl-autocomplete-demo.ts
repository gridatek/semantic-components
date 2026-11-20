import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAutocomplete,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxPopup,
  ScComboboxPortal,
  ScInput,
  scComboboxMatches,
} from '@semantic-components/ui';

/** In a right-to-left page: the suggestions under the input, from the right. */
@Component({
  selector: 'app-rtl-autocomplete-demo',
  imports: [
    Dir,
    ScAutocomplete,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    ScInput,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <div scAutocomplete #ac="scAutocomplete" [(value)]="city" class="w-64">
        <input
          scInput
          scComboboxInput
          aria-label="المدينة"
          placeholder="اكتب اسم مدينة"
        />
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxEmpty>لا توجد مدينة.</div>
            <div scComboboxList aria-label="المدن">
              @for (name of matching(ac.query()); track name) {
                <div scComboboxItem [value]="name">{{ name }}</div>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAutocompleteDemo {
  private readonly city = signal('');
  private readonly cities = [
    'الجزائر',
    'الدار البيضاء',
    'الرباط',
    'القاهرة',
    'تونس',
    'عمّان',
    'مراكش',
  ];

  private matching(query: string): string[] {
    return this.cities.filter((name) => scComboboxMatches(name, query));
  }
}
