import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { ConfirmationUsageDemoContainer } from './demos/confirmation-usage-demo-container';
import { RtlConfirmationDemoContainer } from './demos/rtl-confirmation-demo-container';

/** shadcn's Confirmation pattern: asks for approval before a tool runs. */
@Component({
  selector: 'app-confirmation-page',
  imports: [
    Anatomy,
    ConfirmationUsageDemoContainer,
    RouterLink,
    RtlConfirmationDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Confirmation</h1>
        <p class="text-muted-foreground">
          Asks the person for a yes or no before a tool runs.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-confirmation-usage-demo-container />
        <p class="text-muted-foreground">
          The question is an
          <a scLink routerLink="/docs/components/item">Item</a> with Deny and
          Approve buttons. A pending approval is a prompt, not activity, so it
          sits outside the Trace; once the person answers, the call becomes a
          <a scLink routerLink="/docs/ai-elements/tool">Tool</a> line — Ran, or
          Denied.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-confirmation-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the <a scLink routerLink="/docs/components/item">Item</a> and the
          <a scLink routerLink="/docs/components/trace">Trace</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ConfirmationPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScItem, ScItemMedia, ScItemBody, ScItemTitle, ScItemDescription,',
      '  ScItemActions, ScButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scItem variant="outline" size="sm">',
      '  <div scItemMedia variant="icon"><svg siTerminalIcon></svg></div>',
      '  <div scItemBody>',
      '    <div scItemTitle>Run {{ command }}?</div>',
      '    <p scItemDescription>The command runs in this project.</p>',
      '  </div>',
      '  <div scItemActions>',
      '    <button scButton size="sm" variant="outline" (click)="deny()">Deny</button>',
      '    <button scButton size="sm" (click)="approve()">Approve</button>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
