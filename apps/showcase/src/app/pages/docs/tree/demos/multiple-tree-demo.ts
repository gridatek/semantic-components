import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScTree,
  ScTreeGroup,
  ScTreeGroupContent,
  ScTreeItem,
  ScTreeItemIndicator,
  ScTreeItemLabel,
} from '@semantic-components/ui';
import {
  SiArchiveIcon,
  SiChevronRightIcon,
  SiFolderIcon,
  SiInboxIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

interface Folder {
  id: string;
  name: string;
  icon?: 'inbox' | 'archive' | 'trash';
  children?: Folder[];
}

const FOLDERS: Folder[] = [
  {
    id: 'inbox',
    name: 'Inbox',
    icon: 'inbox',
    children: [
      { id: 'clients', name: 'Clients' },
      { id: 'team', name: 'Team' },
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    children: [
      { id: 'alpha', name: 'Alpha' },
      { id: 'beta', name: 'Beta' },
    ],
  },
  { id: 'archive', name: 'Archive', icon: 'archive' },
  { id: 'trash', name: 'Trash', icon: 'trash' },
];

/** Several at once: a click adds or removes one, Shift + click a range; Shift + arrows extend it, Ctrl or ⌘ + A selects all. A press on a folder selects it, its chevron opens it. */
@Component({
  selector: 'app-multiple-tree-demo',
  imports: [
    NgTemplateOutlet,
    ScFrame,
    ScTree,
    ScTreeGroup,
    ScTreeGroupContent,
    ScTreeItem,
    ScTreeItemIndicator,
    ScTreeItemLabel,
    SiArchiveIcon,
    SiChevronRightIcon,
    SiFolderIcon,
    SiInboxIcon,
    SiTrash2Icon,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <div scFrame class="w-64 p-2">
        <ul
          scTree
          aria-label="Mail folders"
          mode="multiple"
          [expandOnPress]="false"
          [(expanded)]="expanded"
          [(value)]="selected"
        >
          <ng-container
            [ngTemplateOutlet]="branch"
            [ngTemplateOutletContext]="{ $implicit: folders }"
            ngTemplateOutletInjector="outlet"
          />
        </ul>
      </div>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        {{ selected().length }} selected
      </p>
    </div>

    <ng-template #branch let-folders>
      @for (folder of folders; track folder.id) {
        <li scTreeItem [value]="folder.id">
          <div scTreeItemLabel>
            <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
            @switch (folder.icon) {
              @case ('inbox') {
                <svg siInboxIcon></svg>
              }
              @case ('archive') {
                <svg siArchiveIcon></svg>
              }
              @case ('trash') {
                <svg siTrash2Icon></svg>
              }
              @default {
                <svg siFolderIcon></svg>
              }
            }
            {{ folder.name }}
          </div>
          @if (folder.children) {
            <ul scTreeGroup>
              <ng-template scTreeGroupContent>
                <ng-container
                  [ngTemplateOutlet]="branch"
                  [ngTemplateOutletContext]="{ $implicit: folder.children }"
                  ngTemplateOutletInjector="outlet"
                />
              </ng-template>
            </ul>
          }
        </li>
      }
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleTreeDemo {
  private readonly folders = FOLDERS;
  private readonly expanded = signal(['inbox']);
  private readonly selected = signal<string[]>([]);
}
