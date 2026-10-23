import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import type { ScPresetName } from '@semantic-components/presets';
import {
  ScButton,
  ScSheet,
  ScSheetClose,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiPaletteIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { PRESETS, storePreset, storedPreset } from '../../presets';

/**
 * The preset sheet: a button that opens, on the right, shadcn's styles to
 * pick from. A preset is set when the app starts, so picking one saves it and
 * reloads the page.
 */
@Component({
  selector: 'app-preset-sheet',
  imports: [
    ScButton,
    ScSheet,
    ScSheetClose,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetProvider,
    ScSheetTitle,
    ScSheetTrigger,
    SiCheckIcon,
    SiPaletteIcon,
    SiXIcon,
  ],
  template: `
    <div scSheetProvider>
      <button scButton scSheetTrigger variant="ghost" size="icon">
        <svg siPaletteIcon></svg>
        <span class="sr-only">Change preset</span>
      </button>
      <ng-template scSheetPortal>
        <div scSheet>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scSheetHeader>
            <h2 scSheetTitle>Preset</h2>
            <p scSheetDescription>
              shadcn's styles. A preset is set when the app starts: picking one
              reloads the page.
            </p>
          </div>
          <ul class="grid gap-2 overflow-y-auto px-4 pb-4">
            @for (name of names; track name) {
              <li>
                <button
                  scButton
                  variant="outline"
                  class="h-auto w-full justify-between py-2"
                  [attr.aria-pressed]="name === current"
                  (click)="choose(name)"
                >
                  <span class="flex items-center gap-2">
                    @if (name === current) {
                      <svg siCheckIcon></svg>
                    }
                    <span class="font-medium capitalize">{{ name }}</span>
                  </span>
                  <span [class]="sample(name)" aria-hidden="true">Button</span>
                </button>
              </li>
            }
          </ul>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class PresetSheet {
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly names = Object.keys(PRESETS) as ScPresetName[];
  protected readonly current = storedPreset();

  /** The preset's own button, small: how it looks. */
  protected sample(name: ScPresetName): string {
    return PRESETS[name].button({ size: 'sm' });
  }

  protected choose(name: ScPresetName): void {
    if (name === this.current) return;
    storePreset(name);
    this.window?.location.reload();
  }
}
