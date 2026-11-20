import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCompareDemoContainer } from './demos/basic-compare-demo-container';
import { ContentCompareDemoContainer } from './demos/content-compare-demo-container';
import { HandleCompareDemoContainer } from './demos/handle-compare-demo-container';
import { HoverCompareDemoContainer } from './demos/hover-compare-demo-container';
import { VerticalCompareDemoContainer } from './demos/vertical-compare-demo-container';

@Component({
  selector: 'app-compare-page',
  imports: [
    ScKbd,
    BasicCompareDemoContainer,
    VerticalCompareDemoContainer,
    HoverCompareDemoContainer,
    HandleCompareDemoContainer,
    ContentCompareDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Compare</h1>
        <p class="text-muted-foreground">
          Two things compared, one over the other, split by a divider you drag:
          photos before and after an edit, two themes, two versions — any
          content.
        </p>
        <app-component-badges path="compare" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Basic</h2>
        <p>
          Two photos, before and after an edit. Drag the divider, click anywhere
          to move it there, or focus it: the arrows move it (<kbd scKbd
            >Shift</kbd
          >: by 10), <kbd scKbd>Home</kbd> and <kbd scKbd>End</kbd> to the ends.
          The labels fade while the divider covers them.
        </p>
        <app-basic-compare-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Vertical</h2>
        <p>Top and bottom.</p>
        <app-vertical-compare-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Hover</h2>
        <p>
          With
          <code scTypeset>hover</code>, the divider follows the pointer.
        </p>
        <app-hover-compare-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Handle only</h2>
        <p>
          With
          <code scTypeset>handleOnly</code>, only the handle drags — a page can
          scroll over the rest.
          <code scTypeset>bounds</code>
          keeps it off the edges;
          <code scTypeset>position</code>
          is two-way; the handle is restyled from its class.
        </p>
        <app-handle-compare-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Any content</h2>
        <p>
          Before and after are any content, not only images: the same card in
          the light and the dark theme.
        </p>
        <app-content-compare-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ComparePage {}
