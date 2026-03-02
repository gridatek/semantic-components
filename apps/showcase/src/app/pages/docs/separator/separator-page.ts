import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSeparatorDemoContainer } from './demos/basic-separator-demo-container';
import { CardSeparatorDemoContainer } from './demos/card-separator-demo-container';
import { VerticalSeparatorDemoContainer } from './demos/vertical-separator-demo-container';

@Component({
  selector: 'app-separator-page',
  imports: [
    BasicSeparatorDemoContainer,
    VerticalSeparatorDemoContainer,
    CardSeparatorDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Separator</h1>
        <p class="text-muted-foreground">
          Visually or semantically separates content.
        </p>
        <app-component-badges path="separator" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-separator-demo-container />
        <app-vertical-separator-demo-container />
        <app-card-separator-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SeparatorPage {}
