import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTextareaDemo } from './rtl-textarea-demo';

@Component({
  selector: 'app-rtl-textarea-demo-container',
  imports: [DemoContainer, RtlTextareaDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/textarea/rtl-textarea-demo"
      [code]="code"
    >
      <app-rtl-textarea-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTextareaDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';

/** In a right-to-left page: its text from the right. */
@Component({
  selector: 'app-rtl-textarea-demo',
  imports: [Dir, ScField, ScFieldDescription, ScLabel, ScTextarea],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scField class="w-full max-w-xs">
        <label scLabel>التعليقات</label>
        <textarea
          scTextarea
          placeholder="تعليقاتك تساعدنا على التحسين..."
          rows="4"
        ></textarea>
        <p scFieldDescription>شاركنا أفكارك حول خدمتنا.</p>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTextareaDemo {}`;
}
