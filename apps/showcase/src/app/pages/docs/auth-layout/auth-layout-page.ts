import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AuthLayoutUsageDemoContainer } from './demos/auth-layout-usage-demo-container';

@Component({
  selector: 'app-auth-layout-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    AuthLayoutUsageDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Auth Layout</h1>
        <p class="text-muted-foreground">
          A page frame for sign-in, sign-up and password pages: the routed page
          alone, without the navbar and footer of the rest of the site.
        </p>
        <app-component-badges path="auth-layout" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-auth-layout-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            The routed page goes in its <code>router-outlet</code>: make the
            layout's component the parent route of the sign-in, sign-up and
            password pages.
          </li>
          <li>
            It adds no frame of its own: center the page, or give it a
            background, with a class.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class AuthLayoutPage {}
