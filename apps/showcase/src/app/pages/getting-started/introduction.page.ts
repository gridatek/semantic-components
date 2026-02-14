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
          The missing piece in the Angular world. Beautifully crafted UI
          components for modern Angular, built with Tailwind CSS on top of
          Angular Aria and Angular CDK.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          What is Semantic Components?
        </h2>
        <p class="text-muted-foreground">
          Semantic Components is an open-source UI library for Angular. It
          provides a set of semantic, declarative, and composable components
          that are accessible, customizable, and built on top of Angular Aria,
          Angular CDK, and Tailwind CSS.
        </p>
      </section>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Features</h2>
        <ul class="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong>Semantic</strong>
            — Components with meaningful names and intuitive APIs that make your
            templates read like documentation
          </li>
          <li>
            <strong>Declarative</strong>
            — Configure components through clean, readable templates instead of
            imperative code
          </li>
          <li>
            <strong>Composable</strong>
            — Mix and match small, focused components to build complex UIs that
            fit your needs
          </li>
          <li>
            <strong>Modern</strong>
            — Powered by signals, standalone components, control flow, and the
            latest Angular APIs
          </li>
          <li>
            <strong>Type Safe</strong>
            — Built with strict TypeScript for full type checking and
            autocompletion out of the box
          </li>
          <li>
            <strong>Accessible</strong>
            — Built with ARIA attributes, keyboard navigation, and screen reader
            support
          </li>
          <li>
            <strong>Tailwind CSS &amp; CVA</strong>
            — Styled with Tailwind CSS and class-variance-authority for
            consistent, customizable variants
          </li>
          <li>
            <strong>Tree-shakable</strong>
            — Optimized for production with only the components you use included
            in your bundle
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
