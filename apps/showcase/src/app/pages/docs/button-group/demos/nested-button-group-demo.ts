import { Component, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-nested-button-group-demo',
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
  template: `
    <div scButtonGroup aria-label="Message">
      <div scButtonGroup>
        <button scButton variant="outline" size="icon">
          <svg siPlusIcon></svg>
          <span class="sr-only">Add attachment</span>
        </button>
      </div>
      <div scButtonGroup>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedButtonGroupDemo {}
