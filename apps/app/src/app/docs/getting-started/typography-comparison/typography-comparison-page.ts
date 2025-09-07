import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-typography-comparison-page',
  imports: [ScHeading],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <h1 class="text-4xl font-bold text-center mb-8" sc-heading level="1">
        Typography Comparison: shadcn/ui vs Prose
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- shadcn/ui Typography Column -->
        <div class="border rounded-lg p-6">
          <h2
            class="text-2xl font-bold mb-6 text-center bg-blue-50 dark:bg-blue-950 p-3 rounded"
            sc-heading
            level="2"
          >
            shadcn/ui Typography
          </h2>

          <!-- Headings -->
          <section class="mb-8">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Headings</h3>
            <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
              Heading 1
            </h1>
            <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-2">
              Heading 2
            </h2>
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">Heading 3</h3>
            <h4 class="scroll-m-20 text-xl font-semibold tracking-tight mb-2">Heading 4</h4>
          </section>

          <!-- Paragraphs -->
          <section class="mb-8">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Paragraphs</h3>
            <p class="leading-7 [&:not(:first-child)]:mt-6">
              This is a standard paragraph with leading-7 for optimal readability. The text flows
              naturally with proper spacing.
            </p>
            <p class="leading-7 [&:not(:first-child)]:mt-6">
              This is another paragraph demonstrating the spacing between multiple paragraphs in the
              shadcn/ui system.
            </p>
            <p class="text-xl text-muted-foreground leading-7 [&:not(:first-child)]:mt-6">
              This is a lead paragraph with larger text and muted color, perfect for introductions.
            </p>
          </section>

          <!-- Lists -->
          <section class="mb-8">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Lists</h3>
            <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
              <li>First list item with proper spacing</li>
              <li>Second item showing consistency</li>
              <li>Third item demonstrating hierarchy</li>
            </ul>
            <ol class="my-6 ml-6 list-decimal [&>li]:mt-2">
              <li>Ordered list first item</li>
              <li>Second numbered item</li>
              <li>Third in sequence</li>
            </ol>
          </section>

          <!-- Blockquote -->
          <section class="mb-8">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Blockquote</h3>
            <blockquote class="mt-6 border-l-2 pl-6 italic">
              "The best design is the simplest one that works."
            </blockquote>
          </section>

          <!-- Code -->
          <section class="mb-8">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Code</h3>
            <p class="leading-7">
              Use
              <code
                class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
              >
                npm install
              </code>
              to install packages.
            </p>
          </section>

          <!-- Table -->
          <section class="mb-8">
            <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Table</h3>
            <div class="my-6 w-full overflow-y-auto">
              <table class="w-full">
                <thead>
                  <tr class="m-0 border-t p-0 even:bg-muted">
                    <th
                      class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      Component
                    </th>
                    <th
                      class="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="m-0 border-t p-0 even:bg-muted">
                    <td
                      class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      Button
                    </td>
                    <td
                      class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      Complete
                    </td>
                  </tr>
                  <tr class="m-0 border-t p-0 even:bg-muted">
                    <td
                      class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      Input
                    </td>
                    <td
                      class="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                    >
                      In Progress
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- Prose Typography Column -->
        <div class="border rounded-lg p-6">
          <h2
            class="text-2xl font-bold mb-6 text-center bg-green-50 dark:bg-green-950 p-3 rounded"
            sc-heading
            level="2"
          >
            Prose Typography
          </h2>

          <div class="prose max-w-none">
            <!-- Headings -->
            <h3>Headings</h3>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>

            <!-- Paragraphs -->
            <h3>Paragraphs</h3>
            <p>
              This is a standard paragraph using the prose utility class. The prose system
              automatically handles spacing, typography, and hierarchy.
            </p>
            <p>
              This is another paragraph demonstrating the automatic spacing that prose provides
              between elements without manual classes.
            </p>
            <p data-lead>
              This is a lead paragraph using the data-lead attribute, styled automatically by the
              prose system.
            </p>

            <!-- Lists -->
            <h3>Lists</h3>
            <ul>
              <li>First list item with prose styling</li>
              <li>Second item with consistent spacing</li>
              <li>Third item showing automatic hierarchy</li>
            </ul>
            <ol>
              <li>Ordered list first item</li>
              <li>Second numbered item</li>
              <li>Third in sequence</li>
            </ol>

            <!-- Blockquote -->
            <h3>Blockquote</h3>
            <blockquote>"The best design is the simplest one that works."</blockquote>

            <!-- Code -->
            <h3>Code</h3>
            <p>
              Use
              <code>npm install</code>
              to install packages.
            </p>

            <!-- Table -->
            <h3>Table</h3>
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Button</td>
                  <td>Complete</td>
                </tr>
                <tr>
                  <td>Input</td>
                  <td>In Progress</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="mt-12 p-6 bg-muted/50 rounded-lg">
        <h2 class="text-2xl font-bold mb-4" sc-heading level="2">Key Differences</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
              shadcn/ui Typography
            </h3>
            <ul class="space-y-2 text-sm">
              <li>• Manual utility classes for each element</li>
              <li>• Precise control over individual elements</li>
              <li>• Consistent with shadcn/ui design system</li>
              <li>• Requires explicit spacing and sizing</li>
              <li>• More verbose HTML markup</li>
              <li>• Perfect for custom component design</li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">
              Prose Typography
            </h3>
            <ul class="space-y-2 text-sm">
              <li>• Automatic styling with single class</li>
              <li>• Consistent typography hierarchy</li>
              <li>• Perfect for content-heavy pages</li>
              <li>• Minimal HTML markup required</li>
              <li>• Responsive size variants built-in</li>
              <li>• Ideal for blog posts and articles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypographyComparisonPage {}
