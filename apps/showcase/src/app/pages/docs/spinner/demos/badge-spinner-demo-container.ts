import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BadgeSpinnerDemo } from './badge-spinner-demo';

@Component({
  selector: 'app-badge-spinner-demo-container',
  imports: [DemoContainer, BadgeSpinnerDemo],
  template: `
    <app-demo-container
      title="Badge"
      demoUrl="/demos/spinner/badge-spinner-demo"
      [code]="code"
    >
      <app-badge-spinner-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeSpinnerDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge, ScSpinner } from '@semantic-components/ui';
import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';

/** In a badge, before its text. */
@Component({
  selector: 'app-badge-spinner-demo',
  imports: [ScBadge, ScSpinner, SiLoaderCircleIcon],
  template: \`
    <div class="flex items-center gap-4">
      <span scBadge>
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="Syncing"
          data-icon="inline-start"
        ></svg>
        Syncing
      </span>
      <span scBadge variant="secondary">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="Updating"
          data-icon="inline-start"
        ></svg>
        Updating
      </span>
      <span scBadge variant="outline">
        <svg
          scSpinner
          siLoaderCircleIcon
          aria-label="Processing"
          data-icon="inline-start"
        ></svg>
        Processing
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeSpinnerDemo {}`;
}
