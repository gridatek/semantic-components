import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicTransferListDemoContainer } from './demos/basic-transfer-list-demo-container';
import { NoSearchTransferListDemoContainer } from './demos/no-search-transfer-list-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-transfer-list-page',
  imports: [
    BasicTransferListDemoContainer,
    NoSearchTransferListDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Transfer List</h1>
        <p class="text-muted-foreground">
          Move items between two lists with search and selection controls.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-transfer-list-demo-container />
        <app-no-search-transfer-list-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TransferListPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'transfer-list')!
    .status;
}
