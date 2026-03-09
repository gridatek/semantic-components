import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';
import {
  SiCircleQuestionMarkIcon,
  SiHouseIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-directions-speed-dial-demo',
  imports: [ScSpeedDial],
  template: `
    <div class="grid grid-cols-2 gap-4">
      <!-- Up Direction -->
      <div class="bg-muted/20 relative h-48 rounded-lg border">
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="up"
            ariaLabel="Up direction"
          />
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Up (default)
        </span>
      </div>

      <!-- Down Direction -->
      <div class="bg-muted/20 relative h-48 rounded-lg border">
        <div class="absolute top-4 left-1/2 -translate-x-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="down"
            ariaLabel="Down direction"
          />
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Down
        </span>
      </div>

      <!-- Left Direction -->
      <div class="bg-muted/20 relative h-48 rounded-lg border">
        <div class="absolute top-1/2 right-4 -translate-y-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="left"
            ariaLabel="Left direction"
          />
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Left
        </span>
      </div>

      <!-- Right Direction -->
      <div class="bg-muted/20 relative h-48 rounded-lg border">
        <div class="absolute top-1/2 left-4 -translate-y-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="right"
            ariaLabel="Right direction"
          />
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Right
        </span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionsSpeedDialDemo {
  readonly directionActions = signal<SpeedDialAction[]>([
    {
      id: 'home',
      icon: SiHouseIcon,
      label: 'Home',
    },
    {
      id: 'settings',
      icon: SiSettingsIcon,
      label: 'Settings',
    },
    {
      id: 'help',
      icon: SiCircleQuestionMarkIcon,
      label: 'Help',
    },
  ]);
}
