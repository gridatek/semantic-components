import {
  Component,
  ViewEncapsulation,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScField,
  ScInput,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiDownloadIcon,
  SiFileTextIcon,
  SiImageIcon,
  SiPlusIcon,
  SiVideoIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { AssetActions } from './asset-actions';
import { type Asset, type AssetType } from './media-data';
import { MediaStore } from './media-store';

const TYPE_LABEL: Record<AssetType, string> = {
  JPEG: 'Image / JPEG',
  PNG: 'Image / PNG',
  WEBP: 'Image / WEBP',
  MP4: 'Video / MP4',
  PDF: 'Document / PDF',
};

/** The selected asset: its preview, facts, tags (added, removed), where it is used, its download. */
@Component({
  selector: 'app-asset-details',
  imports: [
    FormField,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScField,
    ScInput,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemTitle,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScSeparator,
    SiDownloadIcon,
    SiFileTextIcon,
    SiImageIcon,
    SiPlusIcon,
    SiVideoIcon,
    SiXIcon,
  ],
  template: `
    <div scCard class="gap-0">
      <div scCardBody class="flex flex-col gap-6">
        <div
          class="bg-muted/60 text-muted-foreground/60 ring-border/70 flex aspect-5/4 items-center justify-center overflow-hidden ring-1 ring-inset"
        >
          @if (asset().url && asset().type === 'MP4') {
            <video
              controls
              class="size-full bg-black object-contain"
              [src]="asset().url"
              [attr.aria-label]="asset().name"
            ></video>
          } @else if (asset().url && asset().type !== 'PDF') {
            <img
              class="size-full object-cover"
              [src]="asset().url"
              [alt]="asset().name"
            />
          } @else {
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
            <div scPopoverProvider alignment="end" [(open)]="tagOpen">
              <button scButton scPopoverTrigger variant="ghost" size="icon-xs">
                <svg siPlusIcon></svg>
                <span class="sr-only">Add tag</span>
              </button>
              <ng-template scPopoverPortal>
                <div scPopover aria-label="Add tag" class="w-64">
                  <div class="flex items-end gap-2">
                    <div scField class="flex-1">
                      <label scLabel>Tag</label>
                      <input
                        scInput
                        placeholder="e.g. cover"
                        [formField]="tagForm.tag"
                        (keydown.enter)="addTag()"
                      />
                    </div>
                    <button scButton type="button" (click)="addTag()">
                      Add
                    </button>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            @for (tag of asset().tags; track tag) {
              <span scBadge class="gap-1 pe-1">
                {{ tag }}
                <button
                  type="button"
                  class="hover:text-foreground text-muted-foreground inline-flex"
                  (click)="removeTag(tag)"
                >
                  <svg siXIcon class="size-3"></svg>
                  <span class="sr-only">Remove {{ tag }}</span>
                </button>
              </span>
            } @empty {
              <p class="text-muted-foreground text-sm">No tags yet.</p>
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
        <button scButton class="w-full" (click)="actions.download(asset())">
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
  private readonly store = inject(MediaStore);
  private readonly actions = inject(AssetActions);

  readonly asset = input.required<Asset>();
  private readonly tagOpen = signal(false);
  private readonly tagForm = form(signal({ tag: '' }));
  protected readonly typeLabel = TYPE_LABEL;

  private addTag(): void {
    this.store.addTag(this.asset().id, this.tagForm.tag().value());
    this.tagForm.tag().value.set('');
    this.tagOpen.set(false);
  }

  private removeTag(tag: string): void {
    this.store.removeTag(this.asset().id, tag);
  }
}
