import { Component, ViewEncapsulation, signal } from '@angular/core';
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
import { ASSETS } from '../media-library/media-data';

/**
 * The assets as rows: a press on a row (or its checkbox) selects it. Lucide's
 * newer name: EllipsisVertical (MoreVertical).
 */
@Component({
  selector: 'app-asset-table',
  imports: [
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
      <div scCardHeader>
        <div scInputGroup class="w-full">
          <div scInputGroupAddon>
            <svg siSearchIcon></svg>
          </div>
          <input
            scInput
            placeholder="Search files, tags, or metadata..."
            aria-label="Search files, tags, or metadata"
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
              @for (asset of assets; track asset.id) {
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
                      class="bg-muted/60 ring-border/70 relative flex aspect-4/3 w-16 items-center justify-center ring-1 ring-inset"
                    >
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
                        <div scMenu>
                          <ng-template scMenuContent>
                            <div scMenuItem>Preview</div>
                            <div scMenuItem>Download</div>
                            <div scMenuItem variant="destructive">Delete</div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>
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
          [totalItems]="36"
          [pageSize]="12"
        >
          <ul scPaginationList>
            <li scPaginationItem>
              <button scPaginationPrevious size="icon">
                <svg siChevronLeftIcon></svg>
                <span class="sr-only">Previous page</span>
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
              <button scPaginationNext size="icon">
                <svg siChevronRightIcon></svg>
                <span class="sr-only">Next page</span>
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
  protected readonly assets = ASSETS;
  private readonly selectedIds = signal<ReadonlySet<string>>(new Set(['1']));

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
}
