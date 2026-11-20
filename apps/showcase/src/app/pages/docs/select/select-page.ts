import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ApiTable } from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { DisabledSelectDemoContainer } from './demos/disabled-select-demo-container';
import { GroupsSelectDemoContainer } from './demos/groups-select-demo-container';
import { InvalidSelectDemoContainer } from './demos/invalid-select-demo-container';
import { RtlSelectDemoContainer } from './demos/rtl-select-demo-container';
import { ScrollableSelectDemoContainer } from './demos/scrollable-select-demo-container';
import { SelectUsageDemoContainer } from './demos/select-usage-demo-container';

interface ScApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-select-page',
  imports: [
    ScKbd,
    ApiTable,
    Anatomy,
    SelectUsageDemoContainer,
    GroupsSelectDemoContainer,
    ScrollableSelectDemoContainer,
    DisabledSelectDemoContainer,
    InvalidSelectDemoContainer,
    RtlSelectDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Select</h1>
        <p class="text-muted-foreground">
          A choice among a short list of options: a trigger showing the value,
          the options in a popup below it. In the look of the app&apos;s style,
          with Signal Forms. For a long list to filter, use a Combobox; for
          several values, a Multiselect.
        </p>
        <app-component-badges path="select" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-select-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          The select round its label and trigger; the popup in a template,
          rendered while it is open. Every part is a directive on your element;
          the icons are yours. It needs a name: its label, or
          <code scTypeset>aria-label</code>
          on the trigger.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Keyboard</h2>
        <p>
          Focus stays on the trigger. <kbd scKbd>Enter</kbd>,
          <kbd scKbd>Space</kbd> or the arrow keys open the list; the arrows,
          <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> move through it;
          <kbd scKbd>Enter</kbd> or <kbd scKbd>Space</kbd> selects;
          <kbd scKbd>Escape</kbd> closes; typing a letter goes to the first
          option that starts with it, open or closed.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-groups-select-demo-container />
        <app-scrollable-select-demo-container />
        <app-disabled-select-demo-container />
        <app-invalid-select-demo-container />
        <app-rtl-select-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        @for (part of parts; track part.name) {
          <h3 class="font-heading text-base font-medium">
            {{ part.name }} —
            <code scTypeset>{{ part.selector }}</code>
          </h3>
          <p>{{ part.description }}</p>
          @if (part.inputs.length) {
            <app-api-table
              [label]="part.name + ' inputs'"
              [inputs]="part.inputs"
            />
          }
        }
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SelectPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScSelect, ScSelectLabel, ScSelectTrigger,',
      '  ScSelectValue, ScSelectIcon, ScSelectPortal,',
      '  ScSelectPopup, ScSelectScrollUpButton, ScSelectList,',
      '  ScSelectGroup, ScSelectGroupLabel, ScSelectItem,',
      '  ScSelectItemText, ScSelectItemIndicator,',
      '  ScSelectSeparator, ScSelectScrollDownButton,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scSelect [formField]="form.fruit" [items]="fruits">',
      '  <div scSelectLabel>Label</div>',
      '  <div scSelectTrigger>',
      '    <span scSelectValue placeholder="…"></span>',
      '    <svg scSelectIcon></svg>',
      '  </div>',
      '  <ng-template scSelectPortal>',
      '    <div scSelectPopup>',
      '      <div scSelectScrollUpButton><svg></svg></div>',
      '      <div scSelectList>',
      '        <div scSelectGroup>',
      '          <div scSelectGroupLabel>Group</div>',
      '          <div scSelectItem value="…">',
      '            <span scSelectItemText>Item</span>',
      '            <span scSelectItemIndicator><svg></svg></span>',
      '          </div>',
      '        </div>',
      '        <div scSelectSeparator></div>',
      '      </div>',
      '      <div scSelectScrollDownButton><svg></svg></div>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly classRow: ScApiRow = {
    name: 'class',
    type: 'string',
    default: "''",
    description: 'Classes merged over the style (cn: a later class wins).',
  };

  private readonly parts = [
    {
      name: 'ScSelect',
      selector: 'div[scSelect]',
      description:
        'The select: its value, bound with [formField] or [(value)]. It sets the width (its content’s by default, or a class): the trigger fills it, the list matches the trigger. Its label above its trigger.',
      inputs: [
        {
          name: 'value',
          type: 'string',
          default: "''",
          description: 'The selected option’s value; empty: none.',
        },
        {
          name: 'items',
          type: '{ value: string; label: string }[]',
          default: '[]',
          description:
            'The options’ labels, to show the value before the list has first opened.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Not opened. With [formField], from the schema.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScSelectLabel',
      selector: 'div[scSelectLabel], label[scSelectLabel]',
      description:
        'Names the trigger and the list. A click on it focuses the trigger without opening the list.',
      inputs: [this.classRow],
    },
    {
      name: 'ScSelectTrigger',
      selector: 'div[scSelectTrigger], button[scSelectTrigger]',
      description:
        'The combobox showing the value. In a field, described by its description and errors.',
      inputs: [
        {
          name: 'size',
          type: "'default' | 'sm'",
          default: "'default'",
          description: 'Its height: 32 or 28 px.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScSelectValue',
      selector: 'span[scSelectValue]',
      description:
        'The selected option’s label, or the placeholder. Its content, if any, shows the value your way.',
      inputs: [
        {
          name: 'placeholder',
          type: 'string',
          default: "''",
          description: 'Shown while nothing is selected.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScSelectPopup',
      selector: 'div[scSelectPopup]',
      description:
        'The popup round the list, in the portal template; it scrolls between its scroll buttons.',
      inputs: [this.classRow],
    },
    {
      name: 'ScSelectItem',
      selector: 'div[scSelectItem]',
      description:
        'An option. Its label is label, or its text (for the value and type-ahead).',
      inputs: [
        {
          name: 'value',
          type: 'string',
          default: '—',
          description: 'Its value: the select’s when chosen.',
        },
        {
          name: 'label',
          type: 'string',
          default: 'its text',
          description: 'Its label.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Shown dimmed, skipped by the keyboard, not chosen.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScSelectGroup, ScSelectGroupLabel',
      selector: 'div[scSelectGroup], div[scSelectGroupLabel]',
      description: 'Options together: a group, named by its label.',
      inputs: [this.classRow],
    },
    {
      name: 'ScSelectScrollUpButton, ScSelectScrollDownButton',
      selector: 'div[scSelectScrollUpButton], div[scSelectScrollDownButton]',
      description:
        'Shown while there is more above or below; hovering scrolls. Hidden from screen readers.',
      inputs: [this.classRow],
    },
    {
      name: 'ScSelectIcon, ScSelectItemText, ScSelectItemIndicator, ScSelectSeparator, ScSelectList, ScSelectPortal',
      selector:
        'svg[scSelectIcon], span[scSelectItemText], span[scSelectItemIndicator], div[scSelectSeparator], div[scSelectList], ng-template[scSelectPortal]',
      description:
        'The chevron; an option’s label; the check, shown on the selected option; a line; the listbox; the popup’s template.',
      inputs: [this.classRow],
    },
  ];
}
