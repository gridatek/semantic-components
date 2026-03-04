import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-multi-select-page',
  imports: [ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>MultiSelect</h1>
        <p class="text-muted-foreground">
          Select multiple options from a dropdown with chips, search, and
          select-all functionality.
        </p>
        <app-component-badges path="multi-select" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MultiSelectPage {}
