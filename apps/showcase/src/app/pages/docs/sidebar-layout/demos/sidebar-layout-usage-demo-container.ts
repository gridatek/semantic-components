import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';

/** A page frame can't sit inside a page (its main, its header): in dev mode, its demo in an iframe. */
@Component({
  selector: 'app-sidebar-layout-usage-demo-container',
  imports: [UsageCode],
  template: `
    <app-usage-code
      [code]="code"
      demoUrl="/demos/sidebar-layout/sidebar-layout-usage-demo"
      demoTitle="Sidebar Layout demo"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidebarLayoutUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSidebarLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-sidebar-layout-usage-demo',
  imports: [ScSidebarLayout],
  template: \`
    <div scSidebarLayout>
      <div scSidebar>…</div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SidebarLayoutUsageDemo {}`;
}
