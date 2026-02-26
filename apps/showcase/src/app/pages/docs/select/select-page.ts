import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SelectDemoContainer } from './demos/select-demo-container';
import { SelectDisabledDemoContainer } from './demos/select-disabled-demo-container';
import { SelectGroupDemoContainer } from './demos/select-group-demo-container';
import { SelectSignalFormsDemoContainer } from './demos/select-signal-forms-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-select-page',
  imports: [
    SelectDemoContainer,
    SelectDisabledDemoContainer,
    SelectGroupDemoContainer,
    SelectSignalFormsDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Select</h1>
        <p class="text-muted-foreground">
          Displays a list of options for the user to pick from — mimics a native
          select.
        </p>
        <app-component-badges path="select" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-select-demo-container />
        <app-select-group-demo-container />
        <app-select-disabled-demo-container />
        <app-select-signal-forms-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {}
