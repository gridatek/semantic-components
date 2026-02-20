import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';
import {
  ScButton,
  ScDrawer,
  ScDrawerClose,
  ScDrawerDescription,
  ScDrawerFooter,
  ScDrawerHandle,
  ScDrawerHeader,
  ScDrawerPortal,
  ScDrawerProvider,
  ScDrawerTitle,
  ScDrawerTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-basic-drawer-demo',
  imports: [
    ScButton,
    ScDrawer,
    ScDrawerClose,
    ScDrawerDescription,
    ScDrawerFooter,
    ScDrawerHandle,
    ScDrawerHeader,
    ScDrawerPortal,
    ScDrawerProvider,
    ScDrawerTitle,
    ScDrawerTrigger,
    SiMinusIcon,
    SiPlusIcon,
  ],
  template: `
    <div scDrawerProvider>
      <button scButton variant="outline" scDrawerTrigger>Open Drawer</button>
      <ng-template scDrawerPortal>
        <div scDrawer>
          <div scDrawerHandle></div>
          <div scDrawerHeader>
            <h2 scDrawerTitle>Edit Profile</h2>
            <p scDrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div class="p-4 pb-0">
            <div class="flex items-center justify-center space-x-2">
              <button
                scButton
                variant="outline"
                size="icon"
                class="rounded-full"
                aria-label="Decrease"
              >
                <svg siMinusIcon></svg>
              </button>
              <div class="flex-1 text-center">
                <div class="text-7xl font-bold tracking-tighter">320</div>
                <div class="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <button
                scButton
                variant="outline"
                size="icon"
                class="rounded-full"
                aria-label="Increase"
              >
                <svg siPlusIcon></svg>
              </button>
            </div>
          </div>
          <div scDrawerFooter>
            <button scButton class="w-full" scDrawerClose>Submit</button>
            <button scButton variant="outline" class="w-full" scDrawerClose>
              Cancel
            </button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDrawerDemo {}
