import { Component, ViewEncapsulation, input } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiDownloadIcon,
  SiFileTextIcon,
  SiImageIcon,
  SiPlusIcon,
  SiVideoIcon,
} from '@semantic-icons/lucide-icons';
import { type Asset, type AssetType } from './media-data';

const TYPE_LABEL: Record<AssetType, string> = {
  JPEG: 'Image / JPEG',
  PNG: 'Image / PNG',
  WEBP: 'Image / WEBP',
  MP4: 'Video / MP4',
  PDF: 'Document / PDF',
};

/** The selected asset: its preview, facts, tags, where it is used. */
@Component({
  selector: 'app-asset-details',
  imports: [
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemTitle,
    ScSeparator,
    SiDownloadIcon,
    SiFileTextIcon,
    SiImageIcon,
    SiPlusIcon,
    SiVideoIcon,
  ],
  template: `
    <div scCard class="gap-0">
      <div scCardBody class="flex flex-col gap-6">
        <div
          class="bg-muted/60 text-muted-foreground/60 ring-border/70 flex aspect-5/4 items-center justify-center ring-1 ring-inset"
        >
          @switch (asset().type) {
            @case ('MP4') {
              <svg siVideoIcon class="size-8"></svg>
            }
            @case ('PDF') {
              <svg siFileTextIcon class="size-8"></svg>
            }
            @default {
              <svg siImageIcon class="size-8"></svg>
            }
          }
        </div>
        <h2 class="font-heading line-clamp-2 text-xl tracking-wide">
          {{ asset().name }}
        </h2>
        <div scSeparator></div>
        <dl class="flex flex-col gap-5 text-sm">
          <div class="flex flex-col gap-1.5">
            <dt
              class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
            >
              Asset Type
            </dt>
            <dd>{{ typeLabel[asset().type] }}</dd>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <dt
                class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
              >
                Dimensions
              </dt>
              <dd>{{ asset().dimensions }}</dd>
            </div>
            <div class="flex flex-col gap-1.5">
              <dt
                class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
              >
                File Size
              </dt>
              <dd>{{ asset().size }}</dd>
            </div>
          </div>
        </dl>
        <div scSeparator></div>
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <h3
              class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
            >
              Tags
            </h3>
            <button scButton variant="ghost" size="icon-xs">
              <svg siPlusIcon></svg>
              <span class="sr-only">Add tag</span>
            </button>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            @for (tag of asset().tags; track tag) {
              <span scBadge>{{ tag }}</span>
            }
          </div>
        </div>
        <div scSeparator></div>
        <div class="flex flex-col gap-3">
          <h3
            class="text-muted-foreground text-[0.625rem] font-semibold tracking-widest uppercase"
          >
            Used In
          </h3>
          <div class="flex flex-col gap-2">
            @for (usage of asset().usedIn; track usage.title) {
              <div scItem variant="outline">
                <div scItemBody>
                  <div scItemTitle>{{ usage.title }}</div>
                  <p scItemDescription>{{ usage.role }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div scCardFooter class="mt-6 border-t pt-6">
        <button scButton class="w-full">
          <svg siDownloadIcon data-icon="inline-start"></svg>
          Download
        </button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class AssetDetails {
  readonly asset = input.required<Asset>();
  protected readonly typeLabel = TYPE_LABEL;
}
