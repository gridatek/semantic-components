import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** A menu's trigger as a widget: the arrows reach it, Enter opens its menu. */
@Component({
  selector: 'app-menu-toolbar-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    SiChevronDownIcon,
  ],
  template: `
    <div scToolbar aria-label="Document">
      <button scToolbarWidget scButton variant="ghost" size="sm">Save</button>
      <button scToolbarWidget scButton variant="ghost" size="sm">Share</button>
      <div scToolbarSeparator></div>
      <div scMenuProvider>
        <button
          scToolbarWidget
          scButton
          scMenuTrigger
          variant="ghost"
          size="sm"
        >
          Export
          <svg siChevronDownIcon></svg>
        </button>
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="pdf">PDF</div>
              <div scMenuItem value="docx">Word</div>
              <div scMenuItem value="md">Markdown</div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuToolbarDemo {}
