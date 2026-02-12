import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-speed-dial-demo',
  imports: [ScSpeedDial],
  template: `
    <div class="flex items-end gap-8 p-4">
      <div class="text-center">
        <sc-speed-dial
          [actions]="basicActions().slice(0, 3)"
          size="sm"
          actionSize="sm"
          ariaLabel="Small speed dial"
        />
        <p class="mt-2 text-xs text-muted-foreground">Small</p>
      </div>
      <div class="text-center">
        <sc-speed-dial
          [actions]="basicActions().slice(0, 3)"
          size="md"
          actionSize="md"
          ariaLabel="Medium speed dial"
        />
        <p class="mt-2 text-xs text-muted-foreground">Medium</p>
      </div>
      <div class="text-center">
        <sc-speed-dial
          [actions]="basicActions().slice(0, 3)"
          size="lg"
          actionSize="lg"
          ariaLabel="Large speed dial"
        />
        <p class="mt-2 text-xs text-muted-foreground">Large</p>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesSpeedDialDemo {
  readonly basicActions = signal<SpeedDialAction[]>([
    {
      id: 'edit',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
      label: 'Edit',
    },
    {
      id: 'copy',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
      label: 'Copy',
    },
    {
      id: 'share',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`,
      label: 'Share',
    },
    {
      id: 'delete',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
      label: 'Delete',
    },
  ]);
}
