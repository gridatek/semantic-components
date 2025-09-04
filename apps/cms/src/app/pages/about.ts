import { Component } from '@angular/core';

import {
  ScPage,
  ScPageBreadcrumbSection,
  ScPageContent,
  ScPageDescription,
  ScPageFooter,
  ScPageHeader,
  ScPageSection,
  ScPageSectionContent,
  ScPageSectionDescription,
  ScPageSectionHeader,
  ScPageSectionTitle,
  ScPageSubtitle,
  ScPageTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'cms-about',
  imports: [
    ScPage,
    ScPageBreadcrumbSection,
    ScPageHeader,
    ScPageTitle,
    ScPageSubtitle,
    ScPageDescription,
    ScPageContent,
    ScPageSection,
    ScPageSectionHeader,
    ScPageSectionTitle,
    ScPageSectionDescription,
    ScPageSectionContent,
    ScPageFooter,
  ],
  template: `
    <sc-page>
      <sc-page-breadcrumb-section>
        <nav class="text-sm">
          <span class="text-muted-foreground">Home</span>
          <span class="text-muted-foreground mx-2">/</span>
          <span class="text-foreground">About</span>
        </nav>
      </sc-page-breadcrumb-section>

      <sc-page-header>
        <h1 sc-page-title>About Our CMS</h1>
        <h2 sc-page-subtitle>Building the future of content management</h2>
        <p sc-page-description>
          Learn more about our mission, values, and the team behind this powerful content management
          system built with semantic components.
        </p>
      </sc-page-header>

      <sc-page-content>
        <sc-page-section>
          <sc-page-section-header>
            <h3 sc-page-section-title>Our Mission</h3>
            <p sc-page-section-description>
              We believe in creating tools that empower content creators while maintaining the
              highest standards of accessibility and usability.
            </p>
          </sc-page-section-header>

          <sc-page-section-content>
            <div class="prose max-w-none">
              <p>
                Our content management system is built on the foundation of semantic components,
                ensuring that every piece of content is not only visually appealing but also
                accessible to all users. We prioritize clean, meaningful HTML structures that work
                seamlessly across devices and assistive technologies.
              </p>

              <p>
                By leveraging modern web technologies like Angular and Tailwind CSS, we deliver a
                fast, responsive, and maintainable solution that grows with your needs.
              </p>
            </div>
          </sc-page-section-content>
        </sc-page-section>

        <sc-page-section>
          <sc-page-section-header>
            <h3 sc-page-section-title>Core Values</h3>
            <p sc-page-section-description>
              The principles that guide our development and design decisions.
            </p>
          </sc-page-section-header>

          <sc-page-section-content>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="p-6 border rounded-lg">
                <h4 class="font-semibold mb-3 text-blue-600">Accessibility First</h4>
                <p class="text-sm text-muted-foreground">
                  Every component is designed with accessibility in mind, ensuring compliance with
                  WCAG guidelines.
                </p>
              </div>

              <div class="p-6 border rounded-lg">
                <h4 class="font-semibold mb-3 text-green-600">Semantic HTML</h4>
                <p class="text-sm text-muted-foreground">
                  We use meaningful HTML elements that convey structure and purpose to both users
                  and search engines.
                </p>
              </div>

              <div class="p-6 border rounded-lg">
                <h4 class="font-semibold mb-3 text-purple-600">Developer Experience</h4>
                <p class="text-sm text-muted-foreground">
                  Clean APIs, comprehensive documentation, and consistent patterns make development
                  enjoyable.
                </p>
              </div>
            </div>
          </sc-page-section-content>
        </sc-page-section>
      </sc-page-content>

      <sc-page-footer>
        <div class="flex justify-between items-center">
          <p class="text-sm text-muted-foreground">
            Ready to get started?
            <a class="text-blue-600 hover:underline" href="#">Contact us today</a>
          </p>
          <div class="text-sm text-muted-foreground">Last updated: January 2025</div>
        </div>
      </sc-page-footer>
    </sc-page>
  `,
})
export class AboutPage {}
