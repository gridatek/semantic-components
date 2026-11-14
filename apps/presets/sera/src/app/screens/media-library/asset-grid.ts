import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiFileTextIcon,
  SiImageIcon,
  SiSearchIcon,
  SiVideoIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from 'cn';
import { found, isImage } from './media-data';
import { MediaStore } from './media-store';

const PAGE_SIZE = 8;

/**
 * The assets as tiles: a search (name, tags), 8 a page; a press selects one
 * (the store's `selectedId`). An upload shows its image.
 */
@Component({
  selector: 'app-asset-grid',
  imports: [
    FormField,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScPagination,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    SiCheckIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiFileTextIcon,
    SiImageIcon,
    SiSearchIcon,
    SiVideoIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <div scInputGroup class="w-full">
          <div scInputGroupAddon>
            <svg siSearchIcon></svg>
          </div>
          <input
            scInput
            placeholder="Search files, tags, or metadata..."
            aria-label="Search files, tags, or metadata"
            [formField]="search.query"
          />
        </div>
      </div>
      <div scCardBody>
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          @for (asset of rows(); track asset.id) {
            <button
              type="button"
              class="group focus-visible:[&>div:first-child]:ring-ring flex flex-col gap-2.5 text-start outline-none focus-visible:[&>div:first-child]:ring-2"
              [attr.aria-pressed]="asset.id === selected()"
              (click)="selected.set(asset.id)"
            >
              <div [class]="tile(asset.id === selected())">
                @if (asset.url && isImage(asset)) {
                  <img
                    alt=""
                    class="absolute start-0.5 top-0.5 size-[calc(100%-4px)] object-cover"
                    [src]="asset.url"
                  />
                }
                @if (asset.id === selected()) {
                  <div
                    class="bg-foreground text-background absolute start-2 top-2 flex size-5 items-center justify-center"
                  >
                    <svg siCheckIcon class="size-3"></svg>
                  </div>
                }
                <span
                  scBadge
                  variant="outline"
                  class="bg-background absolute end-2 top-2 border px-2 py-1 text-[0.625rem]"
                >
                  {{ asset.type }}
                </span>
                @if (asset.duration) {
                  <span
                    scBadge
                    class="bg-foreground text-background absolute start-2 bottom-2 px-2 py-1"
                  >
                    {{ asset.duration }}
                  </span>
                }
                @switch (asset.type) {
                  @case ('MP4') {
                    <svg
                      siVideoIcon
                      class="text-muted-foreground/60 size-7"
                    ></svg>
                  }
                  @case ('PDF') {
                    <svg
                      siFileTextIcon
                      class="text-muted-foreground/60 size-7"
                    ></svg>
                  }
                  @default {
                    <svg
                      siImageIcon
                      class="text-muted-foreground/60 size-7"
                    ></svg>
                  }
                }
              </div>
              <div class="flex flex-col gap-0.5 px-0.5">
                <p class="line-clamp-1 text-sm font-medium">{{ asset.name }}</p>
                <p
                  class="text-muted-foreground text-[0.625rem] font-semibold tracking-wider uppercase"
                >
                  {{ asset.date }} · {{ asset.size }}
                </p>
              </div>
            </button>
          } @empty {
            <p class="text-muted-foreground col-span-full py-10 text-center">
              No assets match “{{ search.query().value() }}”.
            </p>
          }
        </div>
      </div>
      <div scCardFooter class="justify-center">
        <nav
          scPagination
          aria-label="Asset pages"
          #pagination="scPagination"
          [totalItems]="matches().length"
          [pageSize]="pageSize"
          [(currentPage)]="page"
        >
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious>
                <svg siChevronLeftIcon data-icon="inline-start"></svg>
                Previous
              </button>
            </li>
            @for (item of pagination.pages(); track item.value) {
              @if (item.type === 'page') {
                <li scPaginationItem>
                  <button scPaginationLink [page]="item.value">
                    {{ item.value }}
                  </button>
                </li>
              }
            }
            <li scPaginationItem>
              <button scPaginationNext>
                Next
                <svg siChevronRightIcon data-icon="inline-end"></svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class AssetGrid {
  private readonly store = inject(MediaStore);

  private readonly selected = this.store.selectedId;
  private readonly search = form(signal({ query: '' }));
  private readonly pageSize = PAGE_SIZE;

  private readonly matches = computed(() => {
    const query = this.search.query().value();
    return this.store.assets().filter((asset) => found(asset, query));
  });

  /** Back to the first page when the search changes. */
  private readonly page = linkedSignal({
    source: () => this.search.query().value(),
    computation: () => 1,
  });

  private readonly rows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.matches().slice(start, start + PAGE_SIZE);
  });

  private readonly isImage = isImage;

  protected tile(selected: boolean): string {
    return cn(
      'bg-muted/60 ring-border/70 group-hover:ring-foreground/40 relative flex aspect-4/3 items-center justify-center ring-1 transition-shadow ring-inset',
      selected && 'ring-foreground group-hover:ring-foreground ring-2',
    );
  }
}
