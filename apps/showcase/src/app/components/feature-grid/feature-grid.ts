import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiAccessibilityIcon,
  SiCodeXmlIcon,
  SiGrid2x2Icon,
  SiLayoutGridIcon,
  SiMoonIcon,
  SiNotebookIcon,
  SiSparklesIcon,
  SiTagIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-feature-grid',
  imports: [
    SiCodeXmlIcon,
    SiNotebookIcon,
    SiGrid2x2Icon,
    SiSparklesIcon,
    SiTerminalIcon,
    SiAccessibilityIcon,
    SiTagIcon,
    SiLayoutGridIcon,
    SiMoonIcon,
  ],
  template: `
    <section class="px-4 py-16 md:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <h2 class="mb-12 text-center text-2xl font-bold md:text-3xl">
          Features
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siCodeXmlIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Semantic</h3>
            <p class="text-muted-foreground">
              Components with meaningful names and intuitive APIs that make your
              templates read like documentation.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siNotebookIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Declarative</h3>
            <p class="text-muted-foreground">
              Configure components through clean, readable templates instead of
              imperative code.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siGrid2x2Icon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Composable</h3>
            <p class="text-muted-foreground">
              Mix and match small, focused components to build complex UIs that
              fit your needs.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siSparklesIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Modern</h3>
            <p class="text-muted-foreground">
              Powered by signals, standalone components, control flow, and the
              latest Angular APIs.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siTerminalIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Type Safe</h3>
            <p class="text-muted-foreground">
              Built with strict TypeScript for full type checking and
              autocompletion out of the box.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siAccessibilityIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Accessible</h3>
            <p class="text-muted-foreground">
              Built with ARIA attributes, keyboard navigation, and screen reader
              support.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siTagIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Tailwind CSS & CVA</h3>
            <p class="text-muted-foreground">
              Styled with Tailwind CSS and class-variance-authority for
              consistent, customizable variants.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siLayoutGridIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Responsive Design</h3>
            <p class="text-muted-foreground">
              Automatically adapts between desktop and mobile layouts with
              smooth transitions.
            </p>
          </div>
          <div class="bg-card rounded-lg border p-6">
            <div
              class="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
            >
              <svg
                siMoonIcon
                class="text-primary size-6"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="mb-2 text-lg font-semibold">Dark Mode Ready</h3>
            <p class="text-muted-foreground">
              Seamlessly supports light and dark themes with CSS variables.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGrid {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
