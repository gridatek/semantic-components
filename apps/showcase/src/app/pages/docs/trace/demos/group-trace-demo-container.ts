import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupTraceDemo } from './group-trace-demo';

@Component({
  selector: 'app-group-trace-demo-container',
  imports: [DemoContainer, GroupTraceDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/trace/group-trace-demo"
      [code]="code"
    >
      <app-group-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupTraceDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScTrace,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiFileTextIcon,
  SiSearchIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** Rows side by side in a scTrace; it also styles the triggers and links around lines. */
@Component({
  selector: 'app-group-trace-demo',
  imports: [
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiSearchIcon,
    SiFileTextIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div scTrace class="max-w-sm">
      <span scTraceLine>
        <span scTraceIcon><svg siSearchIcon></svg></span>
        <span scTraceTitle>Searched for minimumReleaseAge</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siFileTextIcon></svg></span>
        <span scTraceTitle>Read pnpm-workspace.yaml</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siTerminalIcon></svg></span>
        <span scTraceTitle>Ran pnpm install</span>
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupTraceDemo {}`;
}
