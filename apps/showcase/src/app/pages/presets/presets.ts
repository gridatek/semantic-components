import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
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
} from '@semantic-components/ui';
import {
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
} from '@semantic-icons/lucide-icons';
import { PRESETS, storePreset, storedPreset } from '../../presets';
import { HomeClaimableBalance } from '../home/cards/claimable-balance';
import { HomeContributionHistory } from '../home/cards/contribution-history';
import { HomeEmptyDistributeTrack } from '../home/cards/empty-distribute-track';
import { HomePayments } from '../home/cards/payments';
import { HomePayoutThreshold } from '../home/cards/payout-threshold';
import { HomeQrConnect } from '../home/cards/qr-connect';
import { HomeSavingsTargets } from '../home/cards/savings-targets';

/**
 * Presets, as shadcn's Create: the options as cards on the left, the
 * components in that look on the right. Only the style can change for now:
 * a preset is set when the app starts, so picking one saves it and reloads.
 */
@Component({
  selector: 'app-presets',
  imports: [
    HomeClaimableBalance,
    HomeContributionHistory,
    HomeEmptyDistributeTrack,
    HomePayments,
    HomePayoutThreshold,
    HomeQrConnect,
    HomeSavingsTargets,
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
        class="shrink-0 rounded-2xl bg-neutral-900 p-3 text-neutral-50 md:sticky md:top-4 md:w-52"
      >
        <ul
          class="flex gap-2.5 overflow-x-auto py-px md:flex-col md:gap-3 md:overflow-visible"
        >
          <li>
            <div scMenuProvider align="start">
              <button scMenuTrigger type="button" [class]="card">
                <span class="flex flex-col">
                  <span class="text-xs text-neutral-400">Style</span>
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
          @for (option of soon; track option.label) {
            <li>
              <button type="button" disabled [class]="card">
                <span class="flex flex-col">
                  <span class="text-xs text-neutral-400">{{
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
        <p class="mt-3 px-1 text-xs text-neutral-400">
          Only the style can change for now; more options are coming.
        </p>
      </section>

      <div scFrame class="bg-muted min-w-0 flex-1 p-4 md:p-6">
        <div class="grid items-start gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div class="flex flex-col gap-6">
            <app-home-contribution-history />
            <app-home-empty-distribute-track />
            <app-home-qr-connect />
          </div>
          <div class="flex flex-col gap-6">
            <app-home-payout-threshold />
            <app-home-claimable-balance />
          </div>
          <div class="hidden flex-col gap-6 xl:flex">
            <app-home-savings-targets />
            <app-home-payments />
          </div>
        </div>
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

  /** An option's card: its name and value, an icon at the end. */
  protected readonly card =
    'relative flex w-36 shrink-0 items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-start ring-1 ring-white/10 select-none hover:bg-white/5 focus-visible:ring-white/60 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:w-full';
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
