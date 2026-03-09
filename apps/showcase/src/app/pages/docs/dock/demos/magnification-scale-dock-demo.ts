import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDock, ScDockItem, ScDockItems } from '@semantic-components/ui-lab';
import type { DockItem } from '@semantic-components/ui-lab';
import {
  SiCompassIcon,
  SiFolderIcon,
  SiImageIcon,
  SiMailIcon,
  SiMusicIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-magnification-scale-dock-demo',
  imports: [ScDock, ScDockItems, ScDockItem],
  template: `
    <div class="bg-muted/30 flex justify-center rounded-lg border p-8">
      <nav scDock [magnificationScale]="2">
        <div scDockItems>
          @for (item of items; track item.id) {
            <button scDockItem [item]="item"></button>
          }
        </div>
      </nav>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagnificationScaleDockDemo {
  readonly items: DockItem[] = [
    {
      id: 'finder',
      label: 'Finder',
      icon: SiFolderIcon,
    },
    {
      id: 'safari',
      label: 'Safari',
      icon: SiCompassIcon,
    },
    {
      id: 'mail',
      label: 'Mail',
      icon: SiMailIcon,
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: SiImageIcon,
    },
    {
      id: 'music',
      label: 'Music',
      icon: SiMusicIcon,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: SiSettingsIcon,
    },
  ];
}
