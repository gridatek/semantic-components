import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScLink, cn } from '@semantic-components/ui';

@Component({
  selector: 'app-cta-section',
  imports: [RouterLink, ScLink],
  template: `
    <section
      class="bg-muted/30 border-border/60 border-t px-4 py-24 md:px-6 md:py-32 lg:px-8"
    >
      <div class="mx-auto max-w-3xl space-y-8 text-center">
        <h2
          class="text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
        >
          Ready to get started?
        </h2>
        <p
          class="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed text-pretty"
        >
          Explore the docs, browse components, and start building.
        </p>
        <div class="pt-2">
          <a scLink size="lg" routerLink="/docs/getting-started">
            Start Building Today
          </a>
        </div>
      </div>
    </section>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class CtaSection {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
