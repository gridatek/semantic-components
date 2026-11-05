import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SheetTraceDemo } from './sheet-trace-demo';

@Component({
  selector: 'app-sheet-trace-demo-container',
  imports: [DemoContainer, SheetTraceDemo],
  template: `
    <app-demo-container
      title="Sheet"
      demoUrl="/demos/trace/sheet-trace-demo"
      [code]="code"
    >
      <app-sheet-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SheetTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  SiChevronRightIcon,
  SiFolderSearchIcon,
} from '@semantic-icons/lucide-icons';

/** The same with a sheet; a drawer or a popover works the same way. */
@Component({
  selector: 'app-sheet-trace-demo',
  imports: [
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
    SiFolderSearchIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scTrace class="max-w-sm">
      <div scSheetProvider>
        <button scSheetTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siFolderSearchIcon></svg></span>
            <span scTraceTitle>Explored 4 files</span>
            <span scTraceIcon><svg siChevronRightIcon></svg></span>
          </span>
        </button>
        <ng-template scSheetPortal>
          <div scSheet>
            <div scSheetHeader>
              <h2 scSheetTitle>Explored 4 files</h2>
              <p scSheetDescription>Files read while preparing the response.</p>
            </div>
            <ul class="flex flex-col gap-2 px-6 font-mono text-xs">
              <li>apps/showcase/src/main.ts</li>
              <li>apps/showcase/src/app/app.config.ts</li>
              <li>apps/showcase/project.json</li>
              <li>package.json</li>
            </ul>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SheetTraceDemo {}`;
}
