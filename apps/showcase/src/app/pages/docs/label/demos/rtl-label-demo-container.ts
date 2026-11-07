import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlLabelDemo } from './rtl-label-demo';

@Component({
  selector: 'app-rtl-label-demo-container',
  imports: [DemoContainer, RtlLabelDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/label/rtl-label-demo"
      [code]="code"
    >
      <app-rtl-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLabelDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScCheckbox, ScCheckboxField, ScLabel } from '@semantic-components/ui';

/** In a right-to-left page: the box at the right, the text after it. */
@Component({
  selector: 'app-rtl-label-demo',
  imports: [ScCheckbox, ScCheckboxField, ScLabel],
  template: \`
    <div dir="rtl" lang="ar">
      <div scCheckboxField>
        <input type="checkbox" scCheckbox />
        <label scLabel>قبول الشروط والأحكام</label>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlLabelDemo {}`;
}
