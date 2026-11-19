import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledToggleGroupDemoContainer } from './demos/disabled-toggle-group-demo-container';
import { FontWeightToggleGroupDemoContainer } from './demos/font-weight-toggle-group-demo-container';
import { MultipleToggleGroupDemoContainer } from './demos/multiple-toggle-group-demo-container';
import { OutlineToggleGroupDemoContainer } from './demos/outline-toggle-group-demo-container';
import { RtlToggleGroupDemoContainer } from './demos/rtl-toggle-group-demo-container';
import { SingleToggleGroupDemoContainer } from './demos/single-toggle-group-demo-container';
import { SizesToggleGroupDemoContainer } from './demos/sizes-toggle-group-demo-container';
import { SpacingToggleGroupDemoContainer } from './demos/spacing-toggle-group-demo-container';
import { ToggleGroupUsageDemoContainer } from './demos/toggle-group-usage-demo-container';
import { VerticalToggleGroupDemoContainer } from './demos/vertical-toggle-group-demo-container';

@Component({
  selector: 'app-toggle-group-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    ToggleGroupUsageDemoContainer,
    OutlineToggleGroupDemoContainer,
    SizesToggleGroupDemoContainer,
    SpacingToggleGroupDemoContainer,
    VerticalToggleGroupDemoContainer,
    DisabledToggleGroupDemoContainer,
    FontWeightToggleGroupDemoContainer,
    SingleToggleGroupDemoContainer,
    MultipleToggleGroupDemoContainer,
    RtlToggleGroupDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Toggle Group</h1>
        <p class="text-muted-foreground">
          Toggles sharing one value: one pressed at a time, or several. In the
          look of the app&apos;s style.
        </p>
        <app-component-badges path="toggle-group" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-toggle-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A group round your buttons, each with its value; the group holds the
          pressed ones — a [formField] or [(value)], an array. Inside a toolbar,
          use a widget group in the toolbar: it shares the toolbar&apos;s arrow
          keys.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            One <kbd scKbd>Tab</kbd> stop: the arrow keys move between the items
            (<kbd scKbd>←</kbd> and <kbd scKbd>→</kbd> mirrored right to left;
            <kbd scKbd>↑</kbd> and <kbd scKbd>↓</kbd> when vertical),
            <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to the ends;
            <kbd scKbd>Space</kbd> and <kbd scKbd>Enter</kbd> press one.
          </li>
          <li>
            Each item a button with aria-pressed; its name stays the same as it
            toggles — its text, or an icon with sr-only text.
          </li>
          <li>Name the group: aria-label or aria-labelledby.</li>
          <li>
            The keyboard follows Base UI&apos;s toggle group
            (role=&quot;group&quot;, the CDK&apos;s FocusKeyManager), not
            Angular Aria&apos;s Toolbar: a toolbar is its own component
            (scToolbar), with its widget group (scToolbarWidgetGroup) sharing
            the toolbar&apos;s <kbd scKbd>Tab</kbd> stop and arrow keys. You
            choose: a toggle group on its own, or a toolbar.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-outline-toggle-group-demo-container />
        <app-sizes-toggle-group-demo-container />
        <app-spacing-toggle-group-demo-container />
        <app-vertical-toggle-group-demo-container />
        <app-disabled-toggle-group-demo-container />
        <app-font-weight-toggle-group-demo-container />
        <app-single-toggle-group-demo-container />
        <app-multiple-toggle-group-demo-container />
        <app-rtl-toggle-group-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Toggle Group parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ToggleGroupPage {
  private readonly anatomy = {
    imports:
      "import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';",
    markup: [
      '<div scToggleGroup [formField]="…" aria-label="…">',
      '  <button scToggleGroupItem value="…">…</button>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScToggleGroup',
      selector: 'div[scToggleGroup]',
      description:
        'role="group"; value: the pressed items\' values, an array (a [formField], or two-way); multiple; variant, size, spacing (2; 0 joins them) and orientation for its items; loopFocus; disabled.',
    },
    {
      name: 'ScToggleGroupItem',
      selector: 'button[scToggleGroupItem]',
      description:
        "A toggle in the group: value (any type), pressed when the group's value includes it (aria-pressed); disabled. In the style's toggle look.",
    },
  ];
}
