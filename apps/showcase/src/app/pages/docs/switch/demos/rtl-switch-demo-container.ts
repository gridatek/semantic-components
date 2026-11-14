import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSwitchDemo } from './rtl-switch-demo';

@Component({
  selector: 'app-rtl-switch-demo-container',
  imports: [DemoContainer, RtlSwitchDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/switch/rtl-switch-demo"
      [code]="code"
    >
      <app-rtl-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSwitchDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScSwitch,
} from '@semantic-components/ui';

/** In a right-to-left page: the switch at the left, its thumb moving left when on. */
@Component({
  selector: 'app-rtl-switch-demo',
  imports: [Dir, FormField, ScFieldDescription, ScLabel, ScSwitch, ScField],
  template: \`
    <div dir="rtl" lang="ar" scField orientation="horizontal" class="max-w-sm">
      <label scLabel>المشاركة عبر الأجهزة</label>
      <p scFieldDescription>
        يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.
      </p>
      <input scSwitch [formField]="focusForm.share" />
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSwitchDemo {
  protected readonly focusForm = form(signal({ share: true }));
}`;
}
