import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicAutocompleteDemoContainer } from './demos/basic-autocomplete-demo-container';

@Component({
  selector: 'app-autocomplete-page',
  imports: [
    BasicAutocompleteDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Autocomplete</h1>
        <p class="text-muted-foreground">
          An input with autocomplete suggestions.
        </p>
        <app-component-badges path="autocomplete" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-autocomplete-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AutocompletePage {}
