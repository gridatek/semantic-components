import { DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';

import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogContent,
  ScDialogHeader,
  ScDialogTitle,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

import { colors } from './colors';

export interface ColorData {
  color: string | null | undefined;
}

@Component({
  selector: 'sc-editor-color-dialog',
  imports: [
    ScDialog,
    ScDialogContent,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogClose,
    ScButton,
    ScLabel,
    ScInput,
    SiXIcon,
  ],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80" sc-dialog>
      <div class="mx-auto my-8 max-w-md" sc-dialog-content>
        <div sc-dialog-header>
          <h2 sc-dialog-title>Choose Text Color</h2>
          <button sc-dialog-close type="button">
            <svg class="h-4 w-4" si-x-icon></svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <div class="space-y-4">
          <!-- Color Palette -->
          <div>
            <label class="text-sm font-medium" sc-label>Color Palette</label>
            <div class="mt-2 grid grid-cols-8 gap-2">
              @for (color of colors; track $index) {
                <button
                  class="group size-8 rounded-md border-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                  [style.background-color]="color"
                  [attr.aria-label]="'Select color ' + color"
                  (click)="selectColor(color)"
                  type="button"
                >
                  <span class="sr-only">{{ color }}</span>
                </button>
              }
            </div>
          </div>

          <!-- Custom Color Picker -->
          <div>
            <label class="text-sm font-medium" sc-label for="custom-color">Custom Color</label>
            <div class="mt-2 flex items-center space-x-2">
              <input
                class="h-10 w-16 rounded border border-gray-200 bg-white cursor-pointer"
                id="custom-color"
                [value]="customColor()"
                (input)="updateCustomColor($event)"
                type="color"
              />
              <input
                class="flex-1"
                [value]="customColor()"
                (input)="updateCustomColorFromText($event)"
                sc-input
                type="text"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-between pt-4">
          <button (click)="resetAndClose()" sc-button variant="outline" type="button">
            Reset Color
          </button>
          <div class="space-x-2">
            <button (click)="dialogRef.close()" sc-button variant="outline" type="button">
              Cancel
            </button>
            <button (click)="applyColor()" sc-button type="button">Apply Color</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorColorDialog {
  dialogRef = inject<DialogRef<ColorData>>(DialogRef<ColorData>);

  readonly colors = colors;
  readonly customColor = signal('#000000');

  selectColor(color: string) {
    this.customColor.set(color);
  }

  updateCustomColor(event: Event) {
    const target = event.target as HTMLInputElement;
    this.customColor.set(target.value);
  }

  updateCustomColorFromText(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value.match(/^#[0-9a-fA-F]{6}$/)) {
      this.customColor.set(value);
    }
  }

  applyColor() {
    const color = this.customColor();
    this.dialogRef.close({ color });
  }

  resetAndClose() {
    this.dialogRef.close({ color: null });
  }
}
