import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicTransferListDemoContainer } from './demos/basic-transfer-list-demo-container';
import { NoSearchTransferListDemoContainer } from './demos/no-search-transfer-list-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-transfer-list-page',
  imports: [
    BasicTransferListDemoContainer,
    NoSearchTransferListDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Transfer List</h1>
        <p class="text-muted-foreground">
          Move items between two lists with search and selection controls.
        </p>
        <app-component-badges path="transfer-list" />
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
export default class TransferListPage {}
