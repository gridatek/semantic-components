import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicTabsDemoContainer } from './demos/basic-tabs-demo-container';
import { DisabledTabsDemoContainer } from './demos/disabled-tabs-demo-container';

@Component({
  selector: 'app-tabs-page',
  imports: [
    BasicTabsDemoContainer,
    DisabledTabsDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Tabs</h1>
        <p class="text-muted-foreground">
          A set of layered sections of content, known as tab panels, displayed
          one at a time.
        </p>
        <app-component-badges path="tabs" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-tabs-demo-container />
        <app-disabled-tabs-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsPage {}
