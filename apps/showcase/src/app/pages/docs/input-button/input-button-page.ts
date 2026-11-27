import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { FullWidthInputButtonDemoContainer } from './demos/full-width-input-button-demo-container';
import { IconInputButtonDemoContainer } from './demos/icon-input-button-demo-container';
import { InputButtonUsageDemoContainer } from './demos/input-button-usage-demo-container';
import { RtlInputButtonDemoContainer } from './demos/rtl-input-button-demo-container';

@Component({
  selector: 'app-input-button-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    InputButtonUsageDemoContainer,
    FullWidthInputButtonDemoContainer,
    IconInputButtonDemoContainer,
    RtlInputButtonDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Input Button</h1>
        <p class="text-muted-foreground">
          A button that looks like a text field, to open a search, a command
          palette or a picker. In the look of the app&apos;s style&apos;s input.
        </p>
        <app-component-badges path="input-button" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-input-button-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A directive on your button; the icon, the text and the shortcut
          (scKbd) are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A button, not a field: read as one, pressed with
            <kbd scKbd>Enter</kbd> or <kbd scKbd>Space</kbd>. What it opens (a
            dialog, a palette) does the searching.
          </li>
          <li>
            Its name is its text; icon only, give it sr-only text. Name a
            shortcut&apos;s symbols too (⌘: &quot;Command&quot;).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-full-width-input-button-demo-container />
        <app-icon-input-button-demo-container />
        <app-rtl-input-button-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Input Button parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class InputButtonPage {
  private readonly anatomy = {
    imports: "import { ScInputButton } from '@semantic-components/ui';",
    markup: [
      '<button scInputButton data-placeholder>',
      '  <svg …></svg>',
      '  <span class="flex-1">…</span>',
      '  <kbd scKbd>…</kbd>',
      '</button>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScInputButton',
      selector: 'button[scInputButton]',
      description:
        'A button in the style\'s input look: its text muted while data-placeholder (yours on a search; a picker\'s trigger sets it while empty), a long text cut, its icon sized; type="button".',
    },
  ];
}
