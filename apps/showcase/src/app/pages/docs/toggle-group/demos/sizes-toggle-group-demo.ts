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
        sc-toggle-group
        type="single"
        size="sm"
        aria-label="Small toggle group"
      >
        <button sc-toggle-group-item value="a" aria-label="Option A">A</button>
        <button sc-toggle-group-item value="b" aria-label="Option B">B</button>
        <button sc-toggle-group-item value="c" aria-label="Option C">C</button>
      </div>
      <div
        sc-toggle-group
        type="single"
        size="default"
        aria-label="Default toggle group"
      >
        <button sc-toggle-group-item value="a" aria-label="Option A">A</button>
        <button sc-toggle-group-item value="b" aria-label="Option B">B</button>
        <button sc-toggle-group-item value="c" aria-label="Option C">C</button>
      </div>
      <div
        sc-toggle-group
        type="single"
        size="lg"
        aria-label="Large toggle group"
      >
        <button sc-toggle-group-item value="a" aria-label="Option A">A</button>
        <button sc-toggle-group-item value="b" aria-label="Option B">B</button>
        <button sc-toggle-group-item value="c" aria-label="Option C">C</button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesToggleGroupDemo {}
