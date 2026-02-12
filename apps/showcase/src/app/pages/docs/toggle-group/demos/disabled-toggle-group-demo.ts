import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: `
    <div class="flex flex-col gap-4">
      <div
        sc-toggle-group
        type="single"
        [disabled]="true"
        aria-label="Disabled toggle group"
      >
        <button sc-toggle-group-item value="a" aria-label="Option A">A</button>
        <button sc-toggle-group-item value="b" aria-label="Option B">B</button>
        <button sc-toggle-group-item value="c" aria-label="Option C">C</button>
      </div>
      <div
        sc-toggle-group
        type="single"
        aria-label="Toggle group with disabled item"
      >
        <button sc-toggle-group-item value="a" aria-label="Option A">A</button>
        <button
          sc-toggle-group-item
          value="b"
          [disabled]="true"
          aria-label="Option B (disabled)"
        >
          B
        </button>
        <button sc-toggle-group-item value="c" aria-label="Option C">C</button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledToggleGroupDemo {}
