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
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-single-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div class="space-y-4">
      <div
        sc-toggle-group
        type="single"
        [(value)]="alignment"
        aria-label="Text alignment"
      >
        <button sc-toggle-group-item value="left" aria-label="Align left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="15" x2="3" y1="12" y2="12" />
            <line x1="17" x2="3" y1="18" y2="18" />
          </svg>
        </button>
        <button sc-toggle-group-item value="center" aria-label="Align center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="17" x2="7" y1="12" y2="12" />
            <line x1="19" x2="5" y1="18" y2="18" />
          </svg>
        </button>
        <button sc-toggle-group-item value="right" aria-label="Align right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="21" x2="9" y1="12" y2="12" />
            <line x1="21" x2="7" y1="18" y2="18" />
          </svg>
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
