import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ButtonSpinnerDemo } from './button-spinner-demo';

@Component({
  selector: 'app-button-spinner-demo-container',
  imports: [DemoContainer, ButtonSpinnerDemo],
  template: `
    <app-demo-container
      title="Button"
      demoUrl="/demos/spinner/button-spinner-demo"
      [code]="code"
    >
      <app-button-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonSpinnerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** In a disabled button while it works; data-icon="inline-start" pads the button for it. */
@Component({
  selector: 'app-button-spinner-demo',
  imports: [ScButton, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <button scButton disabled size="sm">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="Loading"
          data-icon="inline-start"
        ></svg>
        Loading...
      </button>
      <button scButton variant="outline" disabled size="sm">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="Please wait"
          data-icon="inline-start"
        ></svg>
        Please wait
      </button>
      <button scButton variant="secondary" disabled size="sm">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="Processing"
          data-icon="inline-start"
        ></svg>
        Processing
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ButtonSpinnerDemo {}`;
}
