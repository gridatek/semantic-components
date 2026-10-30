import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputGroupControlGroupDemo } from './input-group-control-group-demo';

@Component({
  selector: 'app-input-group-control-group-demo-container',
  imports: [DemoContainer, InputGroupControlGroupDemo],
  template: `
    <app-demo-container
      title="Input Group"
      demoUrl="/demos/control-group/input-group-control-group-demo"
      [code]="code"
    >
      <app-input-group-control-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupControlGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  selector: 'app-input-group-control-group-demo',
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
    <div scControlGroup class="[--radius:9999rem]" aria-label="Message">
      <div scControlGroup>
        <button scButton variant="outline" size="icon">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add attachment</span>
        </button>
      </div>
      <div scControlGroup>
        <div scInputGroup>
          <input
            scInput
            [placeholder]="
              voice() ? 'Record and send audio...' : 'Send a message...'
            "
            [disabled]="voice()"
            aria-label="Message"
          />
          <div scInputGroupAddon align="inline-end">
            <button
              scButton
              variant="ghost"
              size="icon-xs"
              scTooltipTrigger="Voice Mode"
              [attr.aria-pressed]="voice()"
              class="aria-pressed:bg-orange-100 aria-pressed:text-orange-700 dark:aria-pressed:bg-orange-800 dark:aria-pressed:text-orange-100"
              (click)="voice.set(!voice())"
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
export class InputGroupControlGroupDemo {
  protected readonly voice = signal(false);
}`;
}
