import { Component, ViewEncapsulation } from '@angular/core';
import { ScAuthLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-auth-layout-usage-demo',
  imports: [ScAuthLayout],
  template: `
    <div
      scAuthLayout
      class="bg-muted flex min-h-svh items-center justify-center p-6"
    >
      <!-- The routed page (a sign-in form…) goes here, through its router-outlet. -->
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutUsageDemo {}
