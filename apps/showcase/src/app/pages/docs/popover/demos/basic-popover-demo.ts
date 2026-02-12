import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScPopoverProvider,
  ScPopoverPortal,
  ScPopover,
  ScPopoverTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-popover-demo',
  imports: [ScPopoverProvider, ScPopoverPortal, ScPopover, ScPopoverTrigger],
  template: `
    <div sc-popover-provider>
      <button
        sc-popover-trigger
        class="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Open Popover
      </button>
      <div sc-popover-portal>
        <div sc-popover>
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Dimensions</h4>
              <p class="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <label for="width" class="text-sm">Width</label>
                <input
                  id="width"
                  value="100%"
                  class="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
                />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <label for="maxWidth" class="text-sm">Max. width</label>
                <input
                  id="maxWidth"
                  value="300px"
                  class="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
                />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <label for="height" class="text-sm">Height</label>
                <input
                  id="height"
                  value="25px"
                  class="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
                />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <label for="maxHeight" class="text-sm">Max. height</label>
                <input
                  id="maxHeight"
                  value="none"
                  class="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPopoverDemo {}
