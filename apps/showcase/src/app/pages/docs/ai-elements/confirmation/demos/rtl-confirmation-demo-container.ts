import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlConfirmationDemo } from './rtl-confirmation-demo';

@Component({
  selector: 'app-rtl-confirmation-demo-container',
  imports: [DemoContainer, RtlConfirmationDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-confirmation-demo"
      [code]="code"
    >
      <app-rtl-confirmation-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlConfirmationDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';
import { SiTerminalIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the icon on the right, the answers on the left. */
@Component({
  selector: 'app-rtl-confirmation-demo',
  imports: [
    Dir,
    ScButton,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    SiTerminalIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-sm">
      <div scItem variant="outline" size="sm">
        <div scItemMedia variant="icon"><svg siTerminalIcon></svg></div>
        <div scItemBody>
          <div scItemTitle>تشغيل rm -rf dist؟</div>
          <p scItemDescription>يعمل الأمر في هذا المشروع.</p>
        </div>
        <div scItemActions>
          <button scButton size="sm" variant="outline">رفض</button>
          <button scButton size="sm">موافقة</button>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlConfirmationDemo {}`;
}
