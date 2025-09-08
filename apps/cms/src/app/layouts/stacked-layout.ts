import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsFooter } from '../components/footer';
import { CmsNavigation } from '../components/navigation';

@Component({
  selector: 'cms-stacked-layout',
  imports: [RouterModule, CmsNavigation, CmsFooter],
  template: `
    <div class="min-h-screen flex flex-col">
      <cms-navigation />

      <main class="flex-1">
        <router-outlet />
      </main>

      <cms-footer />
    </div>
  `,
  styles: ``,
})
export class StackedLayout {}
