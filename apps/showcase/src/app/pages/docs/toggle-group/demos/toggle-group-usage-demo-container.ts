import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { ToggleGroupUsageDemo } from './toggle-group-usage-demo';

@Component({
  selector: 'app-toggle-group-usage-demo-container',
  imports: [UsageCode, ToggleGroupUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-toggle-group-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ToggleGroupUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

/** Several pressed at a time (multiple): bold, italic, underline. */
@Component({
  selector: 'app-toggle-group-usage-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: \`
    <div
      scToggleGroup
      variant="outline"
      multiple
      aria-label="Text formatting"
      [(value)]="formatting"
    >
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
export class ToggleGroupUsageDemo {
  protected readonly formatting = signal<string[]>([]);
}`;
}
