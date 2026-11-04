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
import { ActionAlertDemoContainer } from './demos/action-alert-demo-container';
import { AlertUsageDemoContainer } from './demos/alert-usage-demo-container';
import { AnnouncedAlertDemoContainer } from './demos/announced-alert-demo-container';
import { BasicAlertDemoContainer } from './demos/basic-alert-demo-container';
import { ColorsAlertDemoContainer } from './demos/colors-alert-demo-container';
import { DestructiveAlertDemoContainer } from './demos/destructive-alert-demo-container';
import { RtlAlertDemoContainer } from './demos/rtl-alert-demo-container';

@Component({
  selector: 'app-alert-page',
  imports: [
    Anatomy,
    AlertUsageDemoContainer,
    BasicAlertDemoContainer,
    DestructiveAlertDemoContainer,
    ActionAlertDemoContainer,
    ColorsAlertDemoContainer,
    AnnouncedAlertDemoContainer,
    RtlAlertDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Alert</h1>
        <p class="text-muted-foreground">
          A callout for something to notice — a success, a warning, an error —
          with an icon, a title, a description and an action. In the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="alert" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-alert-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the icon is yours, the
          first child: it sits beside the title and the description.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Announcing</h2>
        <p class="text-muted-foreground">
          An alert has no role of its own: one that is on the page when it loads
          is read in its place, like the rest of the page. Announce one only
          when it appears after something the user did — a save, an error:
        </p>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >role="status"</code
            >
            — polite: read when the screen reader is free. For most: saved,
            sent, updated.
          </li>
          <li>
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >role="alert"</code
            >
            — urgent: interrupts what is being read. Only for what needs action
            now: a failed payment, a lost connection.
          </li>
          <li>
            Put the role on a wrapper that is on the page from the start, empty,
            and show the alert inside it. Screen readers watch a live region
            that already exists and announce what changes in it; with the role
            on an alert added by
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">@if</code>,
            the region and its text arrive together, and many (NVDA, JAWS,
            VoiceOver, depending on the browser) start watching too late and
            say nothing.
          </li>
          <li>
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >role="alert"</code
            >
            is more forgiving: browsers send an event when one is inserted, so
            on the alert itself it is usually read.
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >role="status"</code
            >
            has no such event — the wrapper is the safe way for both.
          </li>
          <li>
            The other way, without a wrapper: keep the alert always rendered
            with its role and change only its text. But an empty alert box
            stays on the page until there is something to say; the wrapper has
            no look, so nothing shows until then.
          </li>
          <li>
            Don&apos;t give a role to an alert that is there from the start: it
            would be announced on every visit, or not at all.
          </li>
        </ul>
        <p class="text-muted-foreground">The Announced example shows it.</p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-alert-demo-container />
        <app-destructive-alert-demo-container />
        <app-action-alert-demo-container />
        <app-colors-alert-demo-container />
        <app-announced-alert-demo-container />
        <app-rtl-alert-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Alert parts"
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
export default class AlertPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScAlert, ScAlertTitle, ScAlertDescription, ScAlertAction,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAlert>',
      '  <svg></svg>',
      '  <div scAlertTitle>…</div>',
      '  <div scAlertDescription>…</div>',
      '  <div scAlertAction>…</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScAlert',
      selector: 'div[scAlert]',
      description:
        "The alert; no role (see Announcing). Input variant: 'default' or 'destructive'.",
    },
    {
      name: 'ScAlertTitle',
      selector: '[scAlertTitle]',
      description: 'The title, beside the icon.',
    },
    {
      name: 'ScAlertDescription',
      selector: '[scAlertDescription]',
      description: 'Muted text under the title; its links underlined.',
    },
    {
      name: 'ScAlertAction',
      selector: '[scAlertAction]',
      description: 'A button in the end corner; the text keeps clear of it.',
    },
  ];
}
