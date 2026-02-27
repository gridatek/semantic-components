import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScDrawer,
  ScDrawerDescription,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-left-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerDescription,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
  ],
  template: `
    <div scDrawerProvider direction="left">
      <button scButton variant="outline" scDrawerTrigger>
        Open Left Drawer
      </button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Navigation</h2>
            <p scDrawerDescription>Browse through different sections.</p>
          </div>
          <nav class="flex flex-col gap-2 p-4">
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              Home
            </a>
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              Products
            </a>
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              About
            </a>
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              Contact
            </a>
          </nav>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftDrawerDemo {}
