import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dropdown-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScMenuProvider,
    ScMenuTrigger,
    ScMenuPortal,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    SiEllipsisIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div scInputGroup>
        <input scInput variant="group" placeholder="Enter file name" />
        <div scInputGroupAddon align="inline-end">
          <div scMenuProvider>
            <button
              scInputGroupButton
              scMenuTrigger
              variant="ghost"
              size="icon-xs"
              aria-label="More"
            >
              <svg siEllipsisIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Settings">Settings</div>
                  <div scMenuItem value="Copy path">Copy path</div>
                  <div scMenuItem value="Open location">Open location</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scInputGroup>
        <input scInput variant="group" placeholder="Enter search query" />
        <div scInputGroupAddon align="inline-end">
          <div scMenuProvider>
            <button
              scInputGroupButton
              scMenuTrigger
              variant="ghost"
              class="pr-1.5! text-xs"
            >
              Search In...
              <svg siChevronDownIcon class="size-3"></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Documentation">Documentation</div>
                  <div scMenuItem value="Blog Posts">Blog Posts</div>
                  <div scMenuItem value="Changelog">Changelog</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownInputGroupDemo {}
