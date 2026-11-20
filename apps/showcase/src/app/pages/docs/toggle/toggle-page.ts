import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledToggleDemoContainer } from './demos/disabled-toggle-demo-container';
import { OutlineToggleDemoContainer } from './demos/outline-toggle-demo-container';
import { RtlToggleDemoContainer } from './demos/rtl-toggle-demo-container';
import { SizesToggleDemoContainer } from './demos/sizes-toggle-demo-container';
import { ToggleUsageDemoContainer } from './demos/toggle-usage-demo-container';
import { ToolbarToggleDemoContainer } from './demos/toolbar-toggle-demo-container';
import { WithTextToggleDemoContainer } from './demos/with-text-toggle-demo-container';

@Component({
  selector: 'app-toggle-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    ToggleUsageDemoContainer,
    OutlineToggleDemoContainer,
    WithTextToggleDemoContainer,
    SizesToggleDemoContainer,
    DisabledToggleDemoContainer,
    ToolbarToggleDemoContainer,
    RtlToggleDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Toggle</h1>
        <p class="text-muted-foreground">
          A button that stays pressed, in the look of the app&apos;s style.
        </p>
        <app-component-badges path="toggle" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-toggle-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A button of yours: its icon and text are yours; [(pressed)] keeps its
          state, aria-pressed says it.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A native button with aria-pressed: announced as a toggle button,
            pressed or not; <kbd scKbd>Tab</kbd> reaches it,
            <kbd scKbd>Space</kbd> and <kbd scKbd>Enter</kbd> press it.
          </li>
          <li>
            Its name stays the same as it toggles: its text, or an icon with
            sr-only text.
          </li>
          <li>Disabled: out of the <kbd scKbd>Tab</kbd> order, dimmed.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-outline-toggle-demo-container />
        <app-with-text-toggle-demo-container />
        <app-sizes-toggle-demo-container />
        <app-disabled-toggle-demo-container />
        <app-toolbar-toggle-demo-container />
        <app-rtl-toggle-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Toggle parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TogglePage {
  private readonly anatomy = {
    imports: "import { ScToggle } from '@semantic-components/ui';",
    markup: '<button scToggle [(pressed)]="…">…</button>',
  };

  private readonly parts = [
    {
      name: 'ScToggle',
      selector: 'button[scToggle]',
      description:
        "A button that stays pressed: pressed (two-way); variant ('default', 'outline'); size ('sm', 'default', 'lg'); disabled. In the style's toggle look.",
    },
  ];
}
