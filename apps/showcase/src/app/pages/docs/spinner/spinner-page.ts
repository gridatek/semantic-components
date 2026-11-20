import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BadgeSpinnerDemoContainer } from './demos/badge-spinner-demo-container';
import { ButtonSpinnerDemoContainer } from './demos/button-spinner-demo-container';
import { CustomSpinnerDemoContainer } from './demos/custom-spinner-demo-container';
import { EmptySpinnerDemoContainer } from './demos/empty-spinner-demo-container';
import { InputGroupSpinnerDemoContainer } from './demos/input-group-spinner-demo-container';
import { RtlSpinnerDemoContainer } from './demos/rtl-spinner-demo-container';
import { SizeSpinnerDemoContainer } from './demos/size-spinner-demo-container';
import { SpinnerUsageDemoContainer } from './demos/spinner-usage-demo-container';

@Component({
  selector: 'app-spinner-page',
  imports: [
    PartsTable,
    Anatomy,
    SpinnerUsageDemoContainer,
    SizeSpinnerDemoContainer,
    ButtonSpinnerDemoContainer,
    BadgeSpinnerDemoContainer,
    InputGroupSpinnerDemoContainer,
    EmptySpinnerDemoContainer,
    CustomSpinnerDemoContainer,
    RtlSpinnerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Spinner</h1>
        <p class="text-muted-foreground">
          Something loading: your icon, turning, read as a status.
        </p>
        <app-component-badges path="spinner" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-spinner-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A directive on your icon&apos;s svg; the icon and its name are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A spinner is a status (role=&quot;status&quot;): name it
            (aria-label, &quot;Loading&quot;), as shadcn&apos;s is — it takes
            back what the icon hides (aria-hidden).
          </li>
          <li>
            In a button that says it already (&quot;Loading...&quot;), it is
            still named: a screen reader may hear it twice.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-size-spinner-demo-container />
        <app-button-spinner-demo-container />
        <app-badge-spinner-demo-container />
        <app-input-group-spinner-demo-container />
        <app-empty-spinner-demo-container />
        <app-custom-spinner-demo-container />
        <app-rtl-spinner-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Spinner parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SpinnerPage {
  private readonly anatomy = {
    imports: [
      "import { ScSpinner } from '@semantic-components/ui';",
      "import { SiLoaderCircleIcon } from '@semantic-icons/lucide-icons';",
    ].join('\n'),
    markup: '<svg scSpinner siLoaderCircleIcon aria-label="…"></svg>',
  };

  private readonly parts = [
    {
      name: 'ScSpinner',
      selector: 'svg[scSpinner]',
      description:
        'On your icon: a status, named by your aria-label; size-4, turning (a size-* class for another size).',
    },
  ];
}
