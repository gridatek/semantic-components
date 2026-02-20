import {
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
  imports: [
    ScToggleGroup,
    ScToggleGroupItem,
    SiTextAlignStartIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleToggleGroupDemo {
  readonly alignment = signal<string | null>('center');
}
