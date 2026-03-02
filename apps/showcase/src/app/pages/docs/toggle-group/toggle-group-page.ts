import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledToggleGroupDemoContainer } from './demos/disabled-toggle-group-demo-container';
import { MultipleToggleGroupDemoContainer } from './demos/multiple-toggle-group-demo-container';
import { OutlineToggleGroupDemoContainer } from './demos/outline-toggle-group-demo-container';
import { SingleToggleGroupDemoContainer } from './demos/single-toggle-group-demo-container';
import { SizesToggleGroupDemoContainer } from './demos/sizes-toggle-group-demo-container';

@Component({
  selector: 'app-toggle-group-page',
  imports: [
    SingleToggleGroupDemoContainer,
    MultipleToggleGroupDemoContainer,
    OutlineToggleGroupDemoContainer,
    SizesToggleGroupDemoContainer,
    DisabledToggleGroupDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Toggle Group</h1>
        <p class="text-muted-foreground">
          A set of two-state buttons that can be toggled on or off.
        </p>
        <app-component-badges path="toggle-group" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-single-toggle-group-demo-container />
        <app-multiple-toggle-group-demo-container />
        <app-outline-toggle-group-demo-container />
        <app-sizes-toggle-group-demo-container />
        <app-disabled-toggle-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToggleGroupPage {}
