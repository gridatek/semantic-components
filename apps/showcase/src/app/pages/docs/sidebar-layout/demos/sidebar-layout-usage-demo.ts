import { Component, ViewEncapsulation } from '@angular/core';
import { ScSidebarLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-sidebar-layout-usage-demo',
  imports: [ScSidebarLayout],
  template: `
    <div scSidebarLayout>
      <div scSidebar>…</div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidebarLayoutUsageDemo {}
