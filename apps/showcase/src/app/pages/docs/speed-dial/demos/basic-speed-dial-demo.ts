import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScSpeedDial,
  type SpeedDialAction,
  type SpeedDialActionClickEvent,
} from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiShare2Icon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-speed-dial-demo',
  imports: [ScSpeedDial],
  template: `
    <div class="bg-muted/20 relative h-96 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <div
          scSpeedDial
          [actions]="basicActions()"
          (actionClick)="onActionClick($event)"
        ></div>
      </div>
    </div>
    @if (lastAction()) {
      <p class="text-muted-foreground mt-2 text-sm">
        Last action: {{ lastAction() }}
      </p>
    }
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSpeedDialDemo {
  readonly lastAction = signal<string | null>(null);

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

  onActionClick(event: SpeedDialActionClickEvent): void {
    this.lastAction.set(`${event.action.label} (index: ${event.index})`);
  }
}
