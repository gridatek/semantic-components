import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScPagination,
  ScPaginationItem,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
  ScPaginationStatus,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

/**
 * Rows per page from a Select, the items shown from range(), the pages by
 * Previous and Next only.
 */
@Component({
  selector: 'app-icons-only-pagination-demo',
  imports: [
    ScField,
    ScLabel,
    ScPagination,
    ScPaginationItem,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    ScPaginationStatus,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: `
    <nav
      scPagination
      aria-label="Orders"
      #pagination="scPagination"
      [totalItems]="230"
      [pageSize]="25"
      class="flex-wrap items-center justify-between gap-4"
    >
      <div scField orientation="horizontal" class="w-fit">
        <label scLabel>Rows per page</label>
        <div
          scSelect
          [value]="pagination.pageSize()"
          (valueChange)="pagination.changePageSize($event)"
        >
          <div scSelectTrigger class="w-20">
            <span scSelectValue></span>
            <svg scSelectIcon siChevronDownIcon></svg>
          </div>
          <ng-template scSelectPortal>
            <div scSelectPopup>
              <div scSelectList>
                <div scSelectGroup>
                  @for (size of sizes; track size) {
                    <div scSelectItem [value]="size">
                      <span scSelectItemText>{{ size }}</span>
                      <span scSelectItemIndicator><svg siCheckIcon></svg></span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <p scPaginationStatus>
          {{ pagination.range().start }}–{{ pagination.range().end }} of
          {{ pagination.totalItems() }}
        </p>
        <ul scPaginationList>
          <li scPaginationItem>
            <button scPaginationPrevious size="icon">
              <svg siChevronLeftIcon></svg>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          <li scPaginationItem>
            <button scPaginationNext size="icon">
              <svg siChevronRightIcon></svg>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsOnlyPaginationDemo {
  private readonly sizes = [10, 25, 50, 100];
}
