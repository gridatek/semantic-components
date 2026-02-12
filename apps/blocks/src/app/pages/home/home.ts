import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';

@Component({
  selector: 'app-home',
  imports: [HeroSection, FeatureGrid],
  template: `
    <app-hero-section />

    <app-feature-grid />

    <!-- CTA Section -->
    <section class="py-16 px-4 md:px-6 lg:px-8 bg-muted/30">
      <div class="max-w-4xl px-4 md:px-6 lg:px-8 mx-auto text-center space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold">Ready to get started?</h2>
        <p class="text-muted-foreground">
          Join thousands of developers building with our component library.
        </p>
        <button
          class="h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
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
