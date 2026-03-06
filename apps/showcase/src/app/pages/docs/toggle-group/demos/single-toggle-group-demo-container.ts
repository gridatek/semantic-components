import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SingleToggleGroupDemo } from './single-toggle-group-demo';

@Component({
  selector: 'app-single-toggle-group-demo-container',
  imports: [DemoContainer, SingleToggleGroupDemo],
  template: `
    <app-demo-container title="Single Selection" [code]="code">
      <app-single-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleToggleGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiTextAlignStartIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
  ],
  template: \`
    <div class="space-y-4">
      <div
        scToggleGroup
        type="single"
        [(value)]="alignment"
        aria-label="Text alignment"
      >
        <button scToggleGroupItem value="left" aria-label="Align left">
          <svg siTextAlignStartIcon></svg>
        </button>
        <button scToggleGroupItem value="center" aria-label="Align center">
          <svg siTextAlignCenterIcon></svg>
        </button>
        <button scToggleGroupItem value="right" aria-label="Align right">
          <svg siTextAlignEndIcon></svg>
        </button>
      </div>
      <p class="text-muted-foreground text-sm">
        Selected: {{ alignment() || 'none' }}
      </p>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleToggleGroupDemo {
  readonly alignment = signal<string | null>('center');
}`;
}
