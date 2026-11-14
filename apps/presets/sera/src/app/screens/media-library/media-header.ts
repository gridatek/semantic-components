import {
  Component,
  ViewEncapsulation,
  inject,
  linkedSignal,
  model,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScButton,
  ScToaster,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiLayoutGridIcon,
  SiSlidersHorizontalIcon,
  SiTableIcon,
  SiUploadIcon,
} from '@semantic-icons/lucide-icons';
import { MediaStore, UPLOAD_ACCEPT } from './media-store';

/**
 * Back to asset management, the title, the grid/table switch, the filters
 * (in the table) and the upload.
 */
@Component({
  selector: 'app-media-header',
  imports: [
    RouterLink,
    ScBreadcrumb,
    ScBreadcrumbItem,
    ScBreadcrumbLink,
    ScBreadcrumbList,
    ScButton,
    ScToggleGroup,
    ScToggleGroupItem,
    SiArrowLeftIcon,
    SiLayoutGridIcon,
    SiSlidersHorizontalIcon,
    SiTableIcon,
    SiUploadIcon,
  ],
  template: `
    <header
      class="flex w-full flex-col items-center justify-center gap-(--gap) px-(--page-gutter) py-(--gap) sm:flex-row sm:justify-between"
    >
      <div class="flex flex-col gap-2 text-center sm:text-start">
        <nav scBreadcrumb aria-label="Breadcrumb">
          <ol scBreadcrumbList>
            <li scBreadcrumbItem>
              <a
                scBreadcrumbLink
                routerLink="/media"
                class="flex items-center gap-1.5"
              >
                <svg siArrowLeftIcon class="size-3.5"></svg>
                Asset management
              </a>
            </li>
          </ol>
        </nav>
        <h1
          class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
        >
          Media Library
        </h1>
      </div>
      <div class="flex flex-wrap justify-center gap-2 sm:ms-auto md:gap-4">
        @if (view()) {
          <div
            scToggleGroup
            variant="outline"
            aria-label="View"
            class="bg-background"
            [(value)]="values"
            (valueChange)="choose($event)"
          >
            <button scToggleGroupItem value="grid">
              <svg siLayoutGridIcon></svg><span class="sr-only">Grid</span>
            </button>
            <button scToggleGroupItem value="table">
              <svg siTableIcon></svg><span class="sr-only">Table</span>
            </button>
          </div>
        }
        <button
          scButton
          variant="outline"
          class="bg-background hover:bg-background/80"
          (click)="showFilters()"
        >
          <svg siSlidersHorizontalIcon data-icon="inline-start"></svg>
          Filters
        </button>
        <input
          #files
          type="file"
          multiple
          class="hidden"
          [accept]="accept"
          (change)="upload(files)"
        />
        <button scButton (click)="files.click()">
          <svg siUploadIcon data-icon="inline-start"></svg>
          Upload Assets
        </button>
      </div>
    </header>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class MediaHeader {
  private readonly store = inject(MediaStore);
  private readonly toaster = inject(ScToaster);

  /**
   * Grid or table, two-way: shows the switch between them. Left out (shadcn's
   * screens), no switch.
   */
  readonly view = model<'grid' | 'table' | null>(null);

  /** Filters pressed in the table, whose filters are beside: show them. */
  readonly filters = output();

  private readonly accept = UPLOAD_ACCEPT;

  /** The toggle group's value: the view, pressed. */
  protected readonly values = linkedSignal<string[]>(() => {
    const view = this.view();
    return view ? [view] : [];
  });

  /** One is always on: pressing the current one again keeps it. */
  protected choose(values: string[]): void {
    const next = values[0];
    if (next === 'grid' || next === 'table') this.view.set(next);
    else this.values.set([this.view() ?? 'grid']);
  }

  /** In the grid, the table: the filters are there. */
  private showFilters(): void {
    if (this.view() === 'grid') this.view.set('table');
    else this.filters.emit();
  }

  /** The files picked: into the library, the first selected. */
  private upload(input: HTMLInputElement): void {
    const { added, skipped } = this.store.upload(input.files ?? []);
    input.value = '';
    if (added.length) {
      this.store.selectedId.set(added[0].id);
      this.toaster.show({
        variant: 'success',
        title:
          added.length === 1
            ? 'Asset uploaded'
            : `${added.length} assets uploaded`,
        description: added.map((asset) => asset.name).join(', '),
      });
    }
    if (skipped.length) {
      this.toaster.show({
        variant: 'warning',
        title: 'Not uploaded',
        description: `${skipped.join(', ')}: only images (JPEG, PNG, WEBP), MP4 and PDF.`,
      });
    }
  }
}
