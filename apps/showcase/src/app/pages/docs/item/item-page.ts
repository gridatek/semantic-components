import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicItemDemoContainer } from './demos/basic-item-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-item-page',
  imports: [BasicItemDemoContainer, TocHeading, ComponentBadges],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Item</h1>
        <p class="text-muted-foreground">
          A flexible layout component for displaying structured content with
          media, titles, descriptions, and actions.
        </p>
        <app-component-badges path="item" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-item-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemPage {}
