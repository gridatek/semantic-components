import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSwitchNextDemo } from './rtl-switch-next-demo';

@Component({
  selector: 'app-rtl-switch-next-demo-container',
  imports: [DemoContainer, RtlSwitchNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/switch-next/rtl-switch-next-demo"
      [code]="code"
    >
      <app-rtl-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScFieldDescription,
  ScLabel,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** In a right-to-left page: the switch at the left, its thumb moving left when on. */
@Component({
  selector: 'app-rtl-switch-next-demo',
  imports: [
    FormField,
    ScFieldDescription,
    ScLabel,
    ScSwitchNext,
    ScSwitchNextField,
  ],
  template: \`
    <div dir="rtl" lang="ar" scSwitchNextField class="max-w-sm">
      <label scLabel>المشاركة عبر الأجهزة</label>
      <p scFieldDescription>
        يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.
      </p>
      <input type="checkbox" scSwitchNext [formField]="focusForm.share" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSwitchNextDemo {
  protected readonly focusForm = form(signal({ share: true }));
}`;
}
