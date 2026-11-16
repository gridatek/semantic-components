import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicIntersectionObserverDemoContainer } from './demos/basic-intersection-observer-demo-container';
import { OnceIntersectionObserverDemoContainer } from './demos/once-intersection-observer-demo-container';

@Component({
  selector: 'app-intersection-observer-page',
  imports: [
    BasicIntersectionObserverDemoContainer,
    OnceIntersectionObserverDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Intersection Observer</h1>
        <p class="text-muted-foreground">
          A signal-based directive that tracks when an element enters or leaves
          the viewport or a scroll container.
        </p>
        <app-component-badges path="intersection-observer" />
      </div>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-basic-intersection-observer-demo-container />
        <app-once-intersection-observer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class IntersectionObserverPage {}
