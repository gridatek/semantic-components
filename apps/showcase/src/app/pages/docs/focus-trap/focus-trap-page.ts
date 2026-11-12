import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicFocusTrapDemoContainer from './demos/basic-focus-trap-demo-container';
import { FocusTrapUsageDemoContainer } from './demos/focus-trap-usage-demo-container';

@Component({
  selector: 'app-focus-trap-page',
  imports: [
    Anatomy,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
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

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One directive on the element shown — a dialog, a panel: focus moves
          in, Tab stays inside, and focus goes back where it came from when it
          goes away.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
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

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-focus-trap-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">A behaviour only, on any element.</p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Focus Trap parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class FocusTrapPage {
  protected readonly anatomy = {
    imports: ["import { ScFocusTrap } from '@semantic-components/ui';"].join(
      '\n',
    ),
    markup: ['@if (open()) {', '  <div scFocusTrap>…</div>', '}'].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScFocusTrap',
      selector: '[scFocusTrap]',
      description:
        'Focuses the first focusable element once rendered (or the one marked cdkFocusInitial); Tab and Shift+Tab wrap inside. [scFocusTrap]="false": focus still moves in and comes back, but Tab may leave (a non-modal popover). On the way out, focus goes back only if it was still inside, or lost to the page.',
    },
  ];
}
