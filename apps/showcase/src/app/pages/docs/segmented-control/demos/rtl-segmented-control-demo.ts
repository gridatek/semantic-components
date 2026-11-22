import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';

/** In a right-to-left page: the items from the right; ← moves on, the indicator follows. */
@Component({
  selector: 'app-rtl-segmented-control-demo',
  imports: [
    Dir,
    ScField,
    ScLabel,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar">
      <div scField class="items-center">
        <label scLabel>العرض</label>
        <div scSegmentedControl [(value)]="view">
          <div scSegmentedControlIndicator></div>
          @for (item of views; track item.value) {
            <button scSegmentedControlItem [value]="item.value">
              {{ item.label }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSegmentedControlDemo {
  private readonly view = signal<string | null>('list');
  private readonly views = [
    { value: 'list', label: 'قائمة' },
    { value: 'grid', label: 'شبكة' },
    { value: 'board', label: 'لوحة' },
  ];
}
