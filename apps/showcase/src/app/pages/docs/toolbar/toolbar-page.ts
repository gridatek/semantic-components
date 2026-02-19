import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicToolbarDemoContainer } from './demos/basic-toolbar-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-toolbar-page',
  imports: [BasicToolbarDemoContainer, TocHeading, ComponentBadges],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Toolbar</h1>
        <p class="text-muted-foreground">
          A container for grouping a set of controls, such as toggle buttons.
          Built on top of
          <a
            href="https://angular.dev/api/aria/toolbar"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline underline-offset-4"
          >
            &#64;angular/aria/toolbar
          </a>
          .
        </p>
        <app-component-badges path="toolbar" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-toolbar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToolbarPage {}
