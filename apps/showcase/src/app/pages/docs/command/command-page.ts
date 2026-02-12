import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScCommandDemoContainer } from './demos/command-demo-container';
import { ScCommandDialogDemoContainer } from './demos/command-dialog-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-command-page',
  imports: [
    ScCommandDemoContainer,
    ScCommandDialogDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Command</h1>
        <p class="text-muted-foreground">
          A command palette for fast, keyboard-driven navigation and actions.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-command-demo-container />
        <app-command-dialog-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommandPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'command')!
    .status;
}
