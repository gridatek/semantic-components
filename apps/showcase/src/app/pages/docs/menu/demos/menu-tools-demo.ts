import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScMenu,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuSubProvider,
  ScMenuSub,
  ScMenuSubIcon,
  ScMenuSubPortal,
  ScMenuSubTrigger,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui-lab';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
  SiChevronRightIcon,
  SiRefreshCwIcon,
  SiWrenchIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-tools-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuSubProvider,
    ScMenuSub,
    ScMenuSubIcon,
    ScMenuSubPortal,
    ScMenuSubTrigger,
    ScMenuProvider,
    ScMenuTrigger,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiChevronRightIcon,
    SiRefreshCwIcon,
    SiWrenchIcon,
  ],
  template: `
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Options</button>
      <div scMenuPortal>
        <div scMenu class="w-56">
          <div scMenuItem value="Back">
            <svg
              siArrowLeftIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Back</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘[
            </span>
          </div>
          <div scMenuItem value="Forward" aria-disabled="true">
            <svg
              siArrowRightIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Forward</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘]
            </span>
          </div>
          <div scMenuItem value="Reload">
            <svg
              siRefreshCwIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Reload</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘R
            </span>
          </div>
          <div scMenuSeparator></div>
          <div scMenuSubProvider>
            <div scMenuSubTrigger value="More Tools">
              <svg
                siWrenchIcon
                class="text-muted-foreground size-4"
                aria-hidden="true"
              ></svg>
              <span class="flex-1">More Tools</span>
              <svg scMenuSubIcon siChevronRightIcon></svg>
            </div>
            <div scMenuSubPortal>
              <div scMenuSub>
                <div scMenuItem value="Save Page As...">
                  <span class="flex-1">Save Page As...</span>
                  <span
                    class="ml-auto text-xs tracking-widest text-muted-foreground"
                  >
                    ⌘S
                  </span>
                </div>
                <div scMenuItem value="Create Shortcut...">
                  <span class="flex-1">Create Shortcut...</span>
                </div>
                <div scMenuItem value="Name Window...">
                  <span class="flex-1">Name Window...</span>
                </div>
                <div scMenuSeparator></div>
                <div scMenuItem value="Developer Tools">
                  <span class="flex-1">Developer Tools</span>
                  <span
                    class="ml-auto text-xs tracking-widest text-muted-foreground"
                  >
                    ⌘⌥I
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Show Full URLs">
            <span class="flex-1">Show Full URLs</span>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuToolsDemo {}
