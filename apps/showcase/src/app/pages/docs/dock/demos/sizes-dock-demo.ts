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
  selector: 'app-sizes-dock-demo',
  imports: [ScDock, ScDockItems, ScDockItem],
  template: `
    <div
      class="bg-muted/30 flex flex-col items-center gap-6 rounded-lg border p-8"
    >
      <div class="text-center">
        <p class="text-muted-foreground mb-2 text-xs">Small</p>
        <nav scDock size="sm">
          <div scDockItems>
            @for (item of items; track item.id) {
              <button scDockItem [item]="item"></button>
            }
          </div>
        </nav>
      </div>
      <div class="text-center">
        <p class="text-muted-foreground mb-2 text-xs">Medium (Default)</p>
        <nav scDock size="md">
          <div scDockItems>
            @for (item of items; track item.id) {
              <button scDockItem [item]="item"></button>
            }
          </div>
        </nav>
      </div>
      <div class="text-center">
        <p class="text-muted-foreground mb-2 text-xs">Large</p>
        <nav scDock size="lg">
          <div scDockItems>
            @for (item of items; track item.id) {
              <button scDockItem [item]="item"></button>
            }
          </div>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesDockDemo {
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
