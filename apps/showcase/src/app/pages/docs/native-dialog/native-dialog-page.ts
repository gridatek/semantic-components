import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScKbd, ScLink, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { CloseButtonNativeDialogDemoContainer } from './demos/close-button-native-dialog-demo-container';
import { NativeDialogUsageDemoContainer } from './demos/native-dialog-usage-demo-container';
import { NoCloseButtonNativeDialogDemoContainer } from './demos/no-close-button-native-dialog-demo-container';
import { RtlNativeDialogDemoContainer } from './demos/rtl-native-dialog-demo-container';
import { ScrollableContentNativeDialogDemoContainer } from './demos/scrollable-content-native-dialog-demo-container';
import { StickyFooterNativeDialogDemoContainer } from './demos/sticky-footer-native-dialog-demo-container';

@Component({
  selector: 'app-native-dialog-page',
  imports: [
    RouterLink,
    ScKbd,
    ScLink,
    PartsTable,
    Anatomy,
    NativeDialogUsageDemoContainer,
    CloseButtonNativeDialogDemoContainer,
    NoCloseButtonNativeDialogDemoContainer,
    StickyFooterNativeDialogDemoContainer,
    ScrollableContentNativeDialogDemoContainer,
    RtlNativeDialogDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Native Dialog</h1>
        <p class="text-muted-foreground">
          The
          <a scLink routerLink="/docs/components/dialog">Dialog</a>
          — its parts, its look, its behaviour — on the browser&apos;s own
          <code scTypeset>&lt;dialog&gt;</code> element.
        </p>
        <app-component-badges path="native-dialog" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-native-dialog-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The Dialog&apos;s, part for part: every part is a directive on your
          element; the text, the buttons and their names are yours. The dialog
          is in a template, rendered while it is open.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Native</h2>
        <p>
          What the Dialog builds with the CDK, the browser does here: the dialog
          is shown with <code scTypeset>showModal()</code>, in the top layer,
          above everything, whatever the page&apos;s stacking.
        </p>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            The page behind is inert, and focus stays in the dialog — no focus
            trap of ours.
          </li>
          <li>
            It takes the direction and language of where it is written, as any
            element: it isn&apos;t moved to the end of the page.
          </li>
          <li>
            Its first focus is the browser&apos;s: the first focusable element,
            or the one with <code scTypeset>autofocus</code> (the Dialog&apos;s
            <code scTypeset>cdkFocusInitial</code>).
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Closing</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            scNativeDialogClose closes it, on any button — the ✕ straight in the
            dialog (in its corner), Cancel or Done in the footer. It is the
            style&apos;s button: ghost and icon-sized for the ✕,
            variant=&quot;outline&quot; size=&quot;default&quot; for Cancel — no
            scButton.
          </li>
          <li>
            When your code runs first — Save checks and sends the form — the
            button is yours, and closes the dialog through [(open)] when it is
            done (or keeps it open, to show what is wrong).
          </li>
          <li>
            <kbd scKbd>Escape</kbd> and a click outside close it too; it fades
            out, then the browser gives focus back to what opened it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-close-button-native-dialog-demo-container />
        <app-no-close-button-native-dialog-demo-container />
        <app-sticky-footer-native-dialog-demo-container />
        <app-scrollable-content-native-dialog-demo-container />
        <app-rtl-native-dialog-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Native Dialog parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class NativeDialogPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScNativeDialogProvider, ScNativeDialogTrigger, ScNativeDialogPortal,',
      '  ScNativeDialog, ScNativeDialogClose, ScNativeDialogHeader,',
      '  ScNativeDialogTitle, ScNativeDialogDescription, ScNativeDialogBody,',
      '  ScNativeDialogFooter,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scNativeDialogProvider [(open)]="open">',
      '  <button scButton scNativeDialogTrigger>…</button>',
      '  <ng-template scNativeDialogPortal>',
      '    <dialog scNativeDialog>',
      '      <button scNativeDialogClose>…</button>',
      '      <div scNativeDialogHeader>',
      '        <h2 scNativeDialogTitle>…</h2>',
      '        <p scNativeDialogDescription>…</p>',
      '      </div>',
      '      <div scNativeDialogBody>…</div>',
      '      <div scNativeDialogFooter>',
      '        <button scNativeDialogClose variant="outline" size="default">Cancel</button>',
      '        <button scButton (click)="save()">…</button>',
      '      </div>',
      '    </dialog>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScNativeDialogProvider',
      selector: 'div[scNativeDialogProvider], span[scNativeDialogProvider]',
      description:
        '[(open)]. Renders the dialog in place while open, the page behind kept from scrolling.',
    },
    {
      name: 'ScNativeDialogTrigger',
      selector: 'button[scNativeDialogTrigger]',
      description: 'Opens it; behaviour only, on any button.',
    },
    {
      name: 'ScNativeDialogPortal, ScNativeDialog',
      selector: 'ng-template[scNativeDialogPortal], dialog[scNativeDialog]',
      description:
        'The dialog, rendered while open and shown as a modal (showModal): the whole screen, the style’s backdrop and, centred, the panel in the Dialog’s look — your class goes on the panel. Named by its title, described by its description; Escape and a click outside close it.',
    },
    {
      name: 'ScNativeDialogClose',
      selector: 'button[scNativeDialogClose]',
      description:
        'Closes it: the style’s button, variant and size (ghost, icon-sm: the ✕). Straight in the dialog: in its corner.',
    },
    {
      name: 'ScNativeDialogHeader, ScNativeDialogFooter',
      selector: 'div[scNativeDialogHeader], div[scNativeDialogFooter]',
      description: 'The title and description; the buttons.',
    },
    {
      name: 'ScNativeDialogBody',
      selector: 'div[scNativeDialogBody]',
      description:
        'The content between them: past half the screen it scrolls, edge to edge, while the header and the footer stay.',
    },
    {
      name: 'ScNativeDialogTitle, ScNativeDialogDescription',
      selector: 'h2[scNativeDialogTitle], p[scNativeDialogDescription]',
      description: 'Its name and its description.',
    },
  ];
}
