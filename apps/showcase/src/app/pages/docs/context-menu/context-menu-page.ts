import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScContextMenuDemoContainer } from './demos/context-menu-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-context-menu-page',
  imports: [ScContextMenuDemoContainer, TocHeading, ComponentStatusBadge],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">ContextMenu</h1>
        <p class="text-muted-foreground">
          Displays a menu at the pointer position when triggered by a
          right-click.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-context-menu-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContextMenuPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'context-menu')!
    .status;
}
