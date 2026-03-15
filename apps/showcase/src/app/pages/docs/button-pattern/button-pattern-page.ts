import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ButtonPatternUsageDemoContainer } from './demos/button-pattern-usage-demo-container';

@Component({
  selector: 'app-button-pattern-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    ButtonPatternUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Button Pattern</h1>
        <p class="text-muted-foreground">
          A directive that adds button behavior to non-button elements.
        </p>
        <app-component-badges path="button-pattern" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-button-pattern-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>What It Does</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Adds
            <code>role="button"</code>
            to the host element.
          </li>
          <li>
            Adds
            <code>tabindex="0"</code>
            for keyboard focusability.
          </li>
          <li>
            Handles
            <code>Enter</code>
            and
            <code>Space</code>
            key presses by triggering a click event.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPatternPage {}
