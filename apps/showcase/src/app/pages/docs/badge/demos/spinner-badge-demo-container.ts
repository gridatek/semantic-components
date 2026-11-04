import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SpinnerBadgeDemo } from './spinner-badge-demo';

@Component({
  selector: 'app-spinner-badge-demo-container',
  imports: [DemoContainer, SpinnerBadgeDemo],
  template: `
    <app-demo-container
      title="With Spinner"
      demoUrl="/demos/badge/spinner-badge-demo"
      [code]="code"
    >
      <app-spinner-badge-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerBadgeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** A spinner as the icon: data-icon on it too; it is named, a status. */
@Component({
  selector: 'app-spinner-badge-demo',
  imports: [ScBadge, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      <span scBadge variant="destructive">
        <svg
          scSpinner
          siLoaderCircleIcon
          data-icon="inline-start"
          aria-label="Loading"
        ></svg>
        Deleting
      </span>
      <span scBadge variant="secondary">
        Generating
        <svg
          scSpinner
          siLoaderCircleIcon
          data-icon="inline-end"
          aria-label="Loading"
        ></svg>
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerBadgeDemo {}`;
}
