import { Component } from '@angular/core';

import {
  ScGridLayout,
  ScPage,
  ScPageContent,
  ScPageFooter,
  ScPageHeroSection,
  ScPageSection,
  ScPageSectionContent,
  ScPageSectionDescription,
  ScPageSectionFooter,
  ScPageSectionHeader,
  ScPageSectionSubtitle,
  ScPageSectionTitle,
} from '@semantic-components/ui';

import { CmsHeroBanner } from '../components/hero-banner';

@Component({
  selector: 'cms-home',
  imports: [
    ScPage,
    ScPageHeroSection,
    ScPageContent,
    ScPageSection,
    ScPageSectionHeader,
    ScPageSectionTitle,
    ScPageSectionSubtitle,
    ScPageSectionDescription,
    ScPageSectionContent,
    ScPageSectionFooter,
    ScPageFooter,
    ScGridLayout,
    CmsHeroBanner,
  ],
  template: `
    <sc-page>
      <sc-page-hero-section>
        <cms-hero-banner></cms-hero-banner>
      </sc-page-hero-section>

      <sc-page-content>
        <sc-page-section>
          <sc-page-section-header>
            <h3 sc-page-section-title>Getting Started</h3>
            <h4 sc-page-section-subtitle>Quick setup guide</h4>
            <p sc-page-section-description>
              Learn how to use the page structure components to create consistent layouts.
            </p>
          </sc-page-section-header>

          <sc-page-section-content>
            <sc-grid-layout [cols]="1" [mdCols]="2" [gap]="6">
              <div class="p-6 border rounded-lg">
                <h4 class="font-semibold mb-2">Page Components</h4>
                <p class="text-muted-foreground">
                  Use semantic page components to maintain consistent spacing and typography across
                  your application.
                </p>
              </div>
              <div class="p-6 border rounded-lg">
                <h4 class="font-semibold mb-2">Responsive Design</h4>
                <p class="text-muted-foreground">
                  All components are built with responsive design principles and adapt to different
                  screen sizes.
                </p>
              </div>
            </sc-grid-layout>
          </sc-page-section-content>

          <sc-page-section-footer>
            <p class="text-sm text-muted-foreground">
              This section demonstrates the page structure components working together.
            </p>
          </sc-page-section-footer>
        </sc-page-section>

        <sc-page-section>
          <sc-page-section-header>
            <h3 sc-page-section-title>Features</h3>
            <p sc-page-section-description>Key features of the semantic component system.</p>
          </sc-page-section-header>

          <sc-page-section-content>
            <ul class="space-y-3">
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Consistent spacing and typography</span>
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Semantic HTML structure</span>
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Tailwind CSS styling</span>
              </li>
              <li class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Responsive design</span>
              </li>
            </ul>
          </sc-page-section-content>
        </sc-page-section>
      </sc-page-content>

      <sc-page-footer>
        <div class="flex justify-between items-center">
          <p class="text-sm text-muted-foreground">© 2025 CMS. Built with semantic components.</p>
          <div class="text-sm text-muted-foreground">Version 1.0.0</div>
        </div>
      </sc-page-footer>
    </sc-page>
  `,
})
export class HomePage {}
