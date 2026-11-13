import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InputGroupSpinnerDemo } from './input-group-spinner-demo';

@Component({
  selector: 'app-input-group-spinner-demo-container',
  imports: [DemoContainer, InputGroupSpinnerDemo],
  template: `
    <app-demo-container
      title="Input group"
      demoUrl="/demos/spinner/input-group-spinner-demo"
      [code]="code"
    >
      <app-input-group-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupSpinnerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
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
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupSpinnerDemo {}`;
}
