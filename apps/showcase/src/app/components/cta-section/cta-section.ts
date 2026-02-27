import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { cn, ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-cta-section',
  imports: [RouterLink, ScLink],
  template: `
    <section class="bg-muted/30 px-4 py-16 md:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl space-y-6 text-center">
        <h2 class="text-2xl font-bold md:text-3xl">Ready to get started?</h2>
        <p class="text-muted-foreground">
          Explore the docs, browse components, and start building.
        </p>
        <a scLink size="lg" routerLink="/docs/getting-started">
          Start Building Today
        </a>
      </div>
    </section>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSection {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
