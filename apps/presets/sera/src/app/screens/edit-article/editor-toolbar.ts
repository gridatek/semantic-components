import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiBoldIcon,
  SiChevronDownIcon,
  SiCodeXmlIcon,
  SiHeading1Icon,
  SiHeading2Icon,
  SiHeading3Icon,
  SiImageIcon,
  SiItalicIcon,
  SiLinkIcon,
  SiListIcon,
  SiListOrderedIcon,
  SiRedoIcon,
  SiStrikethroughIcon,
  SiTextAlignCenterIcon,
  SiTextAlignEndIcon,
  SiTextAlignStartIcon,
  SiTypeIcon,
  SiUnderlineIcon,
  SiUndoIcon,
} from '@semantic-icons/lucide-icons';

/**
 * The editor's toolbar, as shadcn draws it (no editor behind it): the text
 * style, marks, alignment, link and image, undo and redo. Lucide's newer
 * names: TextAlignStart/Center/End (AlignLeft…), CodeXml (Code2).
 */
@Component({
  selector: 'app-editor-toolbar',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScSeparator,
    SiBoldIcon,
    SiChevronDownIcon,
    SiCodeXmlIcon,
    SiHeading1Icon,
    SiHeading2Icon,
    SiHeading3Icon,
    SiImageIcon,
    SiItalicIcon,
    SiLinkIcon,
    SiListIcon,
    SiListOrderedIcon,
    SiRedoIcon,
    SiStrikethroughIcon,
    SiTextAlignCenterIcon,
    SiTextAlignEndIcon,
    SiTextAlignStartIcon,
    SiTypeIcon,
    SiUnderlineIcon,
    SiUndoIcon,
  ],
  template: `
    <div class="flex border-b p-2">
      <div class="flex items-center">
        <div scMenuProvider>
          <button scButton scMenuTrigger variant="ghost" size="sm">
            Normal Text
            <svg siChevronDownIcon data-icon="inline-end"></svg>
          </button>
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                <div scMenuItem><svg siTypeIcon></svg> Normal Text</div>
                <div scMenuItem><svg siHeading1Icon></svg> Heading 1</div>
                <div scMenuItem><svg siHeading2Icon></svg> Heading 2</div>
                <div scMenuItem><svg siHeading3Icon></svg> Heading 3</div>
                <div scMenuItem><svg siListIcon></svg> Bullet List</div>
                <div scMenuItem>
                  <svg siListOrderedIcon></svg> Numbered List
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
        <div
          scSeparator
          orientation="vertical"
          class="mx-2 h-4 self-center"
        ></div>
        <button scButton variant="ghost" size="icon-sm">
          <svg siBoldIcon></svg><span class="sr-only">Bold</span>
        </button>
        <button scButton variant="ghost" size="icon-sm">
          <svg siItalicIcon></svg><span class="sr-only">Italic</span>
        </button>
        <button scButton variant="ghost" size="icon-sm">
          <svg siUnderlineIcon></svg><span class="sr-only">Underline</span>
        </button>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siStrikethroughIcon></svg
          ><span class="sr-only">Strikethrough</span>
        </button>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siCodeXmlIcon></svg><span class="sr-only">Code</span>
        </button>
        <div
          scSeparator
          orientation="vertical"
          class="mx-2 hidden h-4 self-center md:flex"
        ></div>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siTextAlignStartIcon></svg
          ><span class="sr-only">Align Left</span>
        </button>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siTextAlignCenterIcon></svg
          ><span class="sr-only">Align Center</span>
        </button>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siTextAlignEndIcon></svg><span class="sr-only">Align Right</span>
        </button>
        <div
          scSeparator
          orientation="vertical"
          class="mx-2 hidden h-4 self-center md:flex"
        ></div>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siLinkIcon></svg><span class="sr-only">Link</span>
        </button>
        <button scButton variant="ghost" size="icon-sm" class="hidden md:flex">
          <svg siImageIcon></svg><span class="sr-only">Image</span>
        </button>
      </div>
      <div class="ms-auto flex items-center">
        <button scButton variant="ghost" size="icon-sm">
          <svg siUndoIcon></svg><span class="sr-only">Undo</span>
        </button>
        <button scButton variant="ghost" size="icon-sm">
          <svg siRedoIcon></svg><span class="sr-only">Redo</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorToolbar {}
