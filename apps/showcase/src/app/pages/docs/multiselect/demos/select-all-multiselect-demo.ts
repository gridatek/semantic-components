import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxEmpty,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxItemIndicator,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
} from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** Your buttons set the value: Select all, Clear — and a count of what is chosen. */
@Component({
  selector: 'app-select-all-multiselect-demo',
  imports: [
    ScButton,
    ScComboboxMultiple,
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxEmpty,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxItemIndicator,
    ScComboboxList,
    ScComboboxPopup,
    ScComboboxPortal,
    SiCheckIcon,
    SiXIcon,
  ],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-2">
      <div
        scCombobox
        multiple
        autoHighlight
        #picker="scCombobox"
        [(value)]="labels"
      >
        <div scComboboxChips>
          @for (item of picker.value(); track item) {
            <span scComboboxChip [value]="item">
              {{ item }}
              <button scComboboxChipRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ item }}</span>
              </button>
            </span>
          }
          <input
            scComboboxInput
            aria-label="Labels"
            placeholder="Pick labels"
          />
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxEmpty>No labels found.</div>
            <div scComboboxList aria-label="Labels">
              @for (item of matching(picker.query()); track item) {
                <div scComboboxItem [value]="item">
                  {{ item }}
                  <span scComboboxItemIndicator><svg siCheckIcon></svg></span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground text-sm" aria-live="polite">
          {{ labels().length }} of {{ options.length }} chosen
        </span>
        <button
          scButton
          variant="outline"
          size="sm"
          class="ms-auto"
          [disabled]="labels().length === options.length"
          (click)="labels.set(options.slice())"
        >
          Select all
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="labels().length === 0"
          (click)="labels.set([])"
        >
          Clear
        </button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SelectAllMultiselectDemo {
  private readonly labels = signal<string[]>([]);

  private readonly options = [
    'Bug',
    'Feature',
    'Docs',
    'Design',
    'Question',
    'Help wanted',
  ];

  /** The options whose name has what is typed. */
  private matching(query: string): readonly string[] {
    const text = query.trim().toLowerCase();
    return text
      ? this.options.filter((option) => option.toLowerCase().includes(text))
      : this.options;
  }
}
