import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScControlGroup,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCopyIcon,
  SiShareIcon,
  SiTrashIcon,
  SiTriangleAlertIcon,
  SiUserRoundXIcon,
  SiVolumeOffIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-group-menu-button-demo',
  imports: [
    ScButton,
    ScControlGroup,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    SiCheckIcon,
    SiChevronDownIcon,
    SiCopyIcon,
    SiShareIcon,
    SiTrashIcon,
    SiTriangleAlertIcon,
    SiUserRoundXIcon,
    SiVolumeOffIcon,
  ],
  template: `
    <div scMenuProvider align="end">
      <div scControlGroup aria-label="Follow">
        <button scButton variant="outline">Follow</button>
        <button scButton scMenuTrigger variant="outline" class="ps-2!">
          <svg siChevronDownIcon></svg>
          <span class="sr-only">More options</span>
        </button>
      </div>
      <ng-template scMenuPortal>
        <div scMenu class="w-52">
          <ng-template scMenuContent>
            <div scMenuItem value="Mute Conversation">
              <svg siVolumeOffIcon></svg>
              Mute Conversation
            </div>
            <div scMenuItem value="Mark as Read">
              <svg siCheckIcon></svg>
              Mark as Read
            </div>
            <div scMenuItem value="Report Conversation">
              <svg siTriangleAlertIcon></svg>
              Report Conversation
            </div>
            <div scMenuItem value="Block User">
              <svg siUserRoundXIcon></svg>
              Block User
            </div>
            <div scMenuItem value="Share Conversation">
              <svg siShareIcon></svg>
              Share Conversation
            </div>
            <div scMenuItem value="Copy Conversation">
              <svg siCopyIcon></svg>
              Copy Conversation
            </div>
            <div scMenuSeparator></div>
            <div
              scMenuItem
              value="Delete Conversation"
              class="text-destructive data-[active=true]:bg-destructive/10 hover:bg-destructive/10"
            >
              <svg siTrashIcon></svg>
              Delete Conversation
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupMenuButtonDemo {}
