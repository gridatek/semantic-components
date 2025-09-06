import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import {
  ScMenu,
  ScMenuGroup,
  ScMenuItem,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuTriggerFor,
} from '@semantic-components/ui';
import { ScToggle, ScTooltip } from '@semantic-components/ui';
import { ScPlatformService } from '@semantic-components/utils';
import { SiHeading1Icon, SiPilcrowIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../editor';

@Component({
  selector: 'sc-editor-heading-and-paragraph-format',
  imports: [
    ScMenuShortcut,
    ScMenuSeparator,
    ScMenuGroup,
    ScMenuItem,
    ScMenuTriggerFor,
    ScMenu,
    ScToggle,
    ScTooltip,
    SiHeading1Icon,
    SiPilcrowIcon,
  ],
  template: `
    <button
      class="inline-flex items-center gap-2 min-w-[140px] justify-start"
      [scMenuTriggerFor]="menu"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Heading and paragraph formatting"
      type="button"
      aria-label="Heading and paragraph formatting options"
    >
      <svg class="w-4 h-4 shrink-0" si-pilcrow-icon></svg>
      <span class="text-sm font-medium truncate">{{ getCurrentFormat() }}</span>
    </button>

    <ng-template #menu>
      <div class="min-w-[280px]" sc-menu>
        <sc-menu-group>
          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setParagraph()"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-pilcrow-icon></svg>
            <div class="flex-1">
              <div class="text-sm font-medium">Normal text</div>
              <div class="text-xs text-muted-foreground">Regular paragraph text</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+0') }}</span>
          </button>
        </sc-menu-group>

        <hr sc-menu-separator />

        <sc-menu-group>
          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setHeading(1)"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-heading-1-icon></svg>
            <div class="flex-1">
              <div class="text-lg font-bold">Heading 1</div>
              <div class="text-xs text-muted-foreground">Large section heading</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+1') }}</span>
          </button>

          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setHeading(2)"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-heading-1-icon></svg>
            <div class="flex-1">
              <div class="text-base font-bold">Heading 2</div>
              <div class="text-xs text-muted-foreground">Medium section heading</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+2') }}</span>
          </button>

          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setHeading(3)"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-heading-1-icon></svg>
            <div class="flex-1">
              <div class="text-sm font-bold">Heading 3</div>
              <div class="text-xs text-muted-foreground">Small section heading</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+3') }}</span>
          </button>

          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setHeading(4)"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-heading-1-icon></svg>
            <div class="flex-1">
              <div class="text-sm font-semibold">Heading 4</div>
              <div class="text-xs text-muted-foreground">Subsection heading</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+4') }}</span>
          </button>

          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setHeading(5)"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-heading-1-icon></svg>
            <div class="flex-1">
              <div class="text-xs font-semibold">Heading 5</div>
              <div class="text-xs text-muted-foreground">Minor heading</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+5') }}</span>
          </button>

          <button
            class="flex items-center gap-3 text-left w-full"
            (click)="setHeading(6)"
            sc-menu-item
            role="menuitem"
          >
            <svg class="w-4 h-4 text-muted-foreground shrink-0" si-heading-1-icon></svg>
            <div class="flex-1">
              <div class="text-xs font-medium">Heading 6</div>
              <div class="text-xs text-muted-foreground">Smallest heading</div>
            </div>
            <span sc-menu-shortcut>{{ formatShortcut('Alt+6') }}</span>
          </button>
        </sc-menu-group>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorHeadingAndParagraphFormat {
  private readonly parent = inject(ScEditor);
  private readonly platformService = inject(ScPlatformService);

  get editor() {
    return this.parent.editor;
  }

  formatShortcut(shortcut: string): string {
    return this.platformService.formatShortcut(shortcut);
  }

  setParagraph() {
    this.editor.chain().focus().setParagraph().run();
  }

  setHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    this.editor.chain().focus().toggleHeading({ level }).run();
  }

  getCurrentFormat(): string {
    if (!this.editor) return 'Normal text';

    const { $from } = this.editor.state.selection;
    const node = $from.node();

    if (node.type.name === 'heading') {
      const level = node.attrs['level'];
      return `Heading ${level}`;
    }

    return 'Normal text';
  }
}
