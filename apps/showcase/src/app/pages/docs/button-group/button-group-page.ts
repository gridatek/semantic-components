import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonGroupDemoContainer } from './demos/button-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-button-group-page',
  imports: [ButtonGroupDemoContainer, TocHeading, ComponentBadges, ScHeading],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Button Group</h1>
        <p class="text-muted-foreground">
          Groups buttons together with merged borders and rounding.
        </p>
        <app-component-badges path="button-group" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-button-group-demo-container />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonGroupPage {}
