import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FullWidthInputButtonDemo } from './full-width-input-button-demo';

@Component({
  selector: 'app-full-width-input-button-demo-container',
  imports: [DemoContainer, FullWidthInputButtonDemo],
  template: `
    <app-demo-container
      title="Full width"
      demoUrl="/demos/input-button/full-width-input-button-demo"
      [code]="code"
    >
      <app-full-width-input-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FullWidthInputButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** As wide as its place: a search across a header. */
@Component({
  selector: 'app-full-width-input-button-demo',
  imports: [ScInputButton, ScKbd, SiSearchIcon],
  template: \`
    <div class="w-full max-w-2xl">
      <button scInputButton class="w-full">
        <svg siSearchIcon></svg>
        <span class="flex-1">Search documentation...</span>
        <kbd scKbd>⌘<span class="sr-only"> Command</span>J</kbd>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FullWidthInputButtonDemo {}`;
}
