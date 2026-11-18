import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScInput,
  ScLabel,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScToggle,
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  ScEditorBlock,
  type ScEditorBlockType,
  ScEditorCommand,
  ScEditorLink,
} from '@semantic-components/ui/editor';
import { ScEditorImage } from '@semantic-components/ui/editor/images';
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
  SiUnlinkIcon,
} from '@semantic-icons/lucide-icons';

/** The block menu's labels; another block (a quote, code) reads as text. */
const BLOCK_LABEL: Partial<Record<ScEditorBlockType, string>> = {
  paragraph: 'Normal Text',
  'heading-1': 'Heading 1',
  'heading-2': 'Heading 2',
  'heading-3': 'Heading 3',
  'bullet-list': 'Bullet List',
  'ordered-list': 'Numbered List',
};

/**
 * The editor's toolbar, as shadcn draws it — the text style, marks,
 * alignment, link and image, undo and redo — on the library's editor: every
 * button does what it says. Goes inside the `scEditor`.
 */
@Component({
  selector: 'app-editor-toolbar',
  imports: [
    FormField,
    ScButton,
    ScEditorCommand,
    ScEditorBlock,
    ScEditorImage,
    ScEditorLink,
    ScField,
    ScInput,
    ScLabel,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScToggle,
    ScToolbar,
    ScToolbarSeparator,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
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
    SiUnlinkIcon,
  ],
  template: `
    <div
      scToolbar
      aria-label="Formatting"
      class="w-full flex-nowrap justify-start gap-0 border-b bg-transparent p-2 shadow-none ring-0"
    >
      <div scToolbarWidgetGroup>
        <div scMenuProvider>
          <button
            scToolbarWidget
            scToggle
            scMenuTrigger
            scEditorBlock
            #block="scEditorBlock"
            class="gap-1.5 px-2.5"
          >
            {{ labels[block.value()] ?? labels.paragraph }}
            <svg siChevronDownIcon data-icon="inline-end"></svg>
          </button>
          <ng-template scMenuPortal>
            <div scMenu (itemSelected)="block.select($event)">
              <ng-template scMenuContent>
                <div scMenuItem value="paragraph">
                  <svg siTypeIcon></svg> Normal Text
                </div>
                <div scMenuItem value="heading-1">
                  <svg siHeading1Icon></svg> Heading 1
                </div>
                <div scMenuItem value="heading-2">
                  <svg siHeading2Icon></svg> Heading 2
                </div>
                <div scMenuItem value="heading-3">
                  <svg siHeading3Icon></svg> Heading 3
                </div>
                <div scMenuItem value="bullet-list">
                  <svg siListIcon></svg> Bullet List
                </div>
                <div scMenuItem value="ordered-list">
                  <svg siListOrderedIcon></svg> Numbered List
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
      </div>
      <div scToolbarSeparator class="mx-2"></div>
      <div scToolbarWidgetGroup>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="bold"
          class="size-8 min-w-8 px-0"
        >
          <svg siBoldIcon></svg><span class="sr-only">Bold</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="italic"
          class="size-8 min-w-8 px-0"
        >
          <svg siItalicIcon></svg><span class="sr-only">Italic</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="underline"
          class="size-8 min-w-8 px-0"
        >
          <svg siUnderlineIcon></svg><span class="sr-only">Underline</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="strikethrough"
          class="size-8 min-w-8 px-0 max-md:hidden"
        >
          <svg siStrikethroughIcon></svg
          ><span class="sr-only">Strikethrough</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="code"
          class="size-8 min-w-8 px-0 max-md:hidden"
        >
          <svg siCodeXmlIcon></svg><span class="sr-only">Code</span>
        </button>
      </div>
      <div scToolbarSeparator class="mx-2 max-md:hidden"></div>
      <div scToolbarWidgetGroup class="max-md:hidden">
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="align-left"
          class="size-8 min-w-8 px-0"
        >
          <svg siTextAlignStartIcon></svg
          ><span class="sr-only">Align Left</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="align-center"
          class="size-8 min-w-8 px-0"
        >
          <svg siTextAlignCenterIcon></svg
          ><span class="sr-only">Align Center</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="align-right"
          class="size-8 min-w-8 px-0"
        >
          <svg siTextAlignEndIcon></svg><span class="sr-only">Align Right</span>
        </button>
      </div>
      <div scToolbarSeparator class="mx-2 max-md:hidden"></div>
      <div scToolbarWidgetGroup class="max-md:hidden">
        <div scPopoverProvider [(open)]="linkOpen">
          <button
            scToolbarWidget
            scToggle
            scEditorLink
            scPopoverTrigger
            class="size-8 min-w-8 px-0"
            #link="scEditorLink"
            (click)="editLink(link.href())"
          >
            <svg siLinkIcon></svg><span class="sr-only">Link</span>
          </button>
          <ng-template scPopoverPortal>
            <div scPopover aria-label="Link" class="w-80">
              <div class="flex items-end gap-2">
                <div scField class="flex-1">
                  <label scLabel>Address</label>
                  <input
                    scInput
                    type="url"
                    placeholder="https://"
                    [formField]="linkForm.href"
                    (keydown.enter)="applyLink(link)"
                  />
                </div>
                <button scButton type="button" (click)="applyLink(link)">
                  Apply
                </button>
              </div>
              @if (link.href()) {
                <button
                  scButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  class="self-start"
                  (click)="removeLink(link)"
                >
                  <svg siUnlinkIcon data-icon="inline-start"></svg>
                  Remove link
                </button>
              }
            </div>
          </ng-template>
        </div>
        <button
          scToolbarWidget
          scToggle
          scEditorImage
          class="size-8 min-w-8 px-0"
        >
          <svg siImageIcon></svg><span class="sr-only">Image</span>
        </button>
      </div>
      <div scToolbarWidgetGroup class="ms-auto">
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="undo"
          class="size-8 min-w-8 px-0"
        >
          <svg siUndoIcon></svg><span class="sr-only">Undo</span>
        </button>
        <button
          scToolbarWidget
          scToggle
          scEditorCommand="redo"
          class="size-8 min-w-8 px-0"
        >
          <svg siRedoIcon></svg><span class="sr-only">Redo</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorToolbar {
  private readonly labels = BLOCK_LABEL;

  private readonly linkOpen = signal(false);
  private readonly linkForm = form(signal({ href: '' }));

  private editLink(href: string | null): void {
    this.linkForm.href().value.set(href ?? '');
  }

  private applyLink(link: ScEditorLink): void {
    const href = this.linkForm.href().value().trim();
    if (href) link.set(href);
    else link.remove();
    this.linkOpen.set(false);
  }

  private removeLink(link: ScEditorLink): void {
    link.remove();
    this.linkOpen.set(false);
  }
}
