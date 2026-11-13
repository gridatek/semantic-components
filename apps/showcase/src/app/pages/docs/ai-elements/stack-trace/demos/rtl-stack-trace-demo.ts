import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiFileCodeIcon, SiTerminalIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the Arabic title, the frames — code, left to right — inside. */
@Component({
  selector: 'app-rtl-stack-trace-demo',
  imports: [
    Dir,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiFileCodeIcon,
    SiTerminalIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine status="error">
            <span scTraceIcon><svg siTerminalIcon></svg></span>
            <span scTraceTitle>فشل: TypeError</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent class="flex flex-col gap-2">
            <p dir="ltr" lang="en" class="text-destructive font-mono text-xs">
              TypeError: Cannot read properties of undefined (reading 'email')
            </p>
            <div scTrace>
              <a href="#prisma/seed.ts:27">
                <span scTraceLine>
                  <span scTraceIcon><svg siFileCodeIcon></svg></span>
                  <span scTraceTitle>seedUsers في prisma/seed.ts:27</span>
                </span>
              </a>
              <a href="#prisma/seed.ts:51">
                <span scTraceLine>
                  <span scTraceIcon><svg siFileCodeIcon></svg></span>
                  <span scTraceTitle>main في prisma/seed.ts:51</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlStackTraceDemo {}
