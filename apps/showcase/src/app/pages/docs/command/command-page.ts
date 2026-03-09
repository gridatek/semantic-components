import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ScCommandDemoContainer } from './demos/command-demo-container';
import { ScCommandDialogDemoContainer } from './demos/command-dialog-demo-container';

@Component({
  selector: 'app-command-page',
  imports: [
    ScCommandDemoContainer,
    ScCommandDialogDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Command</h1>
        <p class="text-muted-foreground">
          A command palette for fast, keyboard-driven navigation and actions.
        </p>
        <app-component-badges path="command" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-command-demo-container />
        <app-command-dialog-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommandPage {}
