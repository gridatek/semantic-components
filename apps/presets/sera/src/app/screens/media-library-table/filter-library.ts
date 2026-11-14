import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
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
  ScCombobox,
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

const FILE_TYPES = [
  { id: 'images', label: 'Images (JPEG, PNG, WEBP)', checked: true },
  { id: 'video', label: 'Video (MP4, MOV)', checked: false },
  { id: 'documents', label: 'Documents (PDF)', checked: false },
  { id: 'audio', label: 'Audio (MP3, WAV)', checked: false },
];

const DATE_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: '24h', label: 'Past 24 hours' },
  { value: 'week', label: 'Past week' },
  { value: 'month', label: 'Past month' },
];

const TAGS = [
  'architecture',
  'brutalism',
  'ceramics',
  'design-week',
  'editorial',
  'exterior',
  'film',
  'food',
  'furniture',
  'interior',
  'kyoto',
  'minimalism',
  'print',
  'sustainability',
  'summer-issue',
  'video',
];

/** shadcn's "LLL dd, y": Nov 01, 2026. */
const day = (date: Temporal.PlainDate) =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

/** The library's filters: type, date, size, tags. */
@Component({
  selector: 'app-filter-library',
  imports: [
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
    ScCombobox,
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
        <h2 scCardTitle>Filter Library</h2>
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
                    [checked]="type.checked"
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
            <div scRadioGroup aria-label="Date uploaded" [(value)]="uploaded">
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
                    [(value)]="range"
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
                  [min]="0"
                  [max]="100"
                  [(value)]="sizeMin"
                />
                <input
                  scRangeSliderEndThumb
                  aria-label="Maximum size"
                  [min]="0"
                  [max]="100"
                  [(value)]="sizeMax"
                />
              </div>
              <div
                class="flex items-center justify-between text-xs font-medium"
              >
                <span>Min: 0 MB</span>
                <span>Max: 300 MB</span>
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
                [(value)]="tags"
              >
                <div scComboboxChips>
                  @for (tag of tags(); track tag) {
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
        <button scButton class="w-full">Apply Filters</button>
        <button scButton variant="ghost" class="w-full">Reset</button>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class FilterLibrary {
  protected readonly fileTypes = FILE_TYPES;
  protected readonly dateOptions = DATE_OPTIONS;
  protected readonly uploaded = signal('any');
  protected readonly sizeMin = signal(0);
  protected readonly sizeMax = signal(60);
  protected readonly tags = signal<string[]>(['architecture', 'brutalism']);

  /** This month's first day, three weeks on — as shadcn's. */
  private readonly start = Temporal.Now.plainDateISO().with({ day: 1 });
  protected readonly range = signal<ScCalendarValue>({
    from: this.start,
    to: this.start.add({ days: 21 }),
  });

  protected readonly rangeText = computed(() => {
    const { from, to } = (this.range() ?? {}) as Partial<ScCalendarRange>;
    if (!from) return 'Pick a date range';
    return to ? `${day(from)} – ${day(to)}` : day(from);
  });

  protected matching(query: string): string[] {
    return TAGS.filter((tag) => scComboboxMatches(tag, query));
  }
}
