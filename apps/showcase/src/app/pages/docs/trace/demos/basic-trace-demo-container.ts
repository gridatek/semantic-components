import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTraceDemo } from './basic-trace-demo';

@Component({
  selector: 'app-basic-trace-demo-container',
  imports: [DemoContainer, BasicTraceDemo],
  template: `
    <app-demo-container
      title="Trace Line"
      demoUrl="/demos/trace/basic-trace-demo"
      [code]="code"
    >
      <app-basic-trace-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTraceDemoContainer {
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

@Component({
  selector: 'app-basic-trace-demo',
  imports: [
    ScTrace,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiFileTextIcon,
    SiSearchIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div scTrace>
      <span scTraceLine>
        <span scTraceIcon><svg siSearchIcon></svg></span>
        <span scTraceTitle>Searched for minimumReleaseAge</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siFileTextIcon></svg></span>
        <span scTraceTitle>Read package.json</span>
      </span>
      <span scTraceLine>
        <span scTraceIcon><svg siTerminalIcon></svg></span>
        <span scTraceTitle>Ran node --version</span>
      </span>
    </div>
  \`,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicTraceDemo {}`;
}
