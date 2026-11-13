import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
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
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTooltipPortal,
    ScTooltip,
    ScTooltipArrow,
    SiAudioLinesIcon,
    SiPlusIcon,
  ],
  template: `
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
          <div scInputGroupAddon side="inline-end">
            <div scTooltipProvider>
              <button scButton variant="ghost" size="icon-xs" scTooltipTrigger>
                <svg siAudioLinesIcon></svg>
                <span class="sr-only">Voice Mode</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Voice Mode<span scTooltipArrow></span></div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NestedControlGroupDemo {}
