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
import { BasicBreadcrumbDemoContainer } from './demos/basic-breadcrumb-demo-container';
import { BreadcrumbUsageDemoContainer } from './demos/breadcrumb-usage-demo-container';
import { DropdownBreadcrumbDemoContainer } from './demos/dropdown-breadcrumb-demo-container';
import { EllipsisBreadcrumbDemoContainer } from './demos/ellipsis-breadcrumb-demo-container';
import { EllipsisMenuBreadcrumbDemoContainer } from './demos/ellipsis-menu-breadcrumb-demo-container';
import { LinkBreadcrumbDemoContainer } from './demos/link-breadcrumb-demo-container';
import { RtlBreadcrumbDemoContainer } from './demos/rtl-breadcrumb-demo-container';
import { SeparatorBreadcrumbDemoContainer } from './demos/separator-breadcrumb-demo-container';

@Component({
  selector: 'app-breadcrumb-page',
  imports: [
    Anatomy,
    BreadcrumbUsageDemoContainer,
    BasicBreadcrumbDemoContainer,
    SeparatorBreadcrumbDemoContainer,
    DropdownBreadcrumbDemoContainer,
    EllipsisBreadcrumbDemoContainer,
    EllipsisMenuBreadcrumbDemoContainer,
    LinkBreadcrumbDemoContainer,
    RtlBreadcrumbDemoContainer,
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
        <h1 scHeading>Breadcrumb</h1>
        <p class="text-muted-foreground">
          Where the page is, in the site: the pages above it as links, the page
          itself last. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="breadcrumb" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-breadcrumb-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element: a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">nav</code>
          named by you, an ordered list, the links and the separators as list
          items. The icons are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Notes</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Name the navigation (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >aria-label</code
            >), uniquely if the page has another.
          </li>
          <li>
            The current page is not a link:
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >aria-current="page"</code
            >, read as a link that goes nowhere.
          </li>
          <li>
            The separators and the ellipsis are hidden from screen readers: the
            list says the order.
          </li>
          <li>
            A separator&apos;s icon turns right to left: a chevron points the
            reading way (a slash or a dot looks the same).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-breadcrumb-demo-container />
        <app-separator-breadcrumb-demo-container />
        <app-dropdown-breadcrumb-demo-container />
        <app-ellipsis-breadcrumb-demo-container />
        <app-ellipsis-menu-breadcrumb-demo-container />
        <app-link-breadcrumb-demo-container />
        <app-rtl-breadcrumb-demo-container />
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
          aria-label="Breadcrumb parts"
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
export default class BreadcrumbPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScBreadcrumb, ScBreadcrumbList, ScBreadcrumbItem, ScBreadcrumbLink,',
      '  ScBreadcrumbSeparator, ScBreadcrumbEllipsis, ScBreadcrumbPage,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<nav scBreadcrumb aria-label="…">',
      '  <ol scBreadcrumbList>',
      '    <li scBreadcrumbItem><a scBreadcrumbLink routerLink="…">…</a></li>',
      '    <li scBreadcrumbSeparator><svg></svg></li>',
      '    <li scBreadcrumbItem>',
      '      <span scBreadcrumbEllipsis><svg></svg></span>',
      '    </li>',
      '    <li scBreadcrumbSeparator><svg></svg></li>',
      '    <li scBreadcrumbItem><span scBreadcrumbPage>…</span></li>',
      '  </ol>',
      '</nav>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScBreadcrumb',
      selector: 'nav[scBreadcrumb]',
      description: 'The navigation; its name is yours (aria-label).',
    },
    {
      name: 'ScBreadcrumbList',
      selector: 'ol[scBreadcrumbList]',
      description: 'The ordered list, wrapping on a narrow screen.',
    },
    {
      name: 'ScBreadcrumbItem',
      selector: 'li[scBreadcrumbItem]',
      description: 'A step: a link, the page, the ellipsis or a menu.',
    },
    {
      name: 'ScBreadcrumbLink',
      selector: 'a[scBreadcrumbLink]',
      description: 'A page above: your href or routerLink.',
    },
    {
      name: 'ScBreadcrumbPage',
      selector: 'span[scBreadcrumbPage]',
      description: 'The current page: aria-current="page", not a link.',
    },
    {
      name: 'ScBreadcrumbSeparator',
      selector: 'li[scBreadcrumbSeparator]',
      description:
        'Between steps: your icon, turned right to left; hidden from screen readers.',
    },
    {
      name: 'ScBreadcrumbEllipsis',
      selector: 'span[scBreadcrumbEllipsis]',
      description: 'Steps left out; hidden from screen readers.',
    },
  ];
}
