import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizeSpinnerDemo } from './size-spinner-demo';

@Component({
  selector: 'app-size-spinner-demo-container',
  imports: [DemoContainer, SizeSpinnerDemo],
  template: `
    <app-demo-container
      title="Size"
      demoUrl="/demos/spinner/size-spinner-demo"
      [code]="code"
    >
      <app-size-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeSpinnerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** Its size is a size-* class. */
@Component({
  selector: 'app-size-spinner-demo',
  imports: [ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div class="flex items-center gap-6">
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-3"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-4"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-6"
      ></svg>
      <svg
        scSpinner
        siLoaderCircleIcon
        aria-label="Loading"
        class="size-8"
      ></svg>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeSpinnerDemo {}`;
}
