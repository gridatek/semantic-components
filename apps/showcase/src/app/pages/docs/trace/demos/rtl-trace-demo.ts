import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsibleBody,
  ScCollapsibleContent,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleContent,
  ScTraceCollapsibleIcon,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiCircleXIcon,
  SiFileTextIcon,
  SiSearchIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-trace-demo',
  imports: [
    ScCollapsible,
    ScCollapsibleBody,
    ScCollapsibleContent,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsibleContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiChevronRightIcon,
    SiCircleXIcon,
    SiFileTextIcon,
    SiSearchIcon,
    SiTerminalIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" scTrace>
      <span scTraceLine>
        <span scTraceIcon><svg siSearchIcon></svg></span>
        <span scTraceTitle>بحث في الشيفرة</span>
        <span scTraceDescription>١٢ نتيجة</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siFileTextIcon></svg></span>
        <span scTraceTitle>قرأ package.json</span>
      </span>
      <div scCollapsible scTraceCollapsible>
        <button
          scCollapsibleTrigger
          scTraceCollapsibleTrigger
          [panel]="version.panel"
        >
          <span scTraceLine>
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>شغّل node --version</span>
          </span>
          <span scTraceCollapsibleIcon><svg siChevronRightIcon></svg></span>
        </button>
        <div scCollapsiblePanel #version="scCollapsiblePanel">
          <ng-template scCollapsibleContent>
            <div scCollapsibleBody>
              <div scTraceCollapsibleContent>v24.18.0</div>
            </div>
          </ng-template>
        </div>
      </div>
      <span scTraceLine status="error">
        <span scTraceIcon><svg siCircleXIcon></svg></span>
        <span scTraceTitle>فشل تشغيل pnpm build</span>
      </span>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTraceDemo {}
