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
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleToggleGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiTextAlignCenterIcon,
  SiTextAlignStartIcon,
  SiTextAlignEndIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem, SiTextAlignStartIcon, SiTextAlignCenterIcon, SiTextAlignEndIcon],
  template: \`
    <div class="space-y-4">
      <div scToggleGroup type="single" [(value)]="alignment" aria-label="Text alignment">
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
      <p class="text-sm text-muted-foreground">
        Selected: {{ alignment() || 'none' }}
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleToggleGroupDemo {
  readonly alignment = signal<string | null>('center');
}`;
}
