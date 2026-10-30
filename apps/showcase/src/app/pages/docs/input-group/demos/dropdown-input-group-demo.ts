import { Component, ViewEncapsulation } from '@angular/core';
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
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    SiChevronDownIcon,
    SiEllipsisIcon,
  ],
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div scInputGroup>
        <input scInput placeholder="Enter file name" aria-label="File name" />
        <div scInputGroupAddon align="inline-end">
          <div scMenuProvider align="end">
            <button scInputGroupButton scMenuTrigger size="icon-xs">
              <svg siEllipsisIcon></svg>
              <span class="sr-only">More</span>
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
        <input
          scInput
          placeholder="Enter search query"
          aria-label="Search query"
        />
        <div scInputGroupAddon align="inline-end">
          <div scMenuProvider align="end">
            <button scInputGroupButton scMenuTrigger class="pe-1.5! text-xs">
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
})
export class DropdownInputGroupDemo {}
