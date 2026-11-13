import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCommand,
  ScCommandEmpty,
  ScCommandGroup,
  ScCommandGroupLabel,
  ScCommandInput,
  ScCommandInputGroup,
  ScCommandItem,
  ScCommandList,
  ScCommandSeparator,
  ScCommandShortcut,
  ScCommandStatus,
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
  selector: 'app-rtl-command-demo',
  imports: [
    Dir,
    ScCommand,
    ScCommandEmpty,
    ScCommandGroup,
    ScCommandGroupLabel,
    ScCommandInput,
    ScCommandInputGroup,
    ScCommandItem,
    ScCommandList,
    ScCommandSeparator,
    ScCommandShortcut,
    ScCommandStatus,
    ScFrame,
    SiCalculatorIcon,
    SiCalendarIcon,
    SiCreditCardIcon,
    SiSearchIcon,
    SiSettingsIcon,
    SiSmileIcon,
    SiUserIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm flex-col gap-3">
      <div scCommand #cmd="scCommand" scFrame>
        <div scCommandInputGroup>
          <svg siSearchIcon></svg>
          <input
            scCommandInput
            placeholder="اكتب أمرًا أو ابحث..."
            aria-label="البحث عن الأوامر"
          />
        </div>
        <div scCommandList aria-label="الأوامر">
          <div scCommandEmpty>لم يتم العثور على نتائج.</div>
          <div scCommandGroup>
            <div scCommandGroupLabel>اقتراحات</div>
            <div scCommandItem>
              <svg siCalendarIcon></svg>
              <span>التقويم</span>
            </div>
            <div scCommandItem>
              <svg siSmileIcon></svg>
              <span>البحث عن رمز تعبيري</span>
            </div>
            <div scCommandItem disabled>
              <svg siCalculatorIcon></svg>
              <span>الآلة الحاسبة</span>
            </div>
          </div>
          <div scCommandSeparator></div>
          <div scCommandGroup>
            <div scCommandGroupLabel>الإعدادات</div>
            <div scCommandItem>
              <svg siUserIcon></svg>
              <span>الملف الشخصي</span>
              <span scCommandShortcut>⌘P</span>
            </div>
            <div scCommandItem>
              <svg siCreditCardIcon></svg>
              <span>الفوترة</span>
              <span scCommandShortcut>⌘B</span>
            </div>
            <div scCommandItem>
              <svg siSettingsIcon></svg>
              <span>الإعدادات</span>
              <span scCommandShortcut>⌘S</span>
            </div>
          </div>
        </div>
        <div scCommandStatus>{{ cmd.count() }} نتائج</div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCommandDemo {}
