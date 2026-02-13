import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-introduction-page',
  imports: [TocHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Introduction</h1>
        <p class="text-muted-foreground">
          A collection of beautifully designed, accessible, and reusable
          components built with Angular and Tailwind CSS.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          What is Semantic Components?
        </h2>
        <p class="text-muted-foreground">
          Semantic Components is an open-source UI library for Angular inspired
          by shadcn/ui. It provides a set of high-quality components that are
          accessible, customizable, and built on top of Angular ARIA and
          Tailwind CSS.
        </p>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Features</h2>
        <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Built with Angular signals and modern Angular APIs</li>
          <li>Styled with Tailwind CSS and fully customizable themes</li>
          <li>Accessible by default with Angular ARIA</li>
          <li>Tree-shakable and optimized for production</li>
          <li>
            Multiple packages for different needs: core UI, carousel, editor,
            and code components
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Packages</h2>
        <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong>&#64;semantic-components/ui</strong>
            — Core components like Button and Link
          </li>
          <li>
            <strong>&#64;semantic-components/ui-lab</strong>
            — Extended component library with 90+ components
          </li>
          <li>
            <strong>&#64;semantic-components/carousel</strong>
            — Carousel powered by Embla Carousel
          </li>
          <li>
            <strong>&#64;semantic-components/editor</strong>
            — Rich text editor powered by Tiptap
          </li>
          <li>
            <strong>&#64;semantic-components/code</strong>
            — Code viewer and editor powered by Shiki
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IntroductionPage {}
