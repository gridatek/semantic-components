import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScSpinner,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiArrowUpIcon,
  SiLoaderCircleIcon,
} from '@semantic-icons/lucide-icons';

/**
 * In an input group while it works: at the end of a disabled field, or with a
 * word beside it (the field stays enabled: a disabled group is dimmed, its
 * words too faint).
 */
@Component({
  selector: 'app-input-group-spinner-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScSpinner,
    ScTextarea,
    SiLoaderCircleIcon,
    SiArrowUpIcon,
  ],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <div scInputGroup>
        <input
          scInput
          placeholder="Send a message..."
          aria-label="Message"
          disabled
        />
        <div scInputGroupAddon side="inline-end">
          <svg scSpinner siLoaderCircleIcon aria-label="Sending"></svg>
        </div>
      </div>
      <div scInputGroup>
        <textarea
          scTextarea
          placeholder="Send a message..."
          aria-label="Message"
        ></textarea>
        <div scInputGroupAddon side="bottom">
          <svg scSpinner siLoaderCircleIcon aria-label="Validating"></svg>
          Validating...
          <button scInputGroupButton variant="default" class="ms-auto">
            <svg siArrowUpIcon></svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupSpinnerDemo {}
