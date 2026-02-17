import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';
import {
  SiAlignCenterIcon,
  SiAlignLeftIcon,
  SiAlignRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-single-toggle-group-demo',
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiAlignLeftIcon,
    SiAlignCenterIcon,
    SiAlignRightIcon,
  ],
  template: `
    <div class="space-y-4">
      <div
        scToggleGroup
        type="single"
        [(value)]="alignment"
        aria-label="Text alignment"
      >
        <button scToggleGroupItem value="left" aria-label="Align left">
          <svg si-align-left-icon></svg>
        </button>
        <button scToggleGroupItem value="center" aria-label="Align center">
          <svg si-align-center-icon></svg>
        </button>
        <button scToggleGroupItem value="right" aria-label="Align right">
          <svg si-align-right-icon></svg>
        </button>
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ alignment() || 'none' }}
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleToggleGroupDemo {
  readonly alignment = signal<string | null>('center');
}
