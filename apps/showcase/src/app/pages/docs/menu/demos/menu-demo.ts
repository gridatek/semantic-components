import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
import { ScButton } from '@semantic-components/ui';
import {
  SiArchiveIcon,
  SiChevronRightIcon,
  SiClockIcon,
  SiEllipsisIcon,
  SiFolderIcon,
  SiForwardIcon,
  SiMailCheckIcon,
  SiMenuIcon,
  SiReplyIcon,
  SiStarIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-menu-demo',
  imports: [
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
    ScButton,
    SiArchiveIcon,
    SiChevronRightIcon,
    SiClockIcon,
    SiEllipsisIcon,
    SiFolderIcon,
    SiForwardIcon,
    SiMailCheckIcon,
    SiMenuIcon,
    SiReplyIcon,
    SiStarIcon,
    SiTrash2Icon,
  ],
  template: `
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">
        <svg siMenuIcon class="size-4" aria-hidden="true"></svg>
        Open Menu
      </button>
      <ng-template scMenuPortal>
        <div scMenu>
          <div scMenuItem value="Mark as read">
            <svg
              siMailCheckIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Mark as read</span>
          </div>
          <div scMenuItem value="Snooze">
            <svg
              siClockIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Snooze</span>
          </div>
          <div scMenuSeparator></div>
          <!-- Submenu -->
          <div scMenuSubProvider>
            <div scMenuSubTrigger value="More options">
              <svg
                siEllipsisIcon
                class="text-muted-foreground size-4"
                aria-hidden="true"
              ></svg>
              <span class="flex-1">More options</span>
              <svg scMenuSubIcon siChevronRightIcon></svg>
            </div>
            <div scMenuSubPortal>
              <div scMenuSub>
                <div scMenuItem value="Reply">
                  <svg
                    siReplyIcon
                    class="text-muted-foreground size-4"
                    aria-hidden="true"
                  ></svg>
                  <span class="flex-1">Reply</span>
                </div>
                <div scMenuItem value="Forward">
                  <svg
                    siForwardIcon
                    class="text-muted-foreground size-4"
                    aria-hidden="true"
                  ></svg>
                  <span class="flex-1">Forward</span>
                </div>
                <div scMenuItem value="Move to folder">
                  <svg
                    siFolderIcon
                    class="text-muted-foreground size-4"
                    aria-hidden="true"
                  ></svg>
                  <span class="flex-1">Move to folder</span>
                </div>
              </div>
            </div>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Archive">
            <svg
              siArchiveIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Archive</span>
          </div>
          <div scMenuItem value="Star">
            <svg
              siStarIcon
              class="text-muted-foreground size-4"
              aria-hidden="true"
            ></svg>
            <span class="flex-1">Star</span>
          </div>
          <div scMenuSeparator></div>
          <div
            scMenuItem
            value="Delete"
            class="text-destructive hover:bg-destructive/10 data-[active=true]:bg-destructive/10"
          >
            <svg siTrash2Icon class="size-4" aria-hidden="true"></svg>
            <span class="flex-1">Delete</span>
          </div>
        </div>
      </ng-template>
    </div>
  `,

  encapsulation: ViewEncapsulation.None,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuDemo {}
