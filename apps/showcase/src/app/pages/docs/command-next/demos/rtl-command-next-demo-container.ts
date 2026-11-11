import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlCommandNextDemo } from './rtl-command-next-demo';

@Component({
  selector: 'app-rtl-command-next-demo-container',
  imports: [DemoContainer, RtlCommandNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/command-next/rtl-command-next-demo"
      [code]="code"
    >
      <app-rtl-command-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCommandNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCommandNext,
  ScCommandNextEmpty,
  ScCommandNextGroup,
  ScCommandNextGroupLabel,
  ScCommandNextInput,
  ScCommandNextInputGroup,
  ScCommandNextItem,
  ScCommandNextList,
  ScCommandNextSeparator,
  ScCommandNextShortcut,
  ScCommandNextStatus,
  ScFrame,
} from '@semantic-components/ui';
import {
  SiCalculatorIcon,
  SiCalendarIcon,
  SiCreditCardIcon,
  SiSearchIcon,
  SiSettingsIcon,
  SiSmileIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the search icon at the right, the shortcuts at the left. */
@Component({
  selector: 'app-rtl-command-next-demo',
  imports: [
    ScCommandNext,
    ScCommandNextEmpty,
    ScCommandNextGroup,
    ScCommandNextGroupLabel,
    ScCommandNextInput,
    ScCommandNextInputGroup,
    ScCommandNextItem,
    ScCommandNextList,
    ScCommandNextSeparator,
    ScCommandNextShortcut,
    ScCommandNextStatus,
    ScFrame,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm flex-col gap-3">
      <div scCommandNext #cmd="scCommandNext" scFrame>
        <div scCommandNextInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandNextInput
            placeholder="اكتب أمرًا أو ابحث..."
            aria-label="البحث عن الأوامر"
          />
        </div>
        <div scCommandNextList aria-label="الأوامر">
          <div scCommandNextEmpty>لم يتم العثور على نتائج.</div>
          <div scCommandNextGroup>
            <div scCommandNextGroupLabel>اقتراحات</div>
            <div scCommandNextItem>
              <svg siCalendarIcon></svg>
              <span>التقويم</span>
            </div>
            <div scCommandNextItem>
              <svg siSmileIcon></svg>
              <span>البحث عن رمز تعبيري</span>
            </div>
            <div scCommandNextItem disabled>
              <svg siCalculatorIcon></svg>
              <span>الآلة الحاسبة</span>
            </div>
          </div>
          <div scCommandNextSeparator></div>
          <div scCommandNextGroup>
            <div scCommandNextGroupLabel>الإعدادات</div>
            <div scCommandNextItem>
              <svg siUserIcon></svg>
              <span>الملف الشخصي</span>
              <span scCommandNextShortcut>⌘P</span>
            </div>
            <div scCommandNextItem>
              <svg siCreditCardIcon></svg>
              <span>الفوترة</span>
              <span scCommandNextShortcut>⌘B</span>
            </div>
            <div scCommandNextItem>
              <svg siSettingsIcon></svg>
              <span>الإعدادات</span>
              <span scCommandNextShortcut>⌘S</span>
            </div>
          </div>
        </div>
        <div scCommandNextStatus>{{ cmd.count() }} نتائج</div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCommandNextDemo {}`;
}
