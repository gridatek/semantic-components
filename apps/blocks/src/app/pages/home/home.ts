import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';
import { HeroSection } from '../../components/hero-section/hero-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, FeatureGrid],
  template: `
    <app-hero-section />

    <app-feature-grid />

    <!-- CTA Section -->
    <section class="bg-muted/30 px-4 py-16 md:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl space-y-6 px-4 text-center md:px-6 lg:px-8">
        <h2 class="text-2xl font-bold md:text-3xl">Ready to get started?</h2>
        <p class="text-muted-foreground">
          Join thousands of developers building with our component library.
        </p>
        <button
          class="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 text-sm font-medium"
        >
          Start Building Today
        </button>
      </div>
    </section>
  `,
  host: {
    'data-slot': 'home-page',
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {}
