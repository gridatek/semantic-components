import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCheckbox,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiEllipsisVerticalIcon,
  SiFileTextIcon,
  SiImageIcon,
  SiSearchIcon,
  SiVideoIcon,
} from '@semantic-icons/lucide-icons';
import { AssetActions } from '../media-library/asset-actions';
import {
  type Asset,
  type AssetFilters,
  found,
  isImage,
  matches,
} from '../media-library/media-data';
import { MediaStore } from '../media-library/media-store';

const PAGE_SIZE = 8;

/**
 * The assets as rows: a search (name, tags), the filters applied beside, 8 a
 * page; a press on a row (or its checkbox) selects it; each row's menu
 * previews (in the grid), downloads or deletes it.
 */
@Component({
  selector: 'app-asset-table',
  imports: [
    FormField,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCheckbox,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScPagination,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiEllipsisVerticalIcon,
    SiFileTextIcon,
    SiImageIcon,
    SiSearchIcon,
    SiVideoIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader class="gap-3">
        @if (filters()) {
          <p class="text-muted-foreground text-sm" role="status">
            Filtered: {{ matching().length }} of {{ store.assets().length }}
            assets
          </p>
        }
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
      <div scCardBody class="px-0 py-0">
        <div scTableContainer tabindex="0" role="region" aria-label="Assets">
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell class="w-10 ps-6">
                  <span class="sr-only">Select</span>
                </th>
                <th scTableHeaderCell class="w-20">
                  <span class="sr-only">Preview</span>
                </th>
                <th scTableHeaderCell>Filename</th>
                <th scTableHeaderCell>Type</th>
                <th scTableHeaderCell>Dimensions</th>
                <th scTableHeaderCell>Size</th>
                <th scTableHeaderCell>Uploaded By</th>
                <th scTableHeaderCell>Date</th>
                <th scTableHeaderCell class="w-10 pe-6">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (asset of rows(); track asset.id) {
                <tr
                  scTableRow
                  class="cursor-pointer"
                  [attr.data-state]="isSelected(asset.id) ? 'selected' : null"
                  (click)="toggle(asset.id)"
                >
                  <td scTableCell class="ps-6">
                    <input
                      scCheckbox
                      [checked]="isSelected(asset.id)"
                      [attr.aria-label]="'Select ' + asset.name"
                      (click)="$event.stopPropagation()"
                      (checkedChange)="toggle(asset.id)"
                    />
                  </td>
                  <td scTableCell>
                    <div
                      class="bg-muted/60 ring-border/70 relative flex aspect-4/3 w-16 items-center justify-center overflow-hidden ring-1 ring-inset"
                    >
                      @if (asset.url && isImage(asset)) {
                        <img
                          alt=""
                          class="absolute inset-0 size-full object-cover"
                          [src]="asset.url"
                        />
                      }
                      @if (asset.duration) {
                        <span
                          class="bg-foreground/90 text-background absolute end-1 bottom-1 px-1 text-[0.5rem] font-semibold tracking-wider"
                        >
                          {{ asset.duration }}
                        </span>
                      }
                      @switch (asset.type) {
                        @case ('MP4') {
                          <svg
                            siVideoIcon
                            class="text-muted-foreground/60 size-4"
                          ></svg>
                        }
                        @case ('PDF') {
                          <svg
                            siFileTextIcon
                            class="text-muted-foreground/60 size-4"
                          ></svg>
                        }
                        @default {
                          <svg
                            siImageIcon
                            class="text-muted-foreground/60 size-4"
                          ></svg>
                        }
                      }
                    </div>
                  </td>
                  <td scTableCell class="text-foreground text-sm font-medium">
                    {{ asset.name }}
                  </td>
                  <td scTableCell>
                    <span
                      scBadge
                      variant="outline"
                      class="border px-2 py-0.5 text-[0.625rem]"
                    >
                      {{ asset.type }}
                    </span>
                  </td>
                  <td scTableCell class="text-sm">{{ asset.dimensions }}</td>
                  <td scTableCell class="text-sm">{{ asset.size }}</td>
                  <td scTableCell>{{ asset.uploadedBy }}</td>
                  <td
                    scTableCell
                    class="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                  >
                    {{ asset.date }}
                  </td>
                  <td scTableCell class="pe-6 text-end">
                    <div scMenuProvider alignment="end">
                      <button
                        scButton
                        scMenuTrigger
                        variant="ghost"
                        size="icon-xs"
                        (click)="$event.stopPropagation()"
                      >
                        <svg siEllipsisVerticalIcon></svg>
                        <span class="sr-only"
                          >Open actions for {{ asset.name }}</span
                        >
                      </button>
                      <ng-template scMenuPortal>
                        <div scMenu (itemSelected)="act($event, asset)">
                          <ng-template scMenuContent>
                            <div scMenuItem value="preview">Preview</div>
                            <div scMenuItem value="download">Download</div>
                            <div
                              scMenuItem
                              value="delete"
                              variant="destructive"
                            >
                              Delete
                            </div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr scTableRow class="hover:bg-transparent">
                  <td
                    scTableCell
                    colspan="9"
                    class="text-muted-foreground py-10 text-center"
                  >
                    No assets match.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div scCardFooter class="justify-center py-4">
        <nav
          scPagination
          aria-label="Asset pages"
          #pagination="scPagination"
          [totalItems]="matching().length"
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
export class AssetTable {
  protected readonly store = inject(MediaStore);
  private readonly actions = inject(AssetActions);

  /** The filters applied; null, none. */
  readonly filters = input<AssetFilters | null>(null);
  /** Preview chosen in a row's menu: show it, in the grid. */
  readonly preview = output<Asset>();

  private readonly search = form(signal({ query: '' }));
  private readonly pageSize = PAGE_SIZE;
  private readonly today = Temporal.Now.plainDateISO();

  protected readonly matching = computed(() => {
    const query = this.search.query().value();
    const filters = this.filters();
    return this.store
      .assets()
      .filter(
        (asset) =>
          found(asset, query) &&
          (!filters || matches(asset, filters, this.today)),
      );
  });

  /** Back to the first page when the search or the filters change. */
  private readonly page = linkedSignal({
    source: () => [this.search.query().value(), this.filters()],
    computation: () => 1,
  });

  private readonly rows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.matching().slice(start, start + PAGE_SIZE);
  });

  private readonly selectedIds = signal<ReadonlySet<string>>(
    new Set([this.store.assets()[0]?.id ?? '']),
  );

  protected isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  protected toggle(id: string): void {
    this.selectedIds.update((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  private readonly isImage = isImage;

  private act(action: unknown, asset: Asset): void {
    if (action === 'preview') this.preview.emit(asset);
    else if (action === 'download') this.actions.download(asset);
    else if (action === 'delete') this.actions.delete(asset);
  }
}
