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
    <section class="py-16 px-4 md:px-6 lg:px-8 bg-muted/30">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold">Ready to get started?</h2>
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
