import { Component, ViewEncapsulation } from '@angular/core';
import { ScStackedLayout } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-stacked-layout-usage-demo',
  imports: [ScStackedLayout],
  template: `
    <sc-stacked-layout>
      <nav scNavbar aria-label="Main">…</nav>
      <footer scFooter>…</footer>
    </sc-stacked-layout>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayoutUsageDemo {}
