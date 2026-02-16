import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DirectionsSpeedDialDemo } from './directions-speed-dial-demo';

@Component({
  selector: 'app-directions-speed-dial-demo-container',
  imports: [DemoContainer, DirectionsSpeedDialDemo],
  template: `
    <app-demo-container title="Directions" [code]="code">
      <app-directions-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionsSpeedDialDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-directions-speed-dial-demo',
  imports: [ScSpeedDial],
  template: \`
    <div class="grid grid-cols-2 gap-4">
      <!-- Up Direction -->
      <div class="relative h-48 border rounded-lg bg-muted/20">
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="up"
            ariaLabel="Up direction"
          />
        </div>
        <span class="absolute top-2 left-2 text-xs text-muted-foreground">
          Up (default)
        </span>
      </div>

      <!-- Down Direction -->
      <div class="relative h-48 border rounded-lg bg-muted/20">
        <div class="absolute top-4 left-1/2 -translate-x-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="down"
            ariaLabel="Down direction"
          />
        </div>
        <span class="absolute top-2 left-2 text-xs text-muted-foreground">
          Down
        </span>
      </div>

      <!-- Left Direction -->
      <div class="relative h-48 border rounded-lg bg-muted/20">
        <div class="absolute top-1/2 right-4 -translate-y-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="left"
            ariaLabel="Left direction"
          />
        </div>
        <span class="absolute top-2 left-2 text-xs text-muted-foreground">
          Left
        </span>
      </div>

      <!-- Right Direction -->
      <div class="relative h-48 border rounded-lg bg-muted/20">
        <div class="absolute top-1/2 left-4 -translate-y-1/2">
          <sc-speed-dial
            [actions]="directionActions()"
            direction="right"
            ariaLabel="Right direction"
          />
        </div>
        <span class="absolute top-2 left-2 text-xs text-muted-foreground">
          Right
        </span>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionsSpeedDialDemo {
  readonly directionActions = signal<SpeedDialAction[]>([
    {
      id: 'home',
      icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>\`,
      label: 'Home',
    },
    {
      id: 'settings',
      icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>\`,
      label: 'Settings',
    },
    {
      id: 'help',
      icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>\`,
      label: 'Help',
    },
  ]);
}`;
}
