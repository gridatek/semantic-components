import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiShare2Icon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-without-labels-speed-dial-demo',
  imports: [ScSpeedDial],
  template: `
    <div class="bg-muted/20 relative h-64 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <sc-speed-dial
          [actions]="basicActions()"
          [showLabels]="false"
          ariaLabel="Actions without labels"
        />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutLabelsSpeedDialDemo {
  readonly basicActions = signal<SpeedDialAction[]>([
    {
      id: 'edit',
      icon: SiPencilIcon,
      label: 'Edit',
    },
    {
      id: 'copy',
      icon: SiCopyIcon,
      label: 'Copy',
    },
    {
      id: 'share',
      icon: SiShare2Icon,
      label: 'Share',
    },
    {
      id: 'delete',
      icon: SiTrash2Icon,
      label: 'Delete',
    },
  ]);
}
