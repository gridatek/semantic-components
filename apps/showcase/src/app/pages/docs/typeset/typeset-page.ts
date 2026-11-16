import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { HeadingsTypesetDemoContainer } from './demos/headings-typeset-demo-container';

@Component({
  selector: 'app-typeset-page',
  imports: [
    HeadingsTypesetDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Typeset</h1>
        <p class="text-muted-foreground">
          Styles for headings, paragraphs, lists, and other text elements.
        </p>
        <app-component-badges path="typeset" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-headings-typeset-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class TypesetPage {}
