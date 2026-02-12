import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MultipleToggleGroupDemo } from './multiple-toggle-group-demo';

@Component({
  selector: 'app-multiple-toggle-group-demo-container',
  imports: [DemoContainer, MultipleToggleGroupDemo],
  template: `
    <app-demo-container title="Multiple Selection" [code]="code">
      <app-multiple-toggle-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleToggleGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-multiple-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: \`
    <div class="space-y-4">
      <div
        sc-toggle-group
        type="multiple"
        [(value)]="formatting"
        aria-label="Text formatting"
      >
        <button sc-toggle-group-item value="bold" aria-label="Toggle bold">
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
            <path d="M14 12a4 4 0 0 0 0-8H6v8" />
            <path d="M15 20a4 4 0 0 0 0-8H6v8" />
          </svg>
        </button>
        <button sc-toggle-group-item value="italic" aria-label="Toggle italic">
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
            <line x1="19" x2="10" y1="4" y2="4" />
            <line x1="14" x2="5" y1="20" y2="20" />
            <line x1="15" x2="9" y1="4" y2="20" />
          </svg>
        </button>
        <button
          sc-toggle-group-item
          value="underline"
          aria-label="Toggle underline"
        >
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
            <path d="M6 4v6a6 6 0 0 0 12 0V4" />
            <line x1="4" x2="20" y1="20" y2="20" />
          </svg>
        </button>
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ formattingDisplay() }}
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleToggleGroupDemo {
  readonly formatting = signal<string[]>(['bold']);

  readonly formattingDisplay = () => {
    const val = this.formatting();
    return val.length > 0 ? val.join(', ') : 'none';
  };
}`;
}
