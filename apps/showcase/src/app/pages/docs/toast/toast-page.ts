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
import { DurationToastDemoContainer } from './demos/duration-toast-demo-container';
import { PositionToastDemoContainer } from './demos/position-toast-demo-container';
import { PromiseToastDemoContainer } from './demos/promise-toast-demo-container';
import { StackedToastDemoContainer } from './demos/stacked-toast-demo-container';
import { ToastUsageDemoContainer } from './demos/toast-usage-demo-container';
import { TypesToastDemoContainer } from './demos/types-toast-demo-container';
import { UpdateToastDemoContainer } from './demos/update-toast-demo-container';

@Component({
  selector: 'app-toast-page',
  imports: [
    Anatomy,
    ToastUsageDemoContainer,
    TypesToastDemoContainer,
    PromiseToastDemoContainer,
    PositionToastDemoContainer,
    DurationToastDemoContainer,
    UpdateToastDemoContainer,
    StackedToastDemoContainer,
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
        <h1 scHeading>Toast</h1>
        <p class="text-muted-foreground">
          A succinct message that is displayed temporarily.
        </p>
        <app-component-badges path="toast" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-toast-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Toasts are shown from code, with ScToaster. How one looks is written
          once, in your app: an ng-template whose root is a scToast, its parts
          inside, from the toast&apos;s data. The toaster renders it for each
          toast, in a stack of its own.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The stack is one polite live region: each new toast is announced as
            it appears, without interrupting.
          </li>
          <li>
            A toast&apos;s timer pauses while its stack is hovered or focused,
            so it can be read and its action reached; a duration of 0 keeps it
            until closed.
          </li>
          <li>
            The toaster&apos;s hotkey moves focus to the toasts, and Escape
            back; write the keys in the template&apos;s label, the region&apos;s
            name.
          </li>
          <li>
            The close button is icon-only: name it (a sr-only span). Swiping a
            toast sideways closes it too.
          </li>
          <li>
            Positions follow the page&apos;s direction: start is the right in
            Arabic or Hebrew.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-types-toast-demo-container />
        <app-promise-toast-demo-container />
        <app-position-toast-demo-container />
        <app-duration-toast-demo-container />
        <app-update-toast-demo-container />
        <app-stacked-toast-demo-container />
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
          aria-label="Toast parts"
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
export default class ToastPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScToaster, ScToastTemplate, ScToast, ScToastIcon,',
      '  ScToastTitle, ScToastDescription, ScToastAction, ScToastClose,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<!-- once, in your app -->',
      '<ng-template scToastTemplate let-toast label="…">',
      '  <div scToast>',
      '    <span scToastIcon>…</span>',
      '    <div class="flex min-w-0 flex-1 flex-col gap-1">',
      '      <div scToastTitle>{{ toast.title }}</div>',
      '      <div scToastDescription>{{ toast.description }}</div>',
      '    </div>',
      '    <button scToastAction>{{ toast.action.label }}</button>',
      '    <button scToastClose>…</button>',
      '  </div>',
      '</ng-template>',
      '',
      '<!-- anywhere -->',
      "inject(ScToaster).show({ title: '…', description: '…' });",
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScToaster',
      selector: 'service',
      description:
        'show(config) returns its id; update(id, config), promise(promise, config), dismiss(id), dismissAll(); toasts. A config: title, description, variant (default, success, info, warning, error, loading), action { label, onClick }, duration (0 keeps it), position. Its settings in provideSemanticComponents({ toaster }): position, duration, visibleToasts, maxToasts, layout, hotkey.',
    },
    {
      name: 'ScToastTemplate',
      selector: 'ng-template[scToastTemplate]',
      description:
        "How a toast looks, written once in your app; let-toast is the toast's data. label names the toasts' region (write the hotkey in it).",
    },
    {
      name: 'ScToast',
      selector: 'div[scToast]',
      description:
        "The toast, the template's root: the preset's look, data-variant, its place in the stack (the newest in front, spread out while hovered or focused); it slides in and out, and goes when swiped sideways.",
    },
    {
      name: 'ScToastIcon',
      selector: '[scToastIcon]',
      description:
        'Your icon, hidden from screen readers: red for an error; it spins while loading.',
    },
    {
      name: 'ScToastTitle, ScToastDescription',
      selector: '[scToastTitle], [scToastDescription]',
      description: 'The title, and the description under it, muted.',
    },
    {
      name: 'ScToastAction',
      selector: 'button[scToastAction]',
      description:
        "Runs the toast's action, then closes it: the preset's button (outline, sm; variant, size). Write its text (toast.action.label).",
    },
    {
      name: 'ScToastClose',
      selector: 'button[scToastClose]',
      description:
        "Closes the toast: the preset's button (ghost, icon-sm; variant, size), at the end of the row, muted until hovered. Write its icon and name it.",
    },
  ];
}
