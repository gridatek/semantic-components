import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import {
  type ApiInput,
  ApiTable,
} from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { GlobalPreferenceDemoContainer } from './demos/global-preference-demo-container';
import { PreferencesUsageDemoContainer } from './demos/preferences-usage-demo-container';
import { ReadPreferenceDemoContainer } from './demos/read-preference-demo-container';
import { SeveralPreferencesDemoContainer } from './demos/several-preferences-demo-container';

@Component({
  selector: 'app-preferences-page',
  imports: [
    ScTypeset,
    Anatomy,
    ApiTable,
    PartsTable,
    TocHeading,
    ComponentBadges,
    PreferencesUsageDemoContainer,
    ReadPreferenceDemoContainer,
    GlobalPreferenceDemoContainer,
    SeveralPreferencesDemoContainer,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Preferences</h1>
        <p class="text-muted-foreground">
          A user&apos;s choices from fixed lists — list or grid, a density, a
          panel open — kept, and written as
          <code scTypeset>data-*</code> attributes for your styles to follow.
        </p>
        <app-component-badges path="preferences" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-preferences-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A preference is declared once, in a file of yours; any component reads
          and sets it; an element shows it as an attribute.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Kept, and shown</h2>
        <p>
          With a <code scTypeset>storageKey</code>, a choice is saved as a
          cookie — the server reads it, so a page rendered per request is drawn
          as the user left it, from the first paint — copied to
          <code scTypeset>localStorage</code>; another tab&apos;s choice comes
          through. Without one, it lasts as long as the app. A saved value not
          in <code scTypeset>values</code> is ignored: the default. A
          prerendered page has no request: it shows the default until the app
          starts. The theme (light, dark, system) is the theme manager&apos;s.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-read-preference-demo-container />
        <app-global-preference-demo-container />
        <app-several-preferences-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <app-parts-table label="Preferences parts" [parts]="parts" />
        <app-api-table label="definePreference options" [inputs]="options" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PreferencesPage {
  private readonly anatomy = {
    imports:
      "import { ScPreferencesApply, definePreference, injectPreference } from '@semantic-components/ui';",
    markup: [
      '// view.ts',
      "export const view = definePreference({ attribute: 'data-view', values: ['list', 'grid'], defaultValue: 'list', storageKey: 'app-view' });",
      '',
      '// a component',
      'readonly view = injectPreference(view); // view.value(), view.set("grid")',
      '',
      '<div [scPreferences]="[view]">',
      '  <ul class="grid in-data-[view=grid]:grid-cols-2">…</ul>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'definePreference',
      selector: 'function',
      description:
        'Declares a preference: its attribute, its values, its default, where it is kept.',
    },
    {
      name: 'injectPreference',
      selector: 'function',
      description:
        "The preference's instance, the same everywhere: value() (a signal), set(value).",
    },
    {
      name: 'ScPreferencesApply',
      selector: '[scPreferences]',
      description:
        'Writes the preferences as data-* attributes on its element — or <html> for a global one.',
    },
  ];

  private readonly options: ApiInput[] = [
    {
      name: 'attribute',
      type: '`data-${string}`',
      default: '—',
      description: 'The attribute it is written in.',
    },
    {
      name: 'values',
      type: 'readonly V[]',
      default: '—',
      description: 'The values it can take.',
    },
    {
      name: 'defaultValue',
      type: 'V',
      default: '—',
      description: 'Its value while none is saved.',
    },
    {
      name: 'storageKey',
      type: 'string',
      default: '—',
      description: 'Kept under this name; without it, for the app’s life.',
    },
    {
      name: 'global',
      type: 'boolean',
      default: 'false',
      description: 'On <html>, for the whole page.',
    },
  ];
}
