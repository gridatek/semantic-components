import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicTableDemoContainer from './demos/basic-table-demo-container';
import CaptionTableDemoContainer from './demos/caption-table-demo-container';
import FooterTableDemoContainer from './demos/footer-table-demo-container';
import { TableUsageDemoContainer } from './demos/table-usage-demo-container';
import UsersTableDemoContainer from './demos/users-table-demo-container';

@Component({
  selector: 'app-table-page',
  imports: [
    BasicTableDemoContainer,
    CaptionTableDemoContainer,
    FooterTableDemoContainer,
    UsersTableDemoContainer,
    TableUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Table</h1>
        <p class="text-muted-foreground">A responsive table component.</p>
        <app-component-badges path="table" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-table-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-table-demo-container />
        <app-caption-table-demo-container />
        <app-footer-table-demo-container />
        <app-users-table-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TablePage {}
