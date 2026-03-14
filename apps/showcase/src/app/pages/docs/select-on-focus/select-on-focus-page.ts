import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { SelectOnFocusUsageDemoContainer } from './demos/select-on-focus-usage-demo-container';

@Component({
  selector: 'app-select-on-focus-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    SelectOnFocusUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Select On Focus</h1>
        <p class="text-muted-foreground">
          A directive that automatically selects input text on focus.
          Configurable to respond to specific focus origins.
        </p>
        <app-component-badges path="select-on-focus" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-select-on-focus-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Uses
            <code>FocusMonitor</code>
            to detect the origin of focus events.
          </li>
          <li>
            When the focus origin matches one of the configured origins and the
            input has a non-empty value, calls
            <code>select()</code>
            to highlight all text.
          </li>
          <li>
            By default, responds to all focus origins (
            <code>program</code>
            ,
            <code>keyboard</code>
            ,
            <code>mouse</code>
            ,
            <code>touch</code>
            ).
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectOnFocusPage {}
