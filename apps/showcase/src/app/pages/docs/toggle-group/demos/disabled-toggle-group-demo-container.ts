import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledToggleGroupDemo } from './disabled-toggle-group-demo';

@Component({
  selector: 'app-disabled-toggle-group-demo-container',
  imports: [DemoContainer, DisabledToggleGroupDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/toggle-group/disabled-toggle-group-demo"
      [code]="code"
    >
      <app-disabled-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToggleGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** A disabled group: every item dimmed, out of the Tab order. */
@Component({
  selector: 'app-disabled-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: \`
    <div scToggleGroup disabled aria-label="Text formatting">
      <button scToggleGroupItem value="bold">
        <svg siBoldIcon></svg>
        <span class="sr-only">Bold</span>
      </button>
      <button scToggleGroupItem value="italic">
        <svg siItalicIcon></svg>
        <span class="sr-only">Italic</span>
      </button>
      <button scToggleGroupItem value="underline">
        <svg siUnderlineIcon></svg>
        <span class="sr-only">Underline</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledToggleGroupDemo {}`;
}
