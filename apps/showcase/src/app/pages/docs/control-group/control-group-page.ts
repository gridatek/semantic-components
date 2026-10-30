import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { ControlGroupUsageDemoContainer } from './demos/control-group-usage-demo-container';
import { InputControlGroupDemoContainer } from './demos/input-control-group-demo-container';
import { InputGroupControlGroupDemoContainer } from './demos/input-group-control-group-demo-container';
import { NestedControlGroupDemoContainer } from './demos/nested-control-group-demo-container';
import { RtlControlGroupDemoContainer } from './demos/rtl-control-group-demo-container';
import { SelectControlGroupDemoContainer } from './demos/select-control-group-demo-container';
import { TextControlGroupDemoContainer } from './demos/text-control-group-demo-container';

interface ScApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-control-group-page',
  imports: [
    Anatomy,
    RouterLink,
    ControlGroupUsageDemoContainer,
    InputControlGroupDemoContainer,
    TextControlGroupDemoContainer,
    SelectControlGroupDemoContainer,
    InputGroupControlGroupDemoContainer,
    NestedControlGroupDemoContainer,
    RtlControlGroupDemoContainer,
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
        <h1 scHeading>Control Group</h1>
        <p class="text-muted-foreground">
          An input or a select joined with its buttons into one control: shared
          borders, the outer corners rounded, in the look of the app&apos;s
          preset. Text and input groups join in too.
        </p>
        <app-component-badges path="control-group" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-control-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A group on a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">div</code>, its
          children what you put in it: inputs, selects, text, buttons, input
          groups, other groups. Name it with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">aria-label</code
          >: it is announced as a group.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>shadcn&apos;s Button Group</h2>
        <p class="text-muted-foreground">
          This is shadcn&apos;s
          <a
            href="https://ui.shadcn.com/docs/components/button-group"
            class="underline underline-offset-4"
            >Button Group</a
          >, under a name for what it is for: joining an input or a select with
          its buttons. Its look, class for class, and its parts are
          shadcn&apos;s. It joins buttons alone too — vertically, in three
          sizes, with a separator, as a split button, with a menu or a popover:
          those examples are on the
          <a
            routerLink="/docs/components/button"
            class="underline underline-offset-4"
            >Button page</a
          >.
        </p>
        <p class="text-muted-foreground">
          Tab goes to each control. For buttons that toggle a state, use a
          Toggle Group; for a row of controls moved between with the arrow keys,
          a Toolbar.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-input-control-group-demo-container />
        <app-text-control-group-demo-container />
        <app-select-control-group-demo-container />
        <app-input-group-control-group-demo-container />
        <app-nested-control-group-demo-container />
        <app-rtl-control-group-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        @for (part of parts; track part.name) {
          <h3 class="font-heading text-base font-medium">
            {{ part.name }} —
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
              part.selector
            }}</code>
          </h3>
          <p class="text-muted-foreground">{{ part.description }}</p>
          <div
            scTableContainer
            tabindex="0"
            role="region"
            [attr.aria-label]="part.name + ' inputs'"
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
                @for (input of part.inputs; track input.name) {
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
        }
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ControlGroupPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScControlGroup,',
      '  ScControlGroupSeparator,',
      '  ScControlGroupText,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scControlGroup aria-label="…">',
      '  <label scControlGroupText for="…">Text</label>',
      '  <input scInput id="…" />',
      '  <button scButton variant="outline">Button</button>',
      '  <div scControlGroupSeparator></div>',
      '  <button scButton variant="outline">Button</button>',
      '</div>',
    ].join('\n'),
  };

  private readonly classRow: ScApiRow = {
    name: 'class',
    type: 'string',
    default: "''",
    description: 'Classes merged over the preset (cn: a later class wins).',
  };

  protected readonly parts = [
    {
      name: 'ScControlGroup',
      selector: 'div[scControlGroup]',
      description:
        'The group: role="group", its classes the preset’s. A group in a group is spaced from the others.',
      inputs: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: 'Side by side, or stacked.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScControlGroupText',
      selector: 'div[scControlGroupText], label[scControlGroupText]',
      description:
        'Text beside the buttons. On a label, it names the input it is for.',
      inputs: [this.classRow],
    },
    {
      name: 'ScControlGroupSeparator',
      selector: 'div[scControlGroupSeparator]',
      description:
        'A line between two buttons of the same look (secondary ones: they have no border); see the Button page’s Group Separator and Split Button.',
      inputs: [
        {
          name: 'orientation',
          type: "'horizontal' | 'vertical'",
          default: "'vertical'",
          description:
            'Vertical between buttons side by side; horizontal in a stacked group.',
        },
        this.classRow,
      ],
    },
  ];
}
