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
import { AsLinkButtonDemoContainer } from './demos/as-link-button-demo-container';
import { ButtonUsageDemoContainer } from './demos/button-usage-demo-container';
import { DefaultButtonDemoContainer } from './demos/default-button-demo-container';
import { DestructiveButtonDemoContainer } from './demos/destructive-button-demo-container';
import { DisabledButtonDemoContainer } from './demos/disabled-button-demo-container';
import { GhostButtonDemoContainer } from './demos/ghost-button-demo-container';
import { GroupButtonDemoContainer } from './demos/group-button-demo-container';
import { IconButtonDemoContainer } from './demos/icon-button-demo-container';
import { LinkButtonDemoContainer } from './demos/link-button-demo-container';
import { OutlineButtonDemoContainer } from './demos/outline-button-demo-container';
import { RoundedButtonDemoContainer } from './demos/rounded-button-demo-container';
import { RtlButtonDemoContainer } from './demos/rtl-button-demo-container';
import { SecondaryButtonDemoContainer } from './demos/secondary-button-demo-container';
import { SizeButtonDemoContainer } from './demos/size-button-demo-container';
import { SpinnerButtonDemoContainer } from './demos/spinner-button-demo-container';
import { WithIconButtonDemoContainer } from './demos/with-icon-button-demo-container';

@Component({
  selector: 'app-button-page',
  imports: [
    Anatomy,
    ButtonUsageDemoContainer,
    SizeButtonDemoContainer,
    DefaultButtonDemoContainer,
    OutlineButtonDemoContainer,
    SecondaryButtonDemoContainer,
    GhostButtonDemoContainer,
    DestructiveButtonDemoContainer,
    LinkButtonDemoContainer,
    IconButtonDemoContainer,
    WithIconButtonDemoContainer,
    RoundedButtonDemoContainer,
    SpinnerButtonDemoContainer,
    GroupButtonDemoContainer,
    AsLinkButtonDemoContainer,
    DisabledButtonDemoContainer,
    RtlButtonDemoContainer,
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
        <h1 scHeading>Button</h1>
        <p class="text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
        <app-component-badges path="button" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-button-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          One part, on a native button. An icon may go at either side, marked
          with its side; a spinner in place of the first while it is busy.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Cursor</h2>
        <p class="text-muted-foreground">
          Buttons keep the default cursor, as native buttons and Tailwind do: a
          pointer is for links. To show one on buttons anyway, add to your
          global styles:
          <code class="bg-muted rounded px-1 py-0.5 font-mono text-sm"
            >button:not(:disabled) &#123; cursor: pointer; &#125;</code
          >.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-size-button-demo-container />
        <app-default-button-demo-container />
        <app-outline-button-demo-container />
        <app-secondary-button-demo-container />
        <app-ghost-button-demo-container />
        <app-destructive-button-demo-container />
        <app-link-button-demo-container />
        <app-icon-button-demo-container />
        <app-with-icon-button-demo-container />
        <app-rounded-button-demo-container />
        <app-spinner-button-demo-container />
        <app-group-button-demo-container />
        <app-as-link-button-demo-container />
        <app-disabled-button-demo-container />
        <app-rtl-button-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">ScButton</code>
          is a directive on a native
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >button[scButton]</code
          >: its classes are the app&apos;s preset&apos;s (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >provideScConfig(&#123; preset &#125;)</code
          >, nova by default), and it marks itself
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >data-slot="button"</code
          >.
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="ScButton inputs"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Input</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Default</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (input of inputs; track input.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.name }}</code>
                  </td>
                  <td scTableCell class="whitespace-normal">
                    <code class="font-mono text-sm">{{ input.type }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ input.default }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ input.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="text-muted-foreground">
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >ScButtonVariants</code
          >
          (&#123; variant, size &#125;) is the type of every part that styles
          itself as a button: a link (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">a[scLink]</code
          >), an alert dialog&apos;s action and cancel, a carousel&apos;s
          arrows, a calendar&apos;s buttons, a code block&apos;s copy… Each
          takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">variant</code>
          and <code class="bg-muted rounded px-1.5 py-0.5 text-sm">size</code>,
          with defaults that suit its place.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ButtonPage {
  protected readonly anatomy = {
    imports: "import { ScButton } from '@semantic-components/ui';",
    markup: [
      '<button scButton>',
      '  <svg data-icon="inline-start"></svg>',
      '  Label',
      '  <svg data-icon="inline-end"></svg>',
      '</button>',
    ].join('\n'),
  };

  protected readonly inputs = [
    {
      name: 'variant',
      type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'",
      default: "'default'",
      description: 'Its look.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
      default: "'default'",
      description:
        'Its height: 24, 28, 32 or 36 px; the icon sizes are squares of the same.',
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description:
        'A button by default: in a form, only a submit button submits it.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description:
        'Sets the native disabled and aria-disabled: not pressed, skipped by Tab.',
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Classes merged over the preset (cn: a later class wins).',
    },
  ];
}
