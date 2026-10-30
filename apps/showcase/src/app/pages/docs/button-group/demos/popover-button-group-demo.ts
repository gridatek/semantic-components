import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScField,
  ScFieldDescription,
  ScLabel,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
  ScTextarea,
} from '@semantic-components/ui';
import { SiBotIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-popover-button-group-demo',
  imports: [
    ScButton,
    ScButtonGroup,
    ScField,
    ScFieldDescription,
    ScLabel,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
    ScTextarea,
    SiBotIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scPopoverProvider align="end">
      <div scButtonGroup aria-label="Copilot">
        <button scButton variant="outline">
          <svg siBotIcon></svg>
          Copilot
        </button>
        <button scButton scPopoverTrigger variant="outline" size="icon">
          <svg siChevronDownIcon></svg>
          <span class="sr-only">Open Popover</span>
        </button>
      </div>
      <ng-template scPopoverPortal>
        <div scPopover class="rounded-xl text-sm">
          <div scPopoverHeader>
            <h4 scPopoverTitle>Start a new task with Copilot</h4>
            <p scPopoverDescription>Describe your task in natural language.</p>
          </div>
          <div scField>
            <label scLabel for="popover-button-group-task" class="sr-only">
              Task Description
            </label>
            <textarea
              scTextarea
              id="popover-button-group-task"
              placeholder="I need to..."
              class="resize-none"
            ></textarea>
            <p scFieldDescription>
              Copilot will open a pull request for review.
            </p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PopoverButtonGroupDemo {}
