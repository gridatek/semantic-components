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
import { ButtonGroupUsageDemoContainer } from './demos/button-group-usage-demo-container';
import { DropdownButtonGroupDemoContainer } from './demos/dropdown-button-group-demo-container';
import { InputButtonGroupDemoContainer } from './demos/input-button-group-demo-container';
import { InputGroupButtonGroupDemoContainer } from './demos/input-group-button-group-demo-container';
import { NestedButtonGroupDemoContainer } from './demos/nested-button-group-demo-container';
import { OrientationButtonGroupDemoContainer } from './demos/orientation-button-group-demo-container';
import { PopoverButtonGroupDemoContainer } from './demos/popover-button-group-demo-container';
import { RtlButtonGroupDemoContainer } from './demos/rtl-button-group-demo-container';
import { SelectButtonGroupDemoContainer } from './demos/select-button-group-demo-container';
import { SeparatorButtonGroupDemoContainer } from './demos/separator-button-group-demo-container';
import { SizeButtonGroupDemoContainer } from './demos/size-button-group-demo-container';
import { SplitButtonGroupDemoContainer } from './demos/split-button-group-demo-container';
import { TextButtonGroupDemoContainer } from './demos/text-button-group-demo-container';

interface ScApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-button-group-page',
  imports: [
    Anatomy,
    ButtonGroupUsageDemoContainer,
    OrientationButtonGroupDemoContainer,
    SizeButtonGroupDemoContainer,
    NestedButtonGroupDemoContainer,
    SeparatorButtonGroupDemoContainer,
    SplitButtonGroupDemoContainer,
    InputButtonGroupDemoContainer,
    TextButtonGroupDemoContainer,
    InputGroupButtonGroupDemoContainer,
    DropdownButtonGroupDemoContainer,
    SelectButtonGroupDemoContainer,
    PopoverButtonGroupDemoContainer,
    RtlButtonGroupDemoContainer,
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
        <h1 scHeading>Button Group</h1>
        <p class="text-muted-foreground">
          Related buttons joined into one: shared borders, the outer corners
          rounded, side by side or stacked. Inputs, selects, text and other
          groups join in too, in the look of the app&apos;s preset. For buttons
          that switch something on or off, use a Toggle Group.
        </p>
        <app-component-badges path="button-group" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-button-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          A group on a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">div</code>, its
          children what you put in it: buttons, links, inputs, selects, text, a
          separator, other groups. Name it with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">aria-label</code
          >: it is announced as a group.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Button Group or Toggle Group</h2>
        <p class="text-muted-foreground">
          A button group holds buttons that act: Tab goes to each. Buttons that
          toggle a state, one or several pressed at a time, are a Toggle Group;
          a row of controls moved between with the arrow keys is a Toolbar.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-orientation-button-group-demo-container />
        <app-size-button-group-demo-container />
        <app-nested-button-group-demo-container />
        <app-separator-button-group-demo-container />
        <app-split-button-group-demo-container />
        <app-input-button-group-demo-container />
        <app-text-button-group-demo-container />
        <app-input-group-button-group-demo-container />
        <app-dropdown-button-group-demo-container />
        <app-select-button-group-demo-container />
        <app-popover-button-group-demo-container />
        <app-rtl-button-group-demo-container />
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
export default class ButtonGroupPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScButtonGroup,',
      '  ScButtonGroupSeparator,',
      '  ScButtonGroupText,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scButtonGroup aria-label="…">',
      '  <label scButtonGroupText for="…">Text</label>',
      '  <input scInput id="…" />',
      '  <button scButton variant="outline">Button</button>',
      '  <div scButtonGroupSeparator></div>',
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
      name: 'ScButtonGroup',
      selector: 'div[scButtonGroup]',
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
      name: 'ScButtonGroupText',
      selector: 'div[scButtonGroupText], label[scButtonGroupText]',
      description:
        'Text beside the buttons. On a label, it names the input it is for.',
      inputs: [this.classRow],
    },
    {
      name: 'ScButtonGroupSeparator',
      selector: 'div[scButtonGroupSeparator]',
      description:
        'A line between two buttons of the same look (secondary ones: they have no border).',
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
