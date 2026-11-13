import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { StepsTaskDemo } from './steps-task-demo';

@Component({
  selector: 'app-steps-task-demo-container',
  imports: [DemoContainer, StepsTaskDemo],
  template: `
    <app-demo-container
      title="Steps"
      demoUrl="/demos/ai-elements/steps-task-demo"
      [code]="code"
    >
      <app-steps-task-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsTaskDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
import { SiFileTextIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

/** A finished task: a search, then a read that links to the file. */
@Component({
  selector: 'app-steps-task-demo',
  imports: [
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
    SiFileTextIcon,
    SiSearchIcon,
  ],
  template: \`
    <div scTrace class="w-full max-w-sm">
      <div scCollapsible scTraceCollapsible [open]="true">
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceTitle>Found the project files</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent>
            <div scTrace>
              <span scTraceLine>
                <span scTraceIcon><svg siSearchIcon></svg></span>
                <span scTraceTitle>Searched for app/page.tsx</span>
              </span>
              <a href="#app/page.tsx">
                <span scTraceLine>
                  <span scTraceIcon><svg siFileTextIcon></svg></span>
                  <span scTraceTitle>Read app/page.tsx</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepsTaskDemo {}`;
}
