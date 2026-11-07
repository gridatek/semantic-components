import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconInputButtonDemo } from './icon-input-button-demo';

@Component({
  selector: 'app-icon-input-button-demo-container',
  imports: [DemoContainer, IconInputButtonDemo],
  template: `
    <app-demo-container
      title="Icon only"
      demoUrl="/demos/input-button/icon-input-button-demo"
      [code]="code"
    >
      <app-icon-input-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconInputButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScInputButton } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** Its icon alone (a collapsed sidebar): named in sr-only text. */
@Component({
  selector: 'app-icon-input-button-demo',
  imports: [ScInputButton, SiSearchIcon],
  template: \`
    <button scInputButton class="size-8 justify-center p-0">
      <svg siSearchIcon></svg>
      <span class="sr-only">Search</span>
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconInputButtonDemo {}`;
}
