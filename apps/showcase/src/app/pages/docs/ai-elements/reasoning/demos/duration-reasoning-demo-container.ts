import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { DurationReasoningDemo } from './duration-reasoning-demo';

@Component({
  selector: 'app-duration-reasoning-demo-container',
  imports: [DemoContainer, DurationReasoningDemo],
  template: `
    <app-demo-container
      title="Duration"
      demoUrl="/demos/ai-elements/duration-reasoning-demo"
      [code]="code"
    >
      <app-duration-reasoning-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DurationReasoningDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiCircleCheckIcon } from '@semantic-icons/lucide-icons';

/** How long it thought, after the title: measured on the server, sent with the message. */
@Component({
  selector: 'app-duration-reasoning-demo',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
  ],
  template: \`
    <div scTrace class="max-w-sm">
      <div scCollapsible scTraceCollapsible>
        <button scCollapsibleTrigger scTraceCollapsibleTrigger>
          <span scTraceLine>
            <span scTraceIcon><svg siCircleCheckIcon></svg></span>
            <span scTraceTitle>Thought</span>
            <span scTraceDescription>12s</span>
          </span>
        </button>
        <div scCollapsiblePanel>
          <div scTraceCollapsiblePanelContent class="whitespace-pre-wrap">
            The build log shows install and compile finish in under a minute.
            Image optimization takes almost four, and it reruns on every deploy
            because the cache key includes the commit hash.
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DurationReasoningDemo {}`;
}
