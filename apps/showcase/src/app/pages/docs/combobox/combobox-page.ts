import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComboboxDemoContainer } from './demos/combobox-demo-container';

@Component({
  selector: 'app-combobox-page',
  imports: [ComponentBadges, ScHeading, TocHeading, ComboboxDemoContainer],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Combobox</h1>
        <p class="text-muted-foreground">
          Autocomplete input and command palette with a list of suggestions.
        </p>
        <app-component-badges path="combobox" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-combobox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComboboxPage {}
