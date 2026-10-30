import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputGroupButtonGroupDemo } from './input-group-button-group-demo';

@Component({
  selector: 'app-input-group-button-group-demo-container',
  imports: [DemoContainer, InputGroupButtonGroupDemo],
  template: `
    <app-demo-container
      title="Input Group"
      demoUrl="/demos/button-group/input-group-button-group-demo"
      [code]="code"
    >
      <app-input-group-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import { SiAudioLinesIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-group-button-group-demo',
  imports: [
    ScButton,
    ScButtonGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScTooltipTrigger,
    SiAudioLinesIcon,
    SiPlusIcon,
  ],
  template: \`
    <div scButtonGroup class="[--radius:9999rem]" aria-label="Message">
      <div scButtonGroup>
        <button scButton variant="outline" size="icon">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add attachment</span>
        </button>
      </div>
      <div scButtonGroup>
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
export class InputGroupButtonGroupDemo {
  protected readonly voice = signal(false);
}`;
}
