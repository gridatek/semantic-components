import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
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
} from '@semantic-components/ui';
import {
  SC_EDITOR,
  ScEditorBold,
  ScEditorCode,
  ScEditorHeading,
  type ScEditorHeadingLevel,
  ScEditorItalic,
  ScEditorLink,
  ScEditorRedo,
  ScEditorSeparator,
  ScEditorStrikethrough,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderline,
  ScEditorUndo,
} from '@semantic-components/ui/editor';
import {
  ScEditorAlignCenter,
  ScEditorAlignLeft,
  ScEditorAlignRight,
} from '@semantic-components/ui/editor/align';
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

type Block = ScEditorHeadingLevel | 'bulletList' | 'orderedList';

const BLOCK_LABEL: Partial<Record<Block, string>> = {
  p: 'Normal Text',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  bulletList: 'Bullet List',
  orderedList: 'Numbered List',
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
    ScEditorAlignCenter,
    ScEditorAlignLeft,
    ScEditorAlignRight,
    ScEditorBold,
    ScEditorCode,
    ScEditorHeading,
    ScEditorImage,
    ScEditorItalic,
    ScEditorLink,
    ScEditorRedo,
    ScEditorSeparator,
    ScEditorStrikethrough,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorUnderline,
    ScEditorUndo,
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
      scEditorToolbar
      aria-label="Formatting"
      class="flex-nowrap justify-start gap-0 bg-transparent"
    >
      <div scEditorToolbarGroup>
        <div scMenuProvider>
          <button
            scEditorHeading
            scMenuTrigger
            value="block"
            #heading="scEditorHeading"
            class="w-auto gap-1.5 px-2.5"
          >
            {{ blockLabel() }}
            <svg siChevronDownIcon data-icon="inline-end"></svg>
          </button>
          <ng-template scMenuPortal>
            <div scMenu (itemSelected)="choose($event, heading)">
              <ng-template scMenuContent>
                <div scMenuItem value="p">
                  <svg siTypeIcon></svg> Normal Text
                </div>
                <div scMenuItem value="h1">
                  <svg siHeading1Icon></svg> Heading 1
                </div>
                <div scMenuItem value="h2">
                  <svg siHeading2Icon></svg> Heading 2
                </div>
                <div scMenuItem value="h3">
                  <svg siHeading3Icon></svg> Heading 3
                </div>
                <div scMenuItem value="bulletList">
                  <svg siListIcon></svg> Bullet List
                </div>
                <div scMenuItem value="orderedList">
                  <svg siListOrderedIcon></svg> Numbered List
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
      </div>
      <div scEditorSeparator class="mx-2"></div>
      <div scEditorToolbarGroup>
        <button scEditorBold value="bold">
          <svg siBoldIcon></svg><span class="sr-only">Bold</span>
        </button>
        <button scEditorItalic value="italic">
          <svg siItalicIcon></svg><span class="sr-only">Italic</span>
        </button>
        <button scEditorUnderline value="underline">
          <svg siUnderlineIcon></svg><span class="sr-only">Underline</span>
        </button>
        <button
          scEditorStrikethrough
          value="strikethrough"
          class="max-md:hidden"
        >
          <svg siStrikethroughIcon></svg
          ><span class="sr-only">Strikethrough</span>
        </button>
        <button scEditorCode value="code" class="max-md:hidden">
          <svg siCodeXmlIcon></svg><span class="sr-only">Code</span>
        </button>
      </div>
      <div scEditorSeparator class="mx-2 max-md:hidden"></div>
      <div scEditorToolbarGroup class="max-md:hidden">
        <button scEditorAlignLeft value="align-left">
          <svg siTextAlignStartIcon></svg
          ><span class="sr-only">Align Left</span>
        </button>
        <button scEditorAlignCenter value="align-center">
          <svg siTextAlignCenterIcon></svg
          ><span class="sr-only">Align Center</span>
        </button>
        <button scEditorAlignRight value="align-right">
          <svg siTextAlignEndIcon></svg><span class="sr-only">Align Right</span>
        </button>
      </div>
      <div scEditorSeparator class="mx-2 max-md:hidden"></div>
      <div scEditorToolbarGroup class="max-md:hidden">
        <div scPopoverProvider [(open)]="linkOpen">
          <button
            scEditorLink
            scPopoverTrigger
            value="link"
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
        <button scEditorImage value="image">
          <svg siImageIcon></svg><span class="sr-only">Image</span>
        </button>
      </div>
      <div scEditorToolbarGroup class="ms-auto">
        <button scEditorUndo value="undo">
          <svg siUndoIcon></svg><span class="sr-only">Undo</span>
        </button>
        <button scEditorRedo value="redo">
          <svg siRedoIcon></svg><span class="sr-only">Redo</span>
        </button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EditorToolbar {
  private readonly editor = inject(SC_EDITOR);

  /** The selection's block: the menu's label. */
  private readonly blockLabel = computed(() => {
    if (this.editor.isActive('bulletList')) return BLOCK_LABEL.bulletList;
    if (this.editor.isActive('orderedList')) return BLOCK_LABEL.orderedList;
    for (const level of [1, 2, 3] as const) {
      if (this.editor.isActive('heading', { level })) {
        return BLOCK_LABEL[`h${level}`];
      }
    }
    return BLOCK_LABEL.p;
  });

  private readonly linkOpen = signal(false);
  private readonly linkForm = form(signal({ href: '' }));

  /** A text style, or a list: lists on and off, as the editor's own menu. */
  private choose(value: unknown, heading: ScEditorHeading): void {
    if (value === 'bulletList') {
      this.editor.run((chain) => chain.toggleBulletList());
    } else if (value === 'orderedList') {
      this.editor.run((chain) => chain.toggleOrderedList());
    } else if (typeof value === 'string' && value in BLOCK_LABEL) {
      heading.select(value as ScEditorHeadingLevel);
    }
  }

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
