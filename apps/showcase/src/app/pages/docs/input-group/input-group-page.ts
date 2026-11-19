import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ApiTable } from '../../../components/api-table/api-table';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BlockEndInputGroupDemoContainer } from './demos/block-end-input-group-demo-container';
import { BlockStartInputGroupDemoContainer } from './demos/block-start-input-group-demo-container';
import { ButtonInputGroupDemoContainer } from './demos/button-input-group-demo-container';
import { CustomInputGroupDemoContainer } from './demos/custom-input-group-demo-container';
import { DisabledInputGroupDemoContainer } from './demos/disabled-input-group-demo-container';
import { DropdownInputGroupDemoContainer } from './demos/dropdown-input-group-demo-container';
import { IconInputGroupDemoContainer } from './demos/icon-input-group-demo-container';
import { InlineEndInputGroupDemoContainer } from './demos/inline-end-input-group-demo-container';
import { InlineStartInputGroupDemoContainer } from './demos/inline-start-input-group-demo-container';
import { InputGroupUsageDemoContainer } from './demos/input-group-usage-demo-container';
import { KbdInputGroupDemoContainer } from './demos/kbd-input-group-demo-container';
import { RtlInputGroupDemoContainer } from './demos/rtl-input-group-demo-container';
import { SpinnerInputGroupDemoContainer } from './demos/spinner-input-group-demo-container';
import { TextInputGroupDemoContainer } from './demos/text-input-group-demo-container';
import { TextareaInputGroupDemoContainer } from './demos/textarea-input-group-demo-container';

interface ScApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-input-group-page',
  imports: [
    ApiTable,
    Anatomy,
    InputGroupUsageDemoContainer,
    InlineStartInputGroupDemoContainer,
    InlineEndInputGroupDemoContainer,
    BlockStartInputGroupDemoContainer,
    BlockEndInputGroupDemoContainer,
    IconInputGroupDemoContainer,
    TextInputGroupDemoContainer,
    ButtonInputGroupDemoContainer,
    KbdInputGroupDemoContainer,
    DropdownInputGroupDemoContainer,
    SpinnerInputGroupDemoContainer,
    TextareaInputGroupDemoContainer,
    CustomInputGroupDemoContainer,
    DisabledInputGroupDemoContainer,
    RtlInputGroupDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Input Group</h1>
        <p class="text-muted-foreground">
          An input or a textarea with icons, text and buttons in one box: beside
          it, above or below. In the look of the app&apos;s style; a click on an
          addon focuses the field. To join a field with buttons outside its box,
          use a Control Group.
        </p>
        <app-component-badges path="input-group" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-input-group-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          The group on a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">div</code>, the
          control in it (
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">scInput</code>,
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">scTextarea</code
          >, or one of yours with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >data-slot="control"</code
          >), then its addons: written after the control, so Tab reaches the
          control first;
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">align</code>
          sets where they show.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-inline-start-input-group-demo-container />
        <app-inline-end-input-group-demo-container />
        <app-block-start-input-group-demo-container />
        <app-block-end-input-group-demo-container />
        <app-icon-input-group-demo-container />
        <app-text-input-group-demo-container />
        <app-button-input-group-demo-container />
        <app-kbd-input-group-demo-container />
        <app-dropdown-input-group-demo-container />
        <app-spinner-input-group-demo-container />
        <app-textarea-input-group-demo-container />
        <app-custom-input-group-demo-container />
        <app-disabled-input-group-demo-container />
        <app-rtl-input-group-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        @for (part of parts; track part.name) {
          <h3 class="font-heading text-base font-medium">
            {{ part.name }} —
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">{{
              part.selector
            }}</code>
          </h3>
          <p class="text-muted-foreground">{{ part.description }}</p>
          <app-api-table
            [label]="part.name + ' inputs'"
            [inputs]="part.inputs"
          />
        }
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class InputGroupPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScInputGroup,',
      '  ScInputGroupAddon,',
      '  ScInputGroupButton,',
      '  ScInputGroupText,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scInputGroup>',
      '  <input scInput aria-label="…" />',
      '  <div scInputGroupAddon>',
      '    <svg></svg>',
      '  </div>',
      '  <div scInputGroupAddon side="inline-end">',
      '    <span scInputGroupText>Text</span>',
      '    <button scInputGroupButton>Button</button>',
      '  </div>',
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
      name: 'ScInputGroup',
      selector: 'div[scInputGroup]',
      description:
        'The box: role="group", the border, the ring when its control has focus, red when it is invalid. It gives its control the look of being inside.',
      inputs: [this.classRow],
    },
    {
      name: 'ScInputGroupAddon',
      selector: 'div[scInputGroupAddon]',
      description:
        'Icons, text or buttons beside the control. A click on it, not on its buttons, focuses the control.',
      inputs: [
        {
          name: 'side',
          type: "'inline-start' | 'inline-end' | 'top' | 'bottom'",
          default: "'inline-start'",
          description:
            "Its side of the control: before or after it (an input; logical: inline-start is the reading start, flipped right to left), above or below it (a textarea). shadcn's align, with top / bottom for its block-start / block-end.",
        },
        this.classRow,
      ],
    },
    {
      name: 'ScInputGroupButton',
      selector: 'button[scInputGroupButton]',
      description:
        'A button in an addon: the style’s button, sized for the group; type "button".',
      inputs: [
        {
          name: 'variant',
          type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'",
          default: "'ghost'",
          description: 'Its look: the button’s variants.',
        },
        {
          name: 'size',
          type: "'xs' | 'sm' | 'icon-xs' | 'icon-sm'",
          default: "'xs'",
          description: 'Its size in the group.',
        },
        {
          name: 'type',
          type: "'button' | 'submit' | 'reset'",
          default: "'button'",
          description: 'In a form, only a submit button submits it.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Sets the native disabled and aria-disabled.',
        },
        this.classRow,
      ],
    },
    {
      name: 'ScInputGroupText',
      selector: 'span[scInputGroupText]',
      description: 'Text in an addon, with its icons.',
      inputs: [this.classRow],
    },
  ];
}
