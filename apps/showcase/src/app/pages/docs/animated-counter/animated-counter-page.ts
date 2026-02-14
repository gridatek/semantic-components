import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicAnimatedCounterDemoContainer } from './demos/basic-animated-counter-demo-container';
import { EasingAnimatedCounterDemoContainer } from './demos/easing-animated-counter-demo-container';
import { PrefixAnimatedCounterDemoContainer } from './demos/prefix-animated-counter-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-animated-counter-page',
  imports: [
    BasicAnimatedCounterDemoContainer,
    EasingAnimatedCounterDemoContainer,
    PrefixAnimatedCounterDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">AnimatedCounter</h1>
        <p class="text-muted-foreground">A animated counter component.</p>
        <app-component-badges path="animated-counter" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-animated-counter-demo-container />
        <app-easing-animated-counter-demo-container />
        <app-prefix-animated-counter-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnimatedCounterPage {}
