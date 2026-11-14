import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlToggleGroupDemo } from './rtl-toggle-group-demo';

@Component({
  selector: 'app-rtl-toggle-group-demo-container',
  imports: [DemoContainer, RtlToggleGroupDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/toggle-group/rtl-toggle-group-demo"
      [code]="code"
    >
      <app-rtl-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToggleGroupDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** In a right-to-left page: the first item at the right; the arrows mirrored. */
@Component({
  selector: 'app-rtl-toggle-group-demo',
  imports: [Dir, ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div dir="rtl" lang="ar">
      <div scToggleGroup variant="outline" aria-label="العرض" [(value)]="view">
        <button scToggleGroupItem value="list">قائمة</button>
        <button scToggleGroupItem value="grid">شبكة</button>
        <button scToggleGroupItem value="cards">بطاقات</button>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlToggleGroupDemo {
  protected readonly view = signal(['list']);
}`;
}
