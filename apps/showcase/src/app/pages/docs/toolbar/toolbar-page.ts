import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledToolbarDemoContainer } from './demos/disabled-toolbar-demo-container';
import { InputToolbarDemoContainer } from './demos/input-toolbar-demo-container';
import { MenuToolbarDemoContainer } from './demos/menu-toolbar-demo-container';
import { RtlToolbarDemoContainer } from './demos/rtl-toolbar-demo-container';
import { ToolbarUsageDemoContainer } from './demos/toolbar-usage-demo-container';
import { TooltipToolbarDemoContainer } from './demos/tooltip-toolbar-demo-container';
import { VerticalToolbarDemoContainer } from './demos/vertical-toolbar-demo-container';

@Component({
  selector: 'app-toolbar-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    ToolbarUsageDemoContainer,
    MenuToolbarDemoContainer,
    TooltipToolbarDemoContainer,
    InputToolbarDemoContainer,
    VerticalToolbarDemoContainer,
    DisabledToolbarDemoContainer,
    RtlToolbarDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Toolbar</h1>
        <p class="text-muted-foreground">
          A row of controls of any kind — buttons, toggles, selects, links, an
          input — with one <kbd scKbd>Tab</kbd> stop and the arrow keys between
          them.
        </p>
        <app-component-badges path="toolbar" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-toolbar-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Angular Aria&apos;s Toolbar, with its names: a widget is any of your
          parts made a stop in the toolbar (scToolbarWidget beside scButton,
          scToggle, scLink, scInput or a trigger); a widget group groups widgets
          of any kind — and, with toggles, holds their pressed values.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            role=&quot;toolbar&quot;: one <kbd scKbd>Tab</kbd> stop; the arrow
            keys move between its widgets (<kbd scKbd>←</kbd> and
            <kbd scKbd>→</kbd> mirrored right to left; <kbd scKbd>↑</kbd> and
            <kbd scKbd>↓</kbd> when vertical), wrapping at the ends;
            <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to the ends.
          </li>
          <li>
            A disabled widget stays reachable (softDisabled), announced as
            disabled.
          </li>
          <li>
            Name the toolbar and its groups (aria-label or aria-labelledby);
            icon widgets by sr-only text.
          </li>
          <li>
            An input: one at most, last — Left and Right also move its text
            cursor.
          </li>
          <li>
            A toggle group on its own (not in a toolbar) is the Toggle Group:
            its own <kbd scKbd>Tab</kbd> stop and arrow keys.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-menu-toolbar-demo-container />
        <app-tooltip-toolbar-demo-container />
        <app-input-toolbar-demo-container />
        <app-vertical-toolbar-demo-container />
        <app-disabled-toolbar-demo-container />
        <app-rtl-toolbar-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Toolbar parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ToolbarPage {
  private readonly anatomy = {
    imports:
      "import { ScToolbar, ScToolbarSeparator, ScToolbarWidget, ScToolbarWidgetGroup } from '@semantic-components/ui';",
    markup: [
      '<div scToolbar aria-label="…">',
      '  <div scToolbarWidgetGroup [(value)]="…" aria-label="…">',
      '    <button scToolbarWidget scToggle value="…">…</button>',
      '  </div>',
      '  <div scToolbarSeparator></div>',
      '  <button scToolbarWidget scButton variant="ghost">…</button>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScToolbar',
      selector: 'div[scToolbar]',
      description:
        'Angular Aria\'s Toolbar: role="toolbar", one Tab stop, the arrows between its widgets; orientation, loopFocus (wraps, on by default), disabled, softDisabled (disabled widgets stay focusable, on by default). The style\'s frame.',
    },
    {
      name: 'ScToolbarWidget',
      selector: '[scToolbarWidget]',
      description:
        "Angular Aria's ToolbarWidget: makes any element a stop in the toolbar's keyboard; disabled. Its look and state are the part beside it (scButton, scToggle, scLink, scInput, a trigger).",
    },
    {
      name: 'ScToolbarWidgetGroup',
      selector: 'div[scToolbarWidgetGroup]',
      description:
        "Angular Aria's ToolbarWidgetGroup: widgets grouped (any mix), disabled for all. Can hold its toggles' pressed values: value (an array: a [formField] or two-way), multiple.",
    },
    {
      name: 'ScToolbarSeparator',
      selector: 'div[scToolbarSeparator]',
      description: "A separator across the toolbar's direction.",
    },
  ];
}
