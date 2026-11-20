import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ButtonKbdDemoContainer } from './demos/button-kbd-demo-container';
import { GroupKbdDemoContainer } from './demos/group-kbd-demo-container';
import { InputGroupKbdDemoContainer } from './demos/input-group-kbd-demo-container';
import { KbdUsageDemoContainer } from './demos/kbd-usage-demo-container';
import { RtlKbdDemoContainer } from './demos/rtl-kbd-demo-container';

@Component({
  selector: 'app-kbd-page',
  imports: [
    PartsTable,
    Anatomy,
    KbdUsageDemoContainer,
    GroupKbdDemoContainer,
    ButtonKbdDemoContainer,
    InputGroupKbdDemoContainer,
    RtlKbdDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Kbd</h1>
        <p class="text-muted-foreground">
          A key or a shortcut, as it is pressed. In the look of the app&apos;s
          style.
        </p>
        <app-component-badges path="kbd" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-kbd-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your kbd element; the keys are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A key is read as text. A symbol alone can be unclear (⌘ is read as
            &quot;place of interest&quot;, or not at all): write its name too,
            in sr-only text (&quot;Command&quot;).
          </li>
          <li>
            A key beside the control it works shows the shortcut; give the
            control aria-keyshortcuts too, so screen readers say it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-group-kbd-demo-container />
        <app-button-kbd-demo-container />
        <app-input-group-kbd-demo-container />
        <app-rtl-kbd-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Kbd parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class KbdPage {
  private readonly anatomy = {
    imports: "import { ScKbd, ScKbdGroup } from '@semantic-components/ui';",
    markup: [
      '<kbd scKbdGroup>',
      '  <kbd scKbd>…</kbd>',
      '  <kbd scKbd>…</kbd>',
      '</kbd>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScKbd',
      selector: 'kbd[scKbd]',
      description:
        'A key: in a button (data-icon), an input group or a tooltip it takes their colours.',
    },
    {
      name: 'ScKbdGroup',
      selector: 'kbd[scKbdGroup]',
      description: 'Keys pressed together, side by side.',
    },
  ];
}
