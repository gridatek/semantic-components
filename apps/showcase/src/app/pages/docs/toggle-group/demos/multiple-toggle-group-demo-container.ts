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
  computed,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-multiple-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem, SiBoldIcon, SiItalicIcon, SiUnderlineIcon],
  template: \`
    <div class="space-y-4">
      <div scToggleGroup type="multiple" [(value)]="formatting" aria-label="Text formatting">
        <button scToggleGroupItem value="bold" aria-label="Toggle bold">
          <svg si-bold-icon></svg>
        </button>
        <button scToggleGroupItem value="italic" aria-label="Toggle italic">
          <svg si-italic-icon></svg>
        </button>
        <button scToggleGroupItem value="underline" aria-label="Toggle underline">
          <svg si-underline-icon></svg>
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

  readonly formattingDisplay = computed(() => {
    const val = this.formatting();
    return val.length > 0 ? val.join(', ') : 'none';
  });
}`;
}
