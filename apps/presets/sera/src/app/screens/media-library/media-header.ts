import {
  Component,
  ViewEncapsulation,
  linkedSignal,
  model,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBreadcrumb,
  ScBreadcrumbItem,
  ScBreadcrumbLink,
  ScBreadcrumbList,
  ScButton,
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

/** Back to asset management, the title, filters and upload. */
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
      class="mx-auto flex w-full flex-col items-center justify-center gap-(--gap) px-(--gap) py-(--gap) sm:flex-row sm:justify-between"
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
      <div class="flex gap-2 sm:ms-auto md:gap-4">
        @if (view()) {
          <!-- Not shadcn's: the app's switch between its two media screens. -->
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
        >
          <svg siSlidersHorizontalIcon data-icon="inline-start"></svg>
          Filters
        </button>
        <button scButton>
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
  /**
   * Grid or table, two-way: shows the switch between them. Left out (shadcn's
   * screens), no switch.
   */
  readonly view = model<'grid' | 'table' | null>(null);

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
}
