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
import { AvatarItemDemoContainer } from './demos/avatar-item-demo-container';
import { DropdownItemDemoContainer } from './demos/dropdown-item-demo-container';
import { GroupItemDemoContainer } from './demos/group-item-demo-container';
import { HeaderItemDemoContainer } from './demos/header-item-demo-container';
import { IconItemDemoContainer } from './demos/icon-item-demo-container';
import { ImageItemDemoContainer } from './demos/image-item-demo-container';
import { ItemUsageDemoContainer } from './demos/item-usage-demo-container';
import { LinkItemDemoContainer } from './demos/link-item-demo-container';
import { RtlItemDemoContainer } from './demos/rtl-item-demo-container';
import { SizeItemDemoContainer } from './demos/size-item-demo-container';
import { VariantItemDemoContainer } from './demos/variant-item-demo-container';

@Component({
  selector: 'app-item-page',
  imports: [
    Anatomy,
    ItemUsageDemoContainer,
    VariantItemDemoContainer,
    SizeItemDemoContainer,
    IconItemDemoContainer,
    AvatarItemDemoContainer,
    ImageItemDemoContainer,
    GroupItemDemoContainer,
    HeaderItemDemoContainer,
    LinkItemDemoContainer,
    DropdownItemDemoContainer,
    RtlItemDemoContainer,
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
        <h1 scHeading>Item</h1>
        <p class="text-muted-foreground">
          A row of content: media, a title and a description, actions. In the
          look of the app&apos;s preset.
        </p>
        <app-component-badges path="item" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-item-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element — an item on a div, a link
          or a button; the media, the words and the actions are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            An item is layout. When items are a list, say so:
            role=&quot;list&quot; on the group, role=&quot;listitem&quot; on
            each item.
          </li>
          <li>
            On a link or a button the whole item does what it says, named by its
            text — to a new tab, say so in sr-only text.
          </li>
          <li>Name icon-only actions in sr-only text.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-variant-item-demo-container />
        <app-size-item-demo-container />
        <app-icon-item-demo-container />
        <app-avatar-item-demo-container />
        <app-image-item-demo-container />
        <app-group-item-demo-container />
        <app-header-item-demo-container />
        <app-link-item-demo-container />
        <app-dropdown-item-demo-container />
        <app-rtl-item-demo-container />
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
          aria-label="Item parts"
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
export default class ItemPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScItemGroup, ScItem, ScItemMedia, ScItemBody, ScItemTitle,',
      '  ScItemDescription, ScItemActions, ScItemHeader, ScItemFooter,',
      '  ScItemSeparator,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scItemGroup>',
      '  <div scItem variant="…" size="…">',
      '    <div scItemHeader>…</div>',
      '    <div scItemMedia variant="…">…</div>',
      '    <div scItemBody>',
      '      <div scItemTitle>…</div>',
      '      <p scItemDescription>…</p>',
      '    </div>',
      '    <div scItemActions>…</div>',
      '    <div scItemFooter>…</div>',
      '  </div>',
      '  <div scItemSeparator></div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScItemGroup, ScItemSeparator',
      selector: 'div[…]',
      description:
        'Items together (a list: role="list", and role="listitem" on the items); a line between them.',
    },
    {
      name: 'ScItem',
      selector: 'div[scItem], a[scItem], button[scItem]',
      description:
        "variant ('default', 'outline', 'muted'), size ('default', 'sm', 'xs'). On a link or a button, the whole item does it.",
    },
    {
      name: 'ScItemMedia',
      selector: 'div[scItemMedia]',
      description:
        "variant ('default', 'icon', 'image'): your icon, avatar or image.",
    },
    {
      name: 'ScItemBody, ScItemTitle, ScItemDescription',
      selector: 'div[…], p[scItemDescription]',
      description: 'The text: a title (one line) and a description (two).',
    },
    {
      name: 'ScItemActions, ScItemHeader, ScItemFooter',
      selector: 'div[…]',
      description:
        'Your buttons at the end; a row across the top or the bottom.',
    },
  ];
}
