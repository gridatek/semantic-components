import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMultiselectDemo } from './rtl-multiselect-demo';

@Component({
  selector: 'app-rtl-multiselect-demo-container',
  imports: [DemoContainer, RtlMultiselectDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/multiselect/rtl-multiselect-demo"
    >
      <app-rtl-multiselect-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMultiselectDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the chips from the right, the list too. */
@Component({
  selector: 'app-rtl-multiselect-demo',
  imports: [
    Dir,
    ScComboboxMultiple,
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-sm">
      <div
        scCombobox
        multiple
        autoHighlight
        #picker="scCombobox"
        [(value)]="labels"
      >
        <div scComboboxChips>
          @for (item of picker.value(); track item) {
            <span scComboboxChip [value]="item">
              {{ item }}
              <button scComboboxChipRemove>
                <svg siXIcon></svg>
                <span class="sr-only">إزالة {{ item }}</span>
              </button>
            </span>
          }
          <input
            scComboboxInput
            aria-label="التصنيفات"
            placeholder="اختر التصنيفات"
          />
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxEmpty>لا توجد تصنيفات.</div>
            <div scComboboxList aria-label="التصنيفات">
              @for (item of matching(picker.query()); track item) {
                <div scComboboxItem [value]="item">
                  {{ item }}
                  <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMultiselectDemo {
  private readonly labels = signal<string[]>(['خطأ']);

  private readonly options = ['خطأ', 'ميزة', 'توثيق', 'تصميم', 'سؤال'];

  /** The options whose name has what is typed. */
  private matching(query: string): readonly string[] {
    const text = query.trim().toLowerCase();
    return text
      ? this.options.filter((option) => option.toLowerCase().includes(text))
      : this.options;
  }
}`;
}
