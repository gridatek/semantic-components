import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';

/** Code only: a page frame can't be shown inside a page (its main, its header). */
@Component({
  selector: 'app-stacked-layout-usage-demo-container',
  imports: [UsageCode],
  template: `<app-usage-code [code]="code" />`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayoutUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScStackedLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-stacked-layout-usage-demo',
  imports: [ScStackedLayout],
  template: \`
    <div scStackedLayout>
      <header scNavbar>…</header>
      <footer scFooter>…</footer>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayoutUsageDemo {}`;
}
