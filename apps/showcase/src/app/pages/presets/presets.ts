import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import type { ScPresetName } from '@semantic-components/presets';
import {
  ScFrame,
  ScMenu,
  ScMenuContent,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuTrigger,
  ScThemeManager,
  type ScThemeMode,
} from '@semantic-components/ui';
import {
  SiBaselineIcon,
  SiCaseSensitiveIcon,
  SiChartColumnIcon,
  SiCheckIcon,
  SiCircleIcon,
  SiMonitorIcon,
  SiMoonIcon,
  SiPaintBucketIcon,
  SiPaletteIcon,
  SiShapesIcon,
  SiSquareRoundCornerIcon,
  SiSunIcon,
  SiTypeIcon,
} from '@semantic-icons/lucide-icons';
import { PRESETS, storePreset, storedPreset } from '../../presets';
import { PreviewCards } from './cards/preview-cards';

/**
 * Presets, as shadcn's Create: the options as cards on the left, the
 * components in that look on the right. Only the style can change for now:
 * a preset is set when the app starts, so picking one saves it and reloads.
 */
@Component({
  selector: 'app-presets',
  imports: [
    SiSunIcon,
    SiMoonIcon,
    SiMonitorIcon,
    PreviewCards,
    ScFrame,
    ScMenu,
    ScMenuContent,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuTrigger,
    SiBaselineIcon,
    SiCaseSensitiveIcon,
    SiChartColumnIcon,
    SiCheckIcon,
    SiCircleIcon,
    SiPaintBucketIcon,
    SiPaletteIcon,
    SiShapesIcon,
    SiSquareRoundCornerIcon,
    SiTypeIcon,
  ],
  template: `
    <h1 class="sr-only">Presets</h1>
    <div class="flex flex-col gap-4 p-4 md:flex-row md:items-start">
      <section
        aria-label="Options"
        scFrame
        class="bg-card text-card-foreground shrink-0 p-3 md:sticky md:top-18 md:max-h-[calc(100svh-5.5rem)] md:w-52 md:overflow-y-auto"
      >
        <ul
          class="flex gap-2.5 overflow-x-auto py-px md:flex-col md:gap-3 md:overflow-visible"
        >
          <li>
            <div scMenuProvider align="start">
              <button scMenuTrigger scFrame type="button" [class]="card">
                <span class="flex flex-col">
                  <span class="text-muted-foreground text-xs">Style</span>
                  <span class="text-sm font-medium capitalize">{{
                    current
                  }}</span>
                </span>
                <svg siSquareRoundCornerIcon [class]="icon"></svg>
              </button>
              <ng-template scMenuPortal>
                <div scMenu class="w-48">
                  <ng-template scMenuContent>
                    <div
                      scMenuRadioGroup
                      [value]="current"
                      (valueChange)="choose($event)"
                    >
                      @for (name of names; track name) {
                        <div scMenuRadioItem [value]="name">
                          <span class="capitalize">{{ name }}</span>
                          <span scMenuItemIndicator>
                            <svg siCheckIcon></svg>
                          </span>
                        </div>
                      }
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>
          </li>
          <li>
            <div scMenuProvider align="start">
              <button scMenuTrigger scFrame type="button" [class]="card">
                <span class="flex flex-col">
                  <span class="text-muted-foreground text-xs">Mode</span>
                  <span class="text-sm font-medium">{{ modeLabel() }}</span>
                </span>
                @switch (themeManager.mode()) {
                  @case ('light') {
                    <svg siSunIcon [class]="icon"></svg>
                  }
                  @case ('dark') {
                    <svg siMoonIcon [class]="icon"></svg>
                  }
                  @default {
                    <svg siMonitorIcon [class]="icon"></svg>
                  }
                }
              </button>
              <ng-template scMenuPortal>
                <div scMenu class="w-48">
                  <ng-template scMenuContent>
                    <div
                      scMenuRadioGroup
                      [value]="themeManager.mode()"
                      (valueChange)="setMode($event)"
                    >
                      @for (mode of modes; track mode.value) {
                        <div scMenuRadioItem [value]="mode.value">
                          {{ mode.label }}
                          <span scMenuItemIndicator>
                            <svg siCheckIcon></svg>
                          </span>
                        </div>
                      }
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>
          </li>
          @for (option of soon; track option.label) {
            <li>
              <button type="button" scFrame disabled [class]="card">
                <span class="flex flex-col">
                  <span class="text-muted-foreground text-xs">{{
                    option.label
                  }}</span>
                  <span class="text-sm font-medium">{{ option.value }}</span>
                </span>
                @switch (option.icon) {
                  @case ('color') {
                    <svg siCircleIcon [class]="icon"></svg>
                  }
                  @case ('theme') {
                    <svg siPaletteIcon [class]="icon"></svg>
                  }
                  @case ('chart') {
                    <svg siChartColumnIcon [class]="icon"></svg>
                  }
                  @case ('heading') {
                    <svg siCaseSensitiveIcon [class]="icon"></svg>
                  }
                  @case ('font') {
                    <svg siTypeIcon [class]="icon"></svg>
                  }
                  @case ('icons') {
                    <svg siShapesIcon [class]="icon"></svg>
                  }
                  @case ('radius') {
                    <svg siBaselineIcon [class]="icon"></svg>
                  }
                  @default {
                    <svg siPaintBucketIcon [class]="icon"></svg>
                  }
                }
              </button>
            </li>
          }
        </ul>
        <p class="text-muted-foreground mt-3 px-1 text-xs">
          Only the style can change for now; more options are coming.
        </p>
      </section>

      <div scFrame class="bg-muted min-w-0 flex-1 p-4 md:p-6">
        <app-preview-cards />
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class Presets {
  private readonly window = inject(DOCUMENT).defaultView;

  protected readonly names = Object.keys(PRESETS) as ScPresetName[];
  protected readonly current = storedPreset();

  protected readonly themeManager = inject(ScThemeManager);
  protected readonly modes: readonly { value: ScThemeMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  protected readonly modeLabel = computed(
    () => this.modes.find((m) => m.value === this.themeManager.mode())?.label,
  );

  protected setMode(value: string | null): void {
    const mode = this.modes.find((m) => m.value === value);
    if (mode) this.themeManager.setMode(mode.value);
  }

  /** An option's card: its name and value, an icon at the end. */
  protected readonly card =
    'relative flex w-36 shrink-0 items-center justify-between gap-2 px-2.5 py-2 text-start select-none hover:bg-muted focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none aria-expanded:bg-muted disabled:pointer-events-none disabled:opacity-50 md:w-full';
  protected readonly icon = 'size-4 shrink-0';

  /** The options still to come, as shadcn's Create lists them. */
  protected readonly soon = [
    { label: 'Base Color', value: 'Neutral', icon: 'color' },
    { label: 'Theme', value: 'Neutral', icon: 'theme' },
    { label: 'Chart Color', value: 'Neutral', icon: 'chart' },
    { label: 'Heading', value: 'Geist', icon: 'heading' },
    { label: 'Font', value: 'Geist', icon: 'font' },
    { label: 'Icon Library', value: 'Lucide', icon: 'icons' },
    { label: 'Radius', value: 'Default', icon: 'radius' },
    { label: 'Menu', value: 'Default / Solid', icon: 'menu' },
  ] as const;

  protected choose(name: string | null): void {
    if (!name || name === this.current) return;
    storePreset(name as ScPresetName);
    this.window?.location.reload();
  }
}
