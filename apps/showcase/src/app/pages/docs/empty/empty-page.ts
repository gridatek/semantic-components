import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ActionsEmptyDemoContainer } from './demos/actions-empty-demo-container';
import { BasicEmptyDemoContainer } from './demos/basic-empty-demo-container';

@Component({
  selector: 'app-empty-page',
  imports: [
    BasicEmptyDemoContainer,
    ActionsEmptyDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Empty</h1>
        <p class="text-muted-foreground">
          A composable empty state component for displaying placeholder content.
        </p>
        <app-component-badges path="empty" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-empty-demo-container />
        <app-actions-empty-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmptyPage {}
