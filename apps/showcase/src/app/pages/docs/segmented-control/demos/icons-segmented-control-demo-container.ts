import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconsSegmentedControlDemo } from './icons-segmented-control-demo';

@Component({
  selector: 'app-icons-segmented-control-demo-container',
  imports: [DemoContainer, IconsSegmentedControlDemo],
  template: `
    <app-demo-container
      title="Icons"
      [code]="code"
      demoUrl="/demos/segmented-control/icons-segmented-control-demo"
    >
      <app-icons-segmented-control-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsSegmentedControlDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';
import {
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
} from '@semantic-icons/lucide-icons';

/** Icons only: each item named by sr-only text. */
@Component({
  selector: 'app-icons-segmented-control-demo',
  imports: [
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
    SiTextAlignCenterIcon,
    SiTextAlignStartIcon,
    SiTextAlignEndIcon,
  ],
  template: \`
    <div scSegmentedControl aria-label="Text alignment" [(value)]="align">
      <div scSegmentedControlIndicator></div>
      <button scSegmentedControlItem value="left">
        <svg siTextAlignStartIcon></svg>
        <span class="sr-only">Left</span>
      </button>
      <button scSegmentedControlItem value="center">
        <svg siTextAlignCenterIcon></svg>
        <span class="sr-only">Center</span>
      </button>
      <button scSegmentedControlItem value="right">
        <svg siTextAlignEndIcon></svg>
        <span class="sr-only">Right</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsSegmentedControlDemo {
  private readonly align = signal<string | null>('left');
}`;
}
