import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: `
    <div class="flex flex-col gap-4">
      <div
        scToggleGroup
        type="single"
        size="sm"
        aria-label="Small toggle group"
      >
        <button scToggleGroupItem value="a" aria-label="Option A">A</button>
        <button scToggleGroupItem value="b" aria-label="Option B">B</button>
        <button scToggleGroupItem value="c" aria-label="Option C">C</button>
      </div>
      <div
        scToggleGroup
        type="single"
        size="default"
        aria-label="Default toggle group"
      >
        <button scToggleGroupItem value="a" aria-label="Option A">A</button>
        <button scToggleGroupItem value="b" aria-label="Option B">B</button>
        <button scToggleGroupItem value="c" aria-label="Option C">C</button>
      </div>
      <div
        scToggleGroup
        type="single"
        size="lg"
        aria-label="Large toggle group"
      >
        <button scToggleGroupItem value="a" aria-label="Option A">A</button>
        <button scToggleGroupItem value="b" aria-label="Option B">B</button>
        <button scToggleGroupItem value="c" aria-label="Option C">C</button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesToggleGroupDemo {}
