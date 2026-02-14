import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';
import { CtaSection } from '../../components/cta-section/cta-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, FeatureGrid, CtaSection],
  template: `
    <app-hero-section />

    <app-feature-grid />

    <app-cta-section />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {}
