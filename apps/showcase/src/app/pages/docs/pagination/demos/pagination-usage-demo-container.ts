import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { PaginationUsageDemo } from './pagination-usage-demo';

@Component({
  selector: 'app-pagination-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    PaginationUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-pagination-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class PaginationUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPagination,
  ScPaginationItem,
  ScPaginationLink,
  ScPaginationList,
  ScPaginationNext,
  ScPaginationPrevious,
} from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-pagination-usage-demo',
  imports: [
    ScPagination,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationList,
    ScPaginationNext,
    ScPaginationPrevious,
    SiChevronLeftIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <nav
      scPagination
      aria-label="Results"
      #pagination="scPagination"
      [totalItems]="30"
      [pageSize]="10"
    >
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationPrevious>
            <svg siChevronLeftIcon data-icon="inline-start"></svg>
            Previous
          </button>
        </li>
        @for (item of pagination.pages(); track item.value) {
          <li scPaginationItem>
            <button scPaginationLink [page]="+item.value">
              {{ item.value }}
            </button>
          </li>
        }
        <li scPaginationItem>
          <button scPaginationNext>
            Next
            <svg siChevronRightIcon data-icon="inline-end"></svg>
          </button>
        </li>
      </ul>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PaginationUsageDemo {}`;
}
