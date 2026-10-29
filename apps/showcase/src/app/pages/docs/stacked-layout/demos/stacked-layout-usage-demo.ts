import { Component, ViewEncapsulation } from '@angular/core';
import { ScStackedLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-stacked-layout-usage-demo',
  imports: [ScStackedLayout],
  template: `
    <div scStackedLayout>
      <header scNavbar>…</header>
      <footer scFooter>…</footer>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayoutUsageDemo {}
