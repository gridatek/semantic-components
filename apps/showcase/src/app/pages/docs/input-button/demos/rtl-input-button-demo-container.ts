import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlInputButtonDemo } from './rtl-input-button-demo';

@Component({
  selector: 'app-rtl-input-button-demo-container',
  imports: [DemoContainer, RtlInputButtonDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/input-button/rtl-input-button-demo"
      [code]="code"
    >
      <app-rtl-input-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInputButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the icon at the right, the shortcut at the left. */
@Component({
  selector: 'app-rtl-input-button-demo',
  imports: [ScInputButton, ScKbd, SiSearchIcon],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <button scInputButton class="max-w-sm">
        <svg siSearchIcon></svg>
        <span class="flex-1">بحث...</span>
        <kbd scKbd>⌘<span class="sr-only"> Command</span>J</kbd>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInputButtonDemo {}`;
}
