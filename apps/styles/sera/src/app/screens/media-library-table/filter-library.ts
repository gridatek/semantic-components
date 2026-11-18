import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';
import { FormField, form, max, min } from '@angular/forms/signals';
import {
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarNext,
  ScCalendarPrevious,
  type ScCalendarRange,
  type ScCalendarValue,
  ScCard,
  ScCardBody,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScFieldGroup,
  ScFieldset,
  ScLabel,
  ScLegend,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
  ScRadio,
  ScRadioGroup,
  ScRangeSlider,
  ScRangeSliderEndThumb,
  ScRangeSliderStartThumb,
  scComboboxMatches,
} from '@semantic-components/ui';
import {
  SiCalendarIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { type AssetFilters, type AssetKind } from '../media-library/media-data';
import { MediaStore } from '../media-library/media-store';

const FILE_TYPES: { id: AssetKind; label: string }[] = [
  { id: 'images', label: 'Images (JPEG, PNG, WEBP)' },
  { id: 'video', label: 'Video (MP4, MOV)' },
  { id: 'documents', label: 'Documents (PDF)' },
  { id: 'audio', label: 'Audio (MP3, WAV)' },
];

const DATE_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: '24h', label: 'Past 24 hours' },
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
];

/** shadcn's "LLL dd, y": Nov 01, 2026. */
const day = (date: Temporal.PlainDate) =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

/** The slider's steps: 5 MB each; its end, 500+ MB, is no maximum. */
const MB_PER_STEP = 5;

interface FilterModel {
  kinds: Record<AssetKind, boolean>;
  uploaded: AssetFilters['uploaded'];
  range: ScCalendarValue;
  sizeMin: number;
  sizeMax: number;
  tags: string[];
}

/** No filter: everything shown. */
const ALL = (): FilterModel => ({
  kinds: { images: true, video: true, documents: true, audio: true },
  uploaded: 'any',
  range: null,
  sizeMin: 0,
  sizeMax: 100,
  tags: [],
});

/**
 * The library's filters — type, date, size, tags — as one form: Apply hands
 * them to the table, Reset clears them.
 */
@Component({
  selector: 'app-filter-library',
  imports: [
    FormField,
    ScButton,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardBody,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxMultiple,
    ScComboboxPopup,
    ScComboboxPortal,
    ScField,
    ScFieldGroup,
    ScFieldset,
    ScLabel,
    ScLegend,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScRadio,
    ScRadioGroup,
    ScRangeSlider,
    ScRangeSliderEndThumb,
    ScRangeSliderStartThumb,
    SiCalendarIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiXIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader class="border-b">
        <h2 scCardTitle tabindex="-1" class="outline-none">Filter Library</h2>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <fieldset scFieldset>
            <legend scLegend>File Type</legend>
            <div class="flex flex-col gap-3">
              @for (type of fileTypes; track type.id) {
                <div scField orientation="horizontal">
                  <input
                    scCheckbox
                    [id]="'type-' + type.id"
                    [formField]="filterForm.kinds[type.id]"
                  />
                  <label scLabel [for]="'type-' + type.id">
                    {{ type.label }}
                  </label>
                </div>
              }
            </div>
          </fieldset>

          <fieldset scFieldset>
            <legend scLegend>Date Uploaded</legend>
            <div
              scRadioGroup
              aria-label="Date uploaded"
              [formField]="filterForm.uploaded"
            >
              @for (option of dateOptions; track option.value) {
                <div scField orientation="horizontal">
                  <input
                    scRadio
                    [id]="'date-' + option.value"
                    [value]="option.value"
                  />
                  <label scLabel [for]="'date-' + option.value">
                    {{ option.label }}
                  </label>
                </div>
              }
            </div>
          </fieldset>

          <!-- The field's id is its control's (the trigger), its label's for:
            bound, not written on the field (two elements, one id). -->
          <div scField [id]="'custom-range'">
            <label scLabel>Custom Range</label>
            <div scPopoverProvider alignment="end">
              <button
                scButton
                scPopoverTrigger
                variant="outline"
                id="custom-range"
                class="w-full"
              >
                <svg siCalendarIcon data-icon="inline-start"></svg>
                {{ rangeText() }}
              </button>
              <ng-template scPopoverPortal>
                <div scPopover class="w-auto p-0" aria-label="Custom range">
                  <div
                    scCalendar
                    initialFocus
                    mode="range"
                    aria-label="Custom range"
                    [numberOfMonths]="2"
                    [formField]="filterForm.range"
                  >
                    <div scCalendarHeader>
                      <button scCalendarPrevious>
                        <svg siChevronLeftIcon></svg>
                        <span class="sr-only">Previous month</span>
                      </button>
                      <button scCalendarNext>
                        <svg siChevronRightIcon></svg>
                        <span class="sr-only">Next month</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>

          <fieldset scFieldset>
            <legend scLegend>File Size</legend>
            <div class="flex flex-col gap-3">
              <div
                class="text-muted-foreground flex items-center justify-between text-xs font-medium tracking-wider uppercase"
              >
                <span>0 MB</span>
                <span>500+ MB</span>
              </div>
              <div scRangeSlider>
                <input
                  scRangeSliderStartThumb
                  aria-label="Minimum size"
                  [formField]="filterForm.sizeMin"
                />
                <input
                  scRangeSliderEndThumb
                  aria-label="Maximum size"
                  [formField]="filterForm.sizeMax"
                />
              </div>
              <div
                class="flex items-center justify-between text-xs font-medium"
              >
                <span>Min: {{ minText() }}</span>
                <span>Max: {{ maxText() }}</span>
              </div>
            </div>
          </fieldset>

          <fieldset scFieldset>
            <legend scLegend>Tags</legend>
            <div scField>
              <div
                scCombobox
                multiple
                autoHighlight
                #cb="scCombobox"
                [formField]="filterForm.tags"
              >
                <div scComboboxChips>
                  @for (tag of filterForm.tags().value(); track tag) {
                    <span scComboboxChip [value]="tag">
                      {{ tag }}
                      <button scComboboxChipRemove>
                        <svg siXIcon></svg>
                        <span class="sr-only">Remove {{ tag }}</span>
                      </button>
                    </span>
                  }
                  <input
                    scComboboxInput
                    placeholder="Filter by tag..."
                    aria-label="Tags"
                  />
                </div>
                <ng-template scComboboxPortal>
                  <div scComboboxPopup>
                    <div scComboboxEmpty>No tags found.</div>
                    <div scComboboxList aria-label="Tags">
                      @for (tag of matching(cb.query()); track tag) {
                        <div scComboboxItem [value]="tag">{{ tag }}</div>
                      }
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div scCardFooter class="flex flex-col gap-2 border-t">
        <button scButton class="w-full" (click)="apply()">Apply Filters</button>
        <button scButton variant="ghost" class="w-full" (click)="reset()">
          Reset
        </button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class FilterLibrary {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly store = inject(MediaStore);

  /** The tags of the library's assets, A to Z. */
  private readonly tags = computed(() =>
    [...new Set(this.store.assets().flatMap((asset) => asset.tags))].sort(),
  );

  /** Apply: the filters; Reset: null, none. */
  readonly applied = output<AssetFilters | null>();

  private readonly fileTypes = FILE_TYPES;
  private readonly dateOptions = DATE_OPTIONS;

  private readonly model = signal(ALL());
  private readonly filterForm = form(this.model, (path) => {
    min(path.sizeMin, 0);
    max(path.sizeMin, 100);
    min(path.sizeMax, 0);
    max(path.sizeMax, 100);
  });

  private readonly minText = computed(
    () => `${this.model().sizeMin * MB_PER_STEP} MB`,
  );
  private readonly maxText = computed(() => {
    const size = this.model().sizeMax;
    return size === 100 ? '500+ MB' : `${size * MB_PER_STEP} MB`;
  });

  private readonly rangeText = computed(() => {
    const { from, to } = (this.model().range ?? {}) as Partial<ScCalendarRange>;
    if (!from) return 'Pick a date range';
    return to ? `${day(from)} – ${day(to)}` : day(from);
  });

  /** Brings the filters into view, focused: the header's Filters. */
  focus(): void {
    const title = this.element.nativeElement.querySelector<HTMLElement>(
      '[data-slot=card-title], h2',
    );
    title?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    title?.focus({ preventScroll: true });
  }

  private matching(query: string): string[] {
    return this.tags().filter((tag) => scComboboxMatches(tag, query));
  }

  private apply(): void {
    const model = this.model();
    const { from, to } = (model.range ?? {}) as Partial<ScCalendarRange>;
    this.applied.emit({
      kinds: FILE_TYPES.filter((type) => model.kinds[type.id]).map((t) => t.id),
      uploaded: model.uploaded,
      from: from ?? null,
      to: to ?? null,
      minMb: model.sizeMin * MB_PER_STEP,
      maxMb: model.sizeMax === 100 ? null : model.sizeMax * MB_PER_STEP,
      tags: model.tags,
    });
  }

  private reset(): void {
    this.model.set(ALL());
    this.applied.emit(null);
  }
}
