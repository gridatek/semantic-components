import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSheet,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiChevronRightIcon,
  SiFileTextIcon,
} from '@semantic-icons/lucide-icons';

const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/react": "^4.0.0",
    "ai": "^7.0.0",
    "next": "^16.3.0"
  }
}`;

/** Long output in a sheet: the line is the sheet's trigger. */
@Component({
  selector: 'app-sheet-tool-demo',
  imports: [
    ScCodeBlock,
    ScCodeBlockContent,
    ScSheet,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiChevronRightIcon,
    SiFileTextIcon,
  ],
  template: `
    <div scTrace class="w-full max-w-sm">
      <div scSheetProvider>
        <button scSheetTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siFileTextIcon></svg></span>
            <span scTraceTitle>Read package.json</span>
            <span scTraceIcon
              ><svg siChevronRightIcon class="rtl:-scale-x-100"></svg
            ></span>
          </span>
        </button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle class="font-mono">package.json</h2>
              <p scSheetDescription>{{ lines }} lines</p>
            </div>
            <div scCodeBlock class="mx-6 mb-6 w-auto">
              <pre
                scCodeBlockContent
                lineNumbers
                language="json"
                [code]="content"
              ></pre>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SheetToolDemo {
  protected readonly content = PACKAGE_JSON;
  protected readonly lines = PACKAGE_JSON.split('\n').length;
}
