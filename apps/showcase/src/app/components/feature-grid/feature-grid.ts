import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiAccessibilityIcon,
  SiCodeXmlIcon,
  SiGrid2x2Icon,
  SiLayoutIcon,
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
    SiLayoutIcon,
    SiMoonIcon,
  ],
  template: `
    <section class="py-16 px-4 md:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-12">
          Features
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-code-xml-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Semantic</h3>
            <p class="text-muted-foreground">
              Components with meaningful names and intuitive APIs that make your
              templates read like documentation.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-notebook-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Declarative</h3>
            <p class="text-muted-foreground">
              Configure components through clean, readable templates instead of
              imperative code.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-grid-2x2-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Composable</h3>
            <p class="text-muted-foreground">
              Mix and match small, focused components to build complex UIs that
              fit your needs.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-sparkles-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Modern</h3>
            <p class="text-muted-foreground">
              Powered by signals, standalone components, control flow, and the
              latest Angular APIs.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-terminal-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Type Safe</h3>
            <p class="text-muted-foreground">
              Built with strict TypeScript for full type checking and
              autocompletion out of the box.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-accessibility-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Accessible</h3>
            <p class="text-muted-foreground">
              Built with ARIA attributes, keyboard navigation, and screen reader
              support.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-tag-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Tailwind CSS & CVA</h3>
            <p class="text-muted-foreground">
              Styled with Tailwind CSS and class-variance-authority for
              consistent, customizable variants.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-layout-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Responsive Design</h3>
            <p class="text-muted-foreground">
              Automatically adapts between desktop and mobile layouts with
              smooth transitions.
            </p>
          </div>
          <div class="p-6 rounded-lg border bg-card">
            <div
              class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
            >
              <svg
                si-moon-icon
                class="size-6 text-primary"
                aria-hidden="true"
              ></svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Dark Mode Ready</h3>
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
