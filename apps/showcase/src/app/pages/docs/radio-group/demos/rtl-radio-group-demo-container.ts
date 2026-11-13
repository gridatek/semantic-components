import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlRadioGroupDemo } from './rtl-radio-group-demo';

@Component({
  selector: 'app-rtl-radio-group-demo-container',
  imports: [DemoContainer, RtlRadioGroupDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/radio-group/rtl-radio-group-demo"
      [code]="code"
    >
      <app-rtl-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRadioGroupDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

/** In a right-to-left page: the radio at the right, the arrows mirrored. */
@Component({
  selector: 'app-rtl-radio-group-demo',
  imports: [
    Dir,
    FormField,
    ScFieldDescription,
    ScLabel,
    ScRadio,
    ScRadioField,
    ScRadioGroup,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div
        scRadioGroup
        [formField]="spacingForm.spacing"
        aria-label="التباعد"
        class="w-fit"
      >
        <div scRadioField>
          <input scRadio value="default" />
          <label scLabel>افتراضي</label>
          <p scFieldDescription>تباعد قياسي لمعظم حالات الاستخدام.</p>
        </div>
        <div scRadioField>
          <input scRadio value="comfortable" />
          <label scLabel>مريح</label>
          <p scFieldDescription>مساحة أكبر بين العناصر.</p>
        </div>
        <div scRadioField>
          <input scRadio value="compact" />
          <label scLabel>مضغوط</label>
          <p scFieldDescription>تباعد أدنى للتخطيطات الكثيفة.</p>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlRadioGroupDemo {
  protected readonly spacingForm = form(signal({ spacing: 'comfortable' }));
}`;
}
