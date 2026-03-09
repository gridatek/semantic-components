import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';
import {
  SiArchiveIcon,
  SiDownloadIcon,
  SiPrinterIcon,
  SiSaveIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-actions-speed-dial-demo',
  imports: [ScSpeedDial],
  template: `
    <div class="bg-muted/20 relative h-64 rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <sc-speed-dial
          [actions]="actionsWithDisabled()"
          ariaLabel="Actions with disabled items"
        />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledActionsSpeedDialDemo {
  readonly actionsWithDisabled = signal<SpeedDialAction[]>([
    {
      id: 'save',
      icon: SiSaveIcon,
      label: 'Save',
    },
    {
      id: 'print',
      icon: SiPrinterIcon,
      label: 'Print',
      disabled: true,
    },
    {
      id: 'download',
      icon: SiDownloadIcon,
      label: 'Download',
    },
    {
      id: 'archive',
      icon: SiArchiveIcon,
      label: 'Archive',
      disabled: true,
    },
  ]);
}
