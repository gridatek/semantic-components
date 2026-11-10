import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleToggleGroupDemo } from './single-toggle-group-demo';

@Component({
  selector: 'app-single-toggle-group-demo-container',
  imports: [DemoContainer, SingleToggleGroupDemo],
  template: `
    <app-demo-container
      title="Single"
      demoUrl="/demos/toggle-group/single-toggle-group-demo"
      [code]="code"
    >
      <app-single-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleToggleGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
} from '@semantic-icons/lucide-icons';

/** One pressed at a time — or none: pressing it again releases it. */
@Component({
  selector: 'app-single-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
    SiTextAlignStartIcon,
  ],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div scToggleGroup aria-label="Text alignment" [(value)]="alignment">
        <button scToggleGroupItem value="start">
          <svg siTextAlignStartIcon></svg>
          <span class="sr-only">Align start</span>
        </button>
        <button scToggleGroupItem value="center">
          <svg siTextAlignCenterIcon></svg>
          <span class="sr-only">Align center</span>
        </button>
        <button scToggleGroupItem value="end">
          <svg siTextAlignEndIcon></svg>
          <span class="sr-only">Align end</span>
        </button>
      </div>
      <p class="text-muted-foreground text-sm">
        Alignment: {{ alignment()[0] ?? 'none' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SingleToggleGroupDemo {
  protected readonly alignment = signal(['start']);
}`;
}
