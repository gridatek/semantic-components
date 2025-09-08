import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewEncapsulation,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ScOptionModel {
  id: string | number;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'sc-multi-select',
  imports: [FormsModule],
  template: `
    <div class="relative w-full">
      <!-- Label for screen readers -->
      @if (label()) {
        <label class="block text-sm font-medium text-gray-700 mb-1" [attr.for]="labelId">
          {{ label() }}
          @if (required()) {
            <span class="text-red-500">*</span>
          }
        </label>
      }

      <!-- Selected items display -->
      <div
        class="flex flex-wrap items-center gap-1 p-2 border rounded-md bg-white cursor-pointer min-h-10"
        #toggleButton
        [attr.id]="labelId"
        [attr.aria-labelledby]="labelId"
        [attr.aria-controls]="listboxId"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-required]="required()"
        [attr.aria-describedby]="descriptionId"
        [attr.aria-activedescendant]="activeDescendant"
        [class.ring-2]="isOpen()"
        [class.ring-blue-500]="isOpen()"
        [class.border-red-500]="showError()"
        (click)="toggleDropdown()"
        (keydown)="onKeydown($event)"
        role="combobox"
        tabindex="0"
      >
        @for (option of selectedOptions; track option) {
          <div class="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
            {{ option.label }}
            <button
              class="ml-1 text-blue-500 hover:text-blue-700"
              [attr.aria-label]="f(option)"
              (click)="toggleOption(option, $event)"
              type="button"
            >
              &times;
            </button>
          </div>
        }

        @if (selectedOptions.length === 0) {
          <div class="text-gray-400">
            {{ placeholder() }}
          </div>
        }

        <div class="ml-auto">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <!-- Description for screen readers -->
      <div class="sr-only" [attr.id]="descriptionId">
        Press Enter to open the dropdown. Use arrow keys to navigate options. Press Space to select
        or deselect.
      </div>

      <!-- Error message -->
      @if (showError() && errorMessage()) {
        <div class="text-sm text-red-500 mt-1">
          {{ errorMessage() }}
        </div>
      }

      <!-- Dropdown menu -->
      @if (isOpen()) {
        <div
          class="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
          [attr.id]="listboxId"
          [attr.aria-multiselectable]="true"
          role="listbox"
        >
          @if (searchable()) {
            <div class="sticky top-0 bg-white p-2 border-b">
              <input
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                #searchInput
                [(ngModel)]="searchText"
                (input)="onSearch()"
                (click)="$event.stopPropagation()"
                type="text"
                placeholder="Search..."
                aria-label="Search options"
              />
            </div>
          }
          <div class="py-1">
            @for (option of filteredOptions; track option; let i = $index) {
              <button
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                [attr.id]="'option-' + option.id"
                [attr.aria-selected]="isSelected(option)"
                [class.bg-gray-100]="focusedIndex === i"
                (click)="toggleOption(option, $event)"
                (mouseenter)="focusedIndex = i"
                role="option"
              >
                <input
                  class="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  [checked]="isSelected(option)"
                  (click)="$event.stopPropagation()"
                  type="checkbox"
                  aria-hidden="true"
                  tabindex="-1"
                />
                <span class="ml-2">{{ option.label }}</span>
              </button>
            }
            @if (filteredOptions.length === 0) {
              <div class="px-4 py-2 text-gray-500" role="status">No results found</div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiSelect implements OnInit {
  private readonly elementRef = inject(ElementRef);

  readonly options = input<ScOptionModel[]>([]);
  readonly placeholder = input('Select options');
  readonly searchable = input(true);
  readonly label = input('');
  readonly required = input(false);
  readonly showError = input(false);
  readonly errorMessage = input('This field is required');

  readonly selectionChange = output<ScOptionModel[]>();

  protected readonly isOpen = signal(false);
  searchText = '';
  filteredOptions: ScOptionModel[] = [];
  focusedIndex = -1;

  uniqueId: string = 'multiselect-' + Math.random().toString(36).substring(2, 9);
  labelId = `${this.uniqueId}-label`;
  listboxId = `${this.uniqueId}-listbox`;
  descriptionId = `${this.uniqueId}-description`;

  get activeDescendant(): string | null {
    if (this.focusedIndex >= 0 && this.focusedIndex < this.filteredOptions.length) {
      return 'option-' + this.filteredOptions[this.focusedIndex].id;
    }
    return null;
  }

  ngOnInit() {
    this.filteredOptions = [...this.options()];
  }

  get selectedOptions(): ScOptionModel[] {
    return this.options().filter((option) => option.selected);
  }

  toggleDropdown() {
    this.isOpen.update((isOpen) => !isOpen);
    if (this.isOpen()) {
      this.onSearch();
      this.focusedIndex = -1;

      // Focus search input if searchable
      setTimeout(() => {
        const searchInput = this.elementRef.nativeElement.querySelector('input[type="text"]');
        if (searchInput && this.searchable()) {
          searchInput.focus();
        }
      });
    }
  }

  toggleOption(option: ScOptionModel, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    option.selected = !option.selected;
    this.selectionChange.emit(this.selectedOptions);

    // Announce selection change for screen readers
    this.announceForScreenReader(`${option.label} ${option.selected ? 'selected' : 'unselected'}`);
  }

  isSelected(option: ScOptionModel): boolean {
    return option.selected === true;
  }

  onSearch() {
    if (!this.searchText.trim()) {
      this.filteredOptions = [...this.options()];
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredOptions = this.options().filter((option) =>
      option.label.toLowerCase().includes(searchLower),
    );

    // Reset focused index when search results change
    this.focusedIndex = this.filteredOptions.length > 0 ? 0 : -1;
  }

  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        } else if (this.focusedIndex >= 0 && this.focusedIndex < this.filteredOptions.length) {
          this.toggleOption(this.filteredOptions[this.focusedIndex]);
        }
        break;

      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.isOpen.set(false);
          this.elementRef.nativeElement.querySelector('[role="combobox"]').focus();
        }
        break;

      case 'ArrowDown':
        if (this.isOpen()) {
          event.preventDefault();
          if (this.focusedIndex < this.filteredOptions.length - 1) {
            this.focusedIndex++;
            this.scrollToOption();
          }
        } else {
          this.toggleDropdown();
        }
        break;

      case 'ArrowUp':
        if (this.isOpen()) {
          event.preventDefault();
          if (this.focusedIndex > 0) {
            this.focusedIndex--;
            this.scrollToOption();
          }
        }
        break;

      case ' ': // Space
        if (this.isOpen() && this.focusedIndex >= 0) {
          event.preventDefault();
          this.toggleOption(this.filteredOptions[this.focusedIndex]);
        }
        break;

      case 'Tab':
        if (this.isOpen()) {
          this.isOpen.set(false);
        }
        break;

      case 'Home':
        if (this.isOpen()) {
          event.preventDefault();
          this.focusedIndex = 0;
          this.scrollToOption();
        }
        break;

      case 'End':
        if (this.isOpen()) {
          event.preventDefault();
          this.focusedIndex = this.filteredOptions.length - 1;
          this.scrollToOption();
        }
        break;
    }
  }

  scrollToOption() {
    setTimeout(() => {
      const optionElement = this.elementRef.nativeElement.querySelector(
        `[id="option-${this.filteredOptions[this.focusedIndex].id}"]`,
      );
      if (optionElement) {
        optionElement.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  announceForScreenReader(message: string) {
    // Create an invisible div for screen reader announcements
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement is read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('app-multi-select')) {
      this.isOpen.set(false);
    }
  }

  f(option: ScOptionModel) {
    return 'Remove' + option.label;
  }
}
