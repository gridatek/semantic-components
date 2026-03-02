import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ScContextMenuDemoContainer } from './demos/context-menu-demo-container';

@Component({
  selector: 'app-context-menu-page',
  imports: [ScContextMenuDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Context Menu</h1>
        <p class="text-muted-foreground">
          Displays a menu at the pointer position when triggered by a
          right-click.
        </p>
        <app-component-badges path="context-menu" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-context-menu-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContextMenuPage {}
