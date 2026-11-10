import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithTextToggleDemo } from './with-text-toggle-demo';

@Component({
  selector: 'app-with-text-toggle-demo-container',
  imports: [DemoContainer, WithTextToggleDemo],
  template: `
    <app-demo-container
      title="With Text"
      demoUrl="/demos/toggle/with-text-toggle-demo"
      [code]="code"
    >
      <app-with-text-toggle-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WithTextToggleDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggle } from '@semantic-components/ui';
import { SiItalicIcon } from '@semantic-icons/lucide-icons';

/** An icon and its text: the text names it. */
@Component({
  selector: 'app-with-text-toggle-demo',
  imports: [ScToggle, SiItalicIcon],
  template: \`
    <button scToggle [(pressed)]="italic">
      <svg siItalicIcon></svg>
      Italic
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithTextToggleDemo {
  protected readonly italic = signal(false);
}`;
}
