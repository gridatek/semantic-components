import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HeadingsTypographyDemoContainer } from './demos/headings-typography-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-typography-page',
  imports: [HeadingsTypographyDemoContainer, TocHeading, ComponentBadges],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Typography</h1>
        <p class="text-muted-foreground">
          Styles for headings, paragraphs, lists, and other text elements.
        </p>
        <app-component-badges path="typography" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-headings-typography-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypographyPage {}
