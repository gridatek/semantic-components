import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
  ScSelectOnFocus,
} from '@semantic-components/ui';

@Component({
  selector: 'app-popover-usage-demo',
  imports: [
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    ScSelectOnFocus,
  ],
  template: `
    <div scPopoverProvider align="start">
      <button scButton scPopoverTrigger variant="outline">Open Popover</button>
      <ng-template scPopoverPortal>
        <div scPopover class="w-64">
          <div scPopoverHeader>
            <h2 scPopoverTitle>Dimensions</h2>
            <p scPopoverDescription>Set the dimensions for the layer.</p>
          </div>
          <div scFieldGroup class="gap-4">
            <div scField orientation="horizontal">
              <label scLabel class="w-1/2">Width</label>
              <input
                scInput
                value="100%"
                cdkFocusInitial
                scSelectOnFocus="program"
              />
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
export class PopoverUsageDemo {}
