import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { ScMenu, ScMenuItem, ScMenuTriggerFor, ScToggle, ScTooltip } from '@semantic-components/ui';
import { SiPaletteIcon } from '@semantic-icons/lucide-icons';

import { ScEditor } from '../../editor';
import { ScExtensions } from '../../extensions/extensions';
import { colors } from './colors';

@Component({
  selector: 'sc-editor-color',
  imports: [ScMenuTriggerFor, ScMenu, ScMenuItem, ScToggle, ScTooltip, SiPaletteIcon],
  template: `
    <button
      [scMenuTriggerFor]="colorMenu"
      sc-toggle
      variant="outline"
      size="sm"
      scTooltip="Text color"
      type="button"
    >
      <svg class="w-4 h-4" si-palette-icon></svg>
    </button>

    <ng-template #colorMenu>
      <div class="min-w-[12rem]" sc-menu>
        <div class="p-2">
          <div
            class="group mb-3 grid grid-cols-6 items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <input
              class="col-span-3 h-8 w-full rounded-md border border-gray-200 bg-gray-50 p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-700"
              #colorInput
              (change)="setCustomColor(colorInput.value)"
              type="color"
              value="#e66465"
            />
            <label
              class="col-span-3 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
            >
              Pick a color
            </label>
          </div>
          <div class="mb-3 grid grid-cols-6 gap-1">
            @for (color of colors; track $index) {
              <button
                class="size-6 rounded-md border border-gray-200 dark:border-gray-600"
                [style.background-color]="color"
                (click)="setColor(color)"
                type="button"
                sc-menu-item
              >
                <span class="sr-only">{{ color }}</span>
              </button>
            }
          </div>
          <button class="w-full text-center" (click)="resetColor()" sc-menu-item type="button">
            Reset color
          </button>
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorColor {
  private readonly parent = inject(ScEditor);
  private readonly extensions = inject(ScExtensions);

  readonly colors = colors;

  constructor() {
    this.extensions.color.set(true);
  }

  get editor() {
    return this.parent.editor;
  }

  resetColor() {
    this.editor.commands.unsetColor();
  }

  setColor(color: string) {
    this.editor.chain().focus().setColor(color).run();
  }

  setCustomColor(color: string) {
    this.editor.chain().focus().setColor(color).run();
  }
}
