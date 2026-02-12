import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { cn } from '../../utils';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'sc-multi-select',
  exportAs: 'scMultiSelect',
  template: `
    <div [class]="containerClass()">
      <!-- Trigger -->
      <button
        #triggerEl
        type="button"
        [class]="triggerClass()"
        [disabled]="disabled()"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="dropdownOpen()"
        [attr.aria-haspopup]="'listbox'"
      >
        <div class="flex flex-wrap gap-1 flex-1">
          @if (selectedOptions().length === 0) {
            <span class="text-muted-foreground">{{ placeholder() }}</span>
          } @else if (showChips()) {
            @for (option of selectedOptions(); track option.value) {
              <span [class]="chipClass()">
                {{ option.label }}
                <button
                  type="button"
                  class="ml-1 hover:text-foreground focus:outline-none"
                  (click)="removeOption($event, option)"
                  [attr.aria-label]="'Remove ' + option.label"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="size-3"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </span>
            }
          } @else {
            <span>{{ selectedOptions().length }} selected</span>
          }
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="size-4 shrink-0 text-muted-foreground"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <!-- Dropdown -->
      @if (dropdownOpen()) {
        <div
          [class]="dropdownClass()"
          role="listbox"
          aria-multiselectable="true"
        >
          <!-- Search -->
          @if (searchable()) {
            <div class="p-2 border-b">
              <input
                #searchInput
                type="text"
                [class]="searchInputClass()"
                placeholder="Search..."
                [value]="searchQuery()"
                (input)="onSearchInput($event)"
                (keydown)="onSearchKeydown($event)"
              />
            </div>
          }

          <!-- Select All -->
          @if (showSelectAll()) {
            <div class="p-1 border-b">
              <button
                type="button"
                [class]="selectAllClass()"
                (click)="toggleSelectAll()"
              >
                <div [class]="checkboxClass(allSelected())">
                  @if (allSelected()) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      class="size-3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  } @else if (someSelected()) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      class="size-3"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  }
                </div>
                <span>Select All</span>
              </button>
            </div>
          }

          <!-- Options -->
          <div class="max-h-48 overflow-y-auto p-1">
            @for (option of filteredOptions(); track option.value) {
              <button
                type="button"
                role="option"
                [class]="optionClass(option)"
                [disabled]="option.disabled"
                [attr.aria-selected]="isSelected(option)"
                (click)="toggleOption(option)"
              >
                <div [class]="checkboxClass(isSelected(option))">
                  @if (isSelected(option)) {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      class="size-3"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  }
                </div>
                <span>{{ option.label }}</span>
              </button>
            } @empty {
              <div class="px-2 py-6 text-center text-sm text-muted-foreground">
                No options found
              </div>
            }
          </div>

          <!-- Clear All -->
          @if (showClearAll() && selectedOptions().length > 0) {
            <div class="p-2 border-t">
              <button
                type="button"
                class="w-full text-sm text-muted-foreground hover:text-foreground"
                (click)="clearAll()"
              >
                Clear all
              </button>
            </div>
          }
        </div>
      }
    </div>

    @if (dropdownOpen()) {
      <div class="fixed inset-0 z-40" (click)="closeDropdown()"></div>
    }
  `,
  host: {
    'data-slot': 'multi-select',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiSelect {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Select options...');
  readonly disabled = input<boolean>(false);
  readonly options = input<MultiSelectOption[]>([]);
  readonly searchable = input<boolean>(true);
  readonly showChips = input<boolean>(true);
  readonly showSelectAll = input<boolean>(false);
  readonly showClearAll = input<boolean>(true);
  readonly maxDisplayedChips = input<number>(3);

  readonly value = model<string[]>([]);

  readonly valueChange = output<string[]>();
  readonly optionSelect = output<MultiSelectOption>();
  readonly optionRemove = output<MultiSelectOption>();

  protected readonly dropdownOpen = signal(false);
  protected readonly searchQuery = signal('');

  private readonly searchInput =
    viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private readonly triggerEl =
    viewChild<ElementRef<HTMLButtonElement>>('triggerEl');

  protected readonly selectedOptions = computed(() => {
    const selected = this.value();
    return this.options().filter((o) => selected.includes(o.value));
  });

  protected readonly filteredOptions = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.options();
    return this.options().filter((o) => o.label.toLowerCase().includes(query));
  });

  protected readonly allSelected = computed(() => {
    const filtered = this.filteredOptions().filter((o) => !o.disabled);
    return (
      filtered.length > 0 &&
      filtered.every((o) => this.value().includes(o.value))
    );
  });

  protected readonly someSelected = computed(() => {
    const filtered = this.filteredOptions().filter((o) => !o.disabled);
    const selected = filtered.filter((o) => this.value().includes(o.value));
    return selected.length > 0 && selected.length < filtered.length;
  });

  protected readonly containerClass = computed(() =>
    cn('relative', this.classInput()),
  );

  protected readonly triggerClass = computed(() =>
    cn(
      'flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm',
      'hover:bg-accent/50',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ),
  );

  protected readonly chipClass = computed(() =>
    cn(
      'inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground',
    ),
  );

  protected readonly dropdownClass = computed(() =>
    cn(
      'absolute left-0 top-full mt-1 z-50 w-full rounded-md border bg-popover shadow-md',
      'animate-in fade-in-0 zoom-in-95',
    ),
  );

  protected readonly searchInputClass = computed(() =>
    cn(
      'flex h-8 w-full rounded-md border border-input bg-transparent px-2 py-1 text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    ),
  );

  protected readonly selectAllClass = computed(() =>
    cn(
      'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
      'hover:bg-accent hover:text-accent-foreground',
    ),
  );

  protected optionClass(option: MultiSelectOption): string {
    return cn(
      'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:outline-none focus-visible:bg-accent',
      option.disabled && 'opacity-50 cursor-not-allowed',
    );
  }

  protected checkboxClass(checked: boolean): string {
    return cn(
      'flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary',
      checked && 'bg-primary text-primary-foreground',
    );
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.value().includes(option.value);
  }

  toggleDropdown(): void {
    if (this.dropdownOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.dropdownOpen.set(true);
    this.searchQuery.set('');
    if (this.searchable()) {
      setTimeout(() => {
        this.searchInput()?.nativeElement.focus();
      });
    }
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
    this.searchQuery.set('');
  }

  toggleOption(option: MultiSelectOption): void {
    if (option.disabled) return;

    const current = this.value();
    if (current.includes(option.value)) {
      this.value.set(current.filter((v) => v !== option.value));
      this.optionRemove.emit(option);
    } else {
      this.value.set([...current, option.value]);
      this.optionSelect.emit(option);
    }
    this.valueChange.emit(this.value());
  }

  removeOption(event: Event, option: MultiSelectOption): void {
    event.stopPropagation();
    const current = this.value();
    this.value.set(current.filter((v) => v !== option.value));
    this.optionRemove.emit(option);
    this.valueChange.emit(this.value());
  }

  toggleSelectAll(): void {
    const filtered = this.filteredOptions().filter((o) => !o.disabled);
    if (this.allSelected()) {
      // Deselect all filtered
      const filteredValues = filtered.map((o) => o.value);
      this.value.set(this.value().filter((v) => !filteredValues.includes(v)));
    } else {
      // Select all filtered
      const current = new Set(this.value());
      filtered.forEach((o) => current.add(o.value));
      this.value.set([...current]);
    }
    this.valueChange.emit(this.value());
  }

  clearAll(): void {
    this.value.set([]);
    this.valueChange.emit([]);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeDropdown();
      this.triggerEl()?.nativeElement.focus();
    }
  }

  focus(): void {
    this.triggerEl()?.nativeElement.focus();
  }

  getSelectedOptions(): MultiSelectOption[] {
    return this.selectedOptions();
  }
}
