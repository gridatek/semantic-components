import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, computed, inject } from '@angular/core';
import type { ScStyleName } from '@semantic-components/styles';
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
  type ScMode,
  ScStorage,
  ScThemeManager,
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
import { STYLES, storeStyle, styleFrom } from '../../styles';
import { PreviewCards } from './cards/preview-cards';

/**
 * Customize, as shadcn's Create: the options as cards on the left, the
 * components in that look on the right — for the whole site. Only the style
 * and the mode change for now. The style is set when the app starts, so
 * picking one saves it and reloads.
 */
@Component({
  selector: 'app-customize',
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
    <h1 class="sr-only">Customize</h1>
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
            <div scMenuProvider alignment="start">
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
                        <div scMenuRadioItem closeOnClick [value]="name">
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
            <div scMenuProvider alignment="start">
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
                        <div scMenuRadioItem closeOnClick [value]="mode.value">
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
          The style and the mode you pick here apply to the whole site. Only
          these two can change for now; more options are coming.
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
export default class Customize {
  private readonly window = inject(DOCUMENT).defaultView;

  private readonly names = Object.keys(STYLES) as ScStyleName[];
  private readonly current = styleFrom(inject(ScStorage));

  private readonly themeManager = inject(ScThemeManager);
  private readonly modes: readonly { value: ScMode; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];
  private readonly modeLabel = computed(
    () => this.modes.find((m) => m.value === this.themeManager.mode())?.label,
  );

  private setMode(value: string | null): void {
    const mode = this.modes.find((m) => m.value === value);
    if (mode) this.themeManager.setMode(mode.value);
  }

  /** An option's card: its name and value, an icon at the end. */
  private readonly card =
    'relative flex w-36 shrink-0 items-center justify-between gap-2 px-2.5 py-2 text-start select-none hover:bg-muted focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none aria-expanded:bg-muted disabled:pointer-events-none disabled:opacity-50 md:w-full';
  private readonly icon = 'size-4 shrink-0';

  /** The options still to come, as shadcn's Create lists them. */
  private readonly soon = [
    { label: 'Base Color', value: 'Neutral', icon: 'color' },
    { label: 'Theme', value: 'Neutral', icon: 'theme' },
    { label: 'Chart Color', value: 'Neutral', icon: 'chart' },
    { label: 'Heading', value: 'Geist', icon: 'heading' },
    { label: 'Font', value: 'Geist', icon: 'font' },
    { label: 'Icon Library', value: 'Lucide', icon: 'icons' },
    { label: 'Radius', value: 'Default', icon: 'radius' },
    { label: 'Menu', value: 'Default / Solid', icon: 'menu' },
  ] as const;

  private choose(name: string | null): void {
    if (!name || name === this.current) return;
    storeStyle(name as ScStyleName);
    this.window?.location.reload();
  }
}
