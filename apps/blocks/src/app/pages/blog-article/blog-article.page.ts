import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-blog-article',
  imports: [
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScSeparator,
  ],
  host: { class: 'block' },
  template: `
    <div class="bg-background min-h-screen">
      <div class="mx-auto max-w-3xl px-6 py-12">
        <!-- Back link -->
        <a
          routerLink="/blog"
          class="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1 text-sm transition-colors"
        >
          &larr; Back to Blog
        </a>

        <!-- Article Header -->
        <header class="mt-6 space-y-4">
          <h1 class="text-4xl font-bold tracking-tight">
            Getting Started with Angular Signals
          </h1>

          <div class="flex items-center gap-4">
            <span scAvatar>
              <span scAvatarFallback>JS</span>
            </span>
            <div class="space-y-1">
              <p class="text-sm leading-none font-medium">Jane Smith</p>
              <p class="text-muted-foreground text-sm">January 15, 2026</p>
            </div>
            <span scBadge variant="secondary" class="ml-auto">Tutorial</span>
          </div>
        </header>

        <div scSeparator class="my-8"></div>

        <!-- Article Body -->
        <article class="space-y-6 text-base leading-relaxed">
          <p>
            Angular Signals represent a fundamental shift in how we manage
            reactivity in Angular applications. Introduced as a developer
            preview in Angular 16 and stabilized in Angular 17, signals provide
            a fine-grained reactivity system that makes state management more
            predictable and performant.
          </p>

          <p>
            Unlike the traditional zone-based change detection that Angular has
            relied on since its inception, signals allow the framework to know
            exactly which parts of the UI need to be updated when state changes.
            This eliminates unnecessary re-renders and leads to better
            performance out of the box.
          </p>

          <h2 class="text-2xl font-semibold tracking-tight">Why Signals?</h2>

          <p>
            The primary motivation behind signals is to provide a simpler, more
            efficient way to handle reactive state. With traditional change
            detection, Angular had to check the entire component tree to
            determine what changed. Signals flip this model by allowing
            components to subscribe to only the state they care about.
          </p>

          <p>
            Signals also integrate seamlessly with computed values and effects,
            creating a coherent reactivity graph that is easy to reason about.
            Here is a simple example of how signals work:
          </p>

          <pre
            class="bg-muted overflow-x-auto rounded-lg p-4 font-mono text-sm"
            >{{ codeExample }}</pre
          >

          <h2 class="text-2xl font-semibold tracking-tight">Getting Started</h2>

          <p>
            To start using signals in your Angular application, you need to
            import the signal function from the core package. Signals can hold
            any type of value, from primitives to complex objects and arrays.
            The key is to use
            <code class="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
              signal()
            </code>
            for mutable state and
            <code class="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
              computed()
            </code>
            for derived state.
          </p>

          <p>
            When you need to perform side effects in response to signal changes,
            use the
            <code class="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
              effect()
            </code>
            function. Effects automatically track which signals they depend on
            and re-run whenever those signals change. This makes it easy to
            synchronize state with external systems like local storage or APIs.
          </p>

          <p>
            As you build more complex applications, you will find that signals
            compose naturally. Computed signals can depend on other computed
            signals, forming a reactive graph that updates efficiently. Combined
            with Angular's input signals and model signals, you have a complete
            toolkit for building reactive, performant applications.
          </p>
        </article>

        <div scSeparator class="my-8"></div>

        <!-- Author Bio -->
        <div scCard>
          <div scCardBody>
            <div class="flex items-center gap-4">
              <span scAvatar size="lg">
                <span scAvatarFallback>JS</span>
              </span>
              <div class="space-y-1">
                <p class="text-sm font-medium">Jane Smith</p>
                <p class="text-muted-foreground text-sm">
                  Angular developer and open-source contributor. Writing about
                  modern web development, signals, and reactive patterns.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <section class="mt-12 space-y-6">
          <h2 class="text-2xl font-semibold tracking-tight">
            Related Articles
          </h2>

          <div class="grid gap-6 sm:grid-cols-2">
            <a routerLink="/blog/getting-started" class="no-underline">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Understanding Reactive Patterns</h3>
                </div>
                <div scCardBody>
                  <p class="text-muted-foreground text-sm">
                    A deep dive into reactive programming patterns and how they
                    apply to modern Angular development.
                  </p>
                </div>
              </div>
            </a>

            <a routerLink="/blog/getting-started" class="no-underline">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Signal-Based Components</h3>
                </div>
                <div scCardBody>
                  <p class="text-muted-foreground text-sm">
                    Learn how to build fully signal-based components using input
                    signals, model signals, and output functions.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogArticlePage {
  readonly codeExample = `import { signal, computed } from '@angular/core';

// Create a writable signal
const count = signal(0);

// Create a computed signal
const doubled = computed(() => count() * 2);

// Update the signal
count.set(1);
console.log(doubled()); // 2

count.update(value => value + 1);
console.log(doubled()); // 4`;
}
