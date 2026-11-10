import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** In a right-to-left page: the first item at the right; the arrows mirrored. */
@Component({
  selector: 'app-rtl-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: `
    <div dir="rtl" lang="ar">
      <div scToggleGroup variant="outline" aria-label="العرض" [(value)]="view">
        <button scToggleGroupItem value="list">قائمة</button>
        <button scToggleGroupItem value="grid">شبكة</button>
        <button scToggleGroupItem value="cards">بطاقات</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToggleGroupDemo {
  protected readonly view = signal(['list']);
}
