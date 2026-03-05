import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { BasicMultiselectDemoContainer } from './demos/basic-multiselect-demo-container';

@Component({
  selector: 'app-multiselect-page',
  imports: [ComponentBadges, ScHeading, BasicMultiselectDemoContainer],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Multiselect</h1>
        <p class="text-muted-foreground">
          Select multiple options from a dropdown.
        </p>
        <app-component-badges path="multiselect" />
      </div>

      <section class="space-y-8">
        <h2 scHeading>Examples</h2>
        <app-basic-multiselect-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MultiSelectPage {}
