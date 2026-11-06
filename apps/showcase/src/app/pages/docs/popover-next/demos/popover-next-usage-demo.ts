import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScPopoverNext,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-popover-next-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScPopoverNext,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
    ScSelectOnFocus,
  ],
  template: `
    <div scPopoverNextProvider align="start">
      <button scButton scPopoverNextTrigger variant="outline">
        Open Popover
      </button>
      <ng-template scPopoverNextPortal>
        <div scPopoverNext class="w-64">
          <div scPopoverNextHeader>
            <h2 scPopoverNextTitle>Dimensions</h2>
            <p scPopoverNextDescription>Set the dimensions for the layer.</p>
          </div>
          <div scFieldGroup class="gap-4">
            <div scField orientation="horizontal">
              <label scLabel class="w-1/2">Width</label>
              <input scInput value="100%" scSelectOnFocus="program" />
            </div>
            <div scField orientation="horizontal">
              <label scLabel class="w-1/2">Height</label>
              <input scInput value="25px" />
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverNextUsageDemo {}
