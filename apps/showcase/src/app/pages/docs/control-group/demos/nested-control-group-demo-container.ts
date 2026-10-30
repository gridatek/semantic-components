import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NestedControlGroupDemo } from './nested-control-group-demo';

@Component({
  selector: 'app-nested-control-group-demo-container',
  imports: [DemoContainer, NestedControlGroupDemo],
  template: `
    <app-demo-container
      title="Nested"
      demoUrl="/demos/control-group/nested-control-group-demo"
      [code]="code"
    >
      <app-nested-control-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedControlGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiAudioLinesIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-nested-control-group-demo',
  imports: [
    ScButton,
    ScControlGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScTooltipTrigger,
    SiAudioLinesIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scControlGroup aria-label="Message">
      <div scControlGroup>
        <button scButton variant="outline" size="icon">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add attachment</span>
        </button>
      </div>
      <div scControlGroup>
        <div scInputGroup>
          <input scInput placeholder="Send a message..." aria-label="Message" />
          <div scInputGroupAddon align="inline-end">
            <button
              scButton
              variant="ghost"
              size="icon-xs"
              scTooltipTrigger="Voice Mode"
            >
              <svg siAudioLinesIcon></svg>
              <span class="sr-only">Voice Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedControlGroupDemo {}`;
}
