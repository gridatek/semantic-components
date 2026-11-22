import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlListboxDemo } from './rtl-listbox-demo';

@Component({
  selector: 'app-rtl-listbox-demo-container',
  imports: [DemoContainer, RtlListboxDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/listbox/rtl-listbox-demo"
    >
      <app-rtl-listbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlListboxDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScListbox,
  ScListboxItem,
  ScListboxItemIndicator,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the text from the right, the check at the inline end. */
@Component({
  selector: 'app-rtl-listbox-demo',
  imports: [
    Dir,
    ScField,
    ScLabel,
    ScListbox,
    ScListboxItem,
    ScListboxItemIndicator,
    SiCheckIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="w-56">
      <div scField>
        <label scLabel>الإضافة</label>
        <div scListbox [(value)]="topping">
          @for (item of items; track item.value) {
            <div scListboxItem [value]="item.value">
              {{ item.label }}
              <span scListboxItemIndicator><svg siCheckIcon></svg></span>
            </div>
          }
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlListboxDemo {
  private readonly topping = signal<string | null>('basil');
  private readonly items = [
    { value: 'cheese', label: 'جبن' },
    { value: 'basil', label: 'ريحان' },
    { value: 'onion', label: 'بصل' },
    { value: 'olive', label: 'زيتون' },
  ];
}`;
}
