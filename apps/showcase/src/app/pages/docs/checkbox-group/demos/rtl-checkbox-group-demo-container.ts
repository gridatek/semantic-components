import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlCheckboxGroupDemo } from './rtl-checkbox-group-demo';

@Component({
  selector: 'app-rtl-checkbox-group-demo-container',
  imports: [DemoContainer, RtlCheckboxGroupDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/checkbox-group/rtl-checkbox-group-demo"
      [code]="code"
    >
      <app-rtl-checkbox-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckboxGroupDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScCheckbox, ScCheckboxGroup, ScField } from '@semantic-components/ui';

/** In a right-to-left page: the checkboxes at the right, the parent first. */
@Component({
  selector: 'app-rtl-checkbox-group-demo',
  imports: [Dir, ScCheckbox, ScCheckboxGroup, ScField],
  template: \`
    <div dir="rtl" lang="ar">
      <div
        scCheckboxGroup
        aria-label="التفاح"
        [allValues]="allApples"
        [(value)]="apples"
      >
        <label scField orientation="horizontal">
          <input scCheckbox parent />
          التفاح
        </label>
        <div class="flex flex-col gap-3 ps-6">
          <label scField orientation="horizontal">
            <input scCheckbox value="fuji-apple" />
            فوجي
          </label>
          <label scField orientation="horizontal">
            <input scCheckbox value="gala-apple" />
            غالا
          </label>
          <label scField orientation="horizontal">
            <input scCheckbox value="granny-smith-apple" />
            غراني سميث
          </label>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCheckboxGroupDemo {
  protected readonly allApples = [
    'fuji-apple',
    'gala-apple',
    'granny-smith-apple',
  ];
  protected readonly apples = signal(['fuji-apple']);
}`;
}
