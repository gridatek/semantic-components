import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesToggleDemo } from './sizes-toggle-demo';

@Component({
  selector: 'app-sizes-toggle-demo-container',
  imports: [DemoContainer, SizesToggleDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/toggle/sizes-toggle-demo"
      [code]="code"
    >
      <app-sizes-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesToggleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';

/** size: sm, default, lg. */
@Component({
  selector: 'app-sizes-toggle-demo',
  imports: [ScToggle],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <button scToggle variant="outline" size="sm">Small</button>
      <button scToggle variant="outline" size="default">Default</button>
      <button scToggle variant="outline" size="lg">Large</button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesToggleDemo {}`;
}
