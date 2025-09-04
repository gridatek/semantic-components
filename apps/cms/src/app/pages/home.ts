import { Component } from '@angular/core';

import {
  ScPage,
  ScPageBreadcrumbSection,
  ScPageContent,
  ScPageDescription,
  ScPageFooter,
  ScPageHeader,
  ScPageHeroSection,
  ScPageSection,
  ScPageSectionContent,
  ScPageSectionDescription,
  ScPageSectionFooter,
  ScPageSectionHeader,
  ScPageSectionSubtitle,
  ScPageSectionTitle,
  ScPageSubtitle,
  ScPageTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'cms-home',
  imports: [
    ScPage,
    ScPageHeroSection,
    ScPageBreadcrumbSection,
    ScPageHeader,
    ScPageTitle,
    ScPageSubtitle,
    ScPageDescription,
    ScPageContent,
    ScPageSection,
    ScPageSectionHeader,
    ScPageSectionTitle,
    ScPageSectionSubtitle,
    ScPageSectionDescription,
    ScPageSectionContent,
    ScPageSectionFooter,
    ScPageFooter,
  ],
  template: `
    <sc-page>
      <sc-page-hero-section>
        <div
          class="text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8"
        >
          <h1 class="text-4xl font-bold mb-4">Welcome to CMS</h1>
          <p class="text-xl">A powerful content management system built with semantic components</p>
        </div>
      </sc-page-hero-section>

      <sc-page-breadcrumb-section>
        <nav class="text-sm">
          <span class="text-muted-foreground">Home</span>
        </nav>
      </sc-page-breadcrumb-section>

      <sc-page-header>
        <h1 sc-page-title>CMS Dashboard</h1>
        <h2 sc-page-subtitle>Content Management System</h2>
        <p sc-page-description>
          Manage your content with ease using our semantic component library. This example
          demonstrates the page structure components in action.
        </p>
      </sc-page-header>

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
            <div class="grid md:grid-cols-2 gap-6">
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
            </div>
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
