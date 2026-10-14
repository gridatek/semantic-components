import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicFocusTrapDemoContainer from './demos/basic-focus-trap-demo-container';
import { FocusTrapUsageDemoContainer } from './demos/focus-trap-usage-demo-container';

@Component({
  selector: 'app-focus-trap-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    FocusTrapUsageDemoContainer,
    BasicFocusTrapDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Focus Trap</h1>
        <p class="text-muted-foreground">
          A directive that keeps focus inside an element while it is shown — the
          dialog, alert dialog, drawer, sheet and popover use it.
        </p>
        <app-component-badges path="focus-trap" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-focus-trap-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-focus-trap-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            Once rendered, focuses the element's first focusable child (or the
            one marked
            <code>cdkFocusInitial</code>
            ).
          </li>
          <li>Tab and Shift+Tab wrap round inside it.</li>
          <li>
            When it goes away, focus goes back to where it was before — only if
            it is still inside, or lost to the page. Focus that moved on (into a
            dialog opened from a popover, say) is left where it is, as the CDK's
            Dialog does;
            <code>cdkTrapFocus</code>
            would take it back.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FocusTrapPage {}
