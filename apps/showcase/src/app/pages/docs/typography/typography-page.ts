import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HeadingsTypographyDemoContainer } from './demos/headings-typography-demo-container';
import { UnderlineTypographyDemoContainer } from './demos/underline-typography-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-typography-page',
  imports: [
    HeadingsTypographyDemoContainer,
    UnderlineTypographyDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Typography</h1>
        <p class="text-muted-foreground">
          Styles for headings, paragraphs, lists, and other text elements.
        </p>
        <app-component-badges path="typography" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-headings-typography-demo-container />
        <app-underline-typography-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypographyPage {}
