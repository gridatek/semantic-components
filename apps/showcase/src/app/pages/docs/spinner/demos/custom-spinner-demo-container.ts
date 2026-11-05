import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomSpinnerDemo } from './custom-spinner-demo';

@Component({
  selector: 'app-custom-spinner-demo-container',
  imports: [DemoContainer, CustomSpinnerDemo],
  template: `
    <app-demo-container
      title="Custom"
      demoUrl="/demos/spinner/custom-spinner-demo"
      [code]="code"
    >
      <app-custom-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomSpinnerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import {
  SiLoaderCircleIcon,
  SiLoaderIcon,
  SiRefreshCwIcon,
} from '@semantic-icons/lucide-icons';

/** The icon is yours — another one, another colour. */
@Component({
  selector: 'app-custom-spinner-demo',
  imports: [ScSpinner, SiLoaderIcon, SiRefreshCwIcon, SiLoaderCircleIcon],
  template: \`
    <div class="flex items-center gap-4">
      <svg scSpinner siLoaderIcon aria-label="Loading"></svg>
      <svg
        scSpinner
        siRefreshCwIcon
        aria-label="Loading"
        class="text-primary"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="text-muted-foreground"
      ></svg>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CustomSpinnerDemo {}`;
}
